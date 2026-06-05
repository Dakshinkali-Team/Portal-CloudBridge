import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../config/prisma.js";

const VALID_CATEGORIES = ["COMPUTE", "DATABASE", "STORAGE", "NETWORK"];
const CATEGORY_TO_RESPONSE_KEY = {
  COMPUTE: "compute",
  DATABASE: "database",
  STORAGE: "blockStorage",
  NETWORK: "bandwidth",
};

const createHttpError = (status, message) =>
  Object.assign(new Error(message), { status });

const normalizeNumberField = (value, fieldName) => {
  const parsed = Number(value);

  if (Number.isNaN(parsed) || parsed < 0) {
    throw createHttpError(400, `${fieldName} must be a non-negative number`);
  }

  return parsed;
};

const normalizeIntegerField = (value, fieldName) => {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed < 0) {
    throw createHttpError(400, `${fieldName} must be a non-negative integer`);
  }

  return parsed;
};

const getCatalogItemCost = (item, { quantity = 0, selectedUnits = 0 }) => {
  const basePrice = Number(item.basePrice || 0);
  const storagePrice = Number(item.storagePrice || 0);

  if (item.category === "STORAGE" || item.category === "NETWORK") {
    return selectedUnits * (storagePrice || basePrice);
  }

  return basePrice * quantity;
};

export const getPublicPricing = asyncHandler(async (req, res) => {
  const item = await prisma.serviceCatalog.findFirst({
    where: { category: "COMPUTE", isActive: true },
    select: { vcpuPrice: true, ramPrice: true },
    orderBy: [{ id: "asc" }],
  });

  if (!item) {
    return res.status(200).json({
      success: true,
      data: { vcpuPrice: 0, ramPrice: 0 },
    });
  }

  res.status(200).json({
    success: true,
    data: {
      vcpuPrice: Number(item.vcpuPrice || 0),
      ramPrice: Number(item.ramPrice || 0),
    },
  });
});

export const estimateCost = asyncHandler(async (req, res) => {
  const items = Array.isArray(req.body.items) ? req.body.items : [];
  const selectedStorageGB = req.body.selectedStorageGB ?? null;
  const selectedBandwidth = req.body.selectedBandwidth ?? null;

  const totals = {
    compute: 0,
    database: 0,
    blockStorage: 0,
    bandwidth: 0,
  };

  if (items.length > 0) {
    const catalogIds = items
      .map((item) => (item.catalogId != null ? Number(item.catalogId) : null))
      .filter((id) => Number.isInteger(id));

    const categories = items
      .map((item) =>
        item.category ? String(item.category).trim().toUpperCase() : null
      )
      .filter((category) => VALID_CATEGORIES.includes(category));

    const queryFilters = [];

    if (catalogIds.length > 0) {
      queryFilters.push({ id: { in: Array.from(new Set(catalogIds)) } });
    }

    if (categories.length > 0) {
      queryFilters.push({ category: { in: Array.from(new Set(categories)) } });
    }

    if (queryFilters.length === 0) {
      throw createHttpError(400, "At least one catalog item or category must be provided");
    }

    const catalogItems = await prisma.serviceCatalog.findMany({
      where: {
        isActive: true,
        OR: queryFilters,
      },
      select: {
        id: true,
        category: true,
        basePrice: true,
        storagePrice: true,
        hasSliders: true,
        isFixedVariant: true,
      },
      orderBy: [{ id: "asc" }],
    });

    const itemsById = new Map(catalogItems.map((item) => [item.id, item]));
    const firstItemByCategory = new Map();

    for (const item of catalogItems) {
      if (!firstItemByCategory.has(item.category)) {
        firstItemByCategory.set(item.category, item);
      }
    }

    for (const selection of items) {
      const category = selection.category
        ? String(selection.category).trim().toUpperCase()
        : null;

      if (category && !VALID_CATEGORIES.includes(category)) {
        throw createHttpError(400, `Invalid category: ${selection.category}`);
      }

      const catalogItem = selection.catalogId
        ? itemsById.get(Number(selection.catalogId))
        : category
        ? firstItemByCategory.get(category)
        : null;

      if (!catalogItem) {
        throw createHttpError(
          400,
          `Catalog item not found for selection: ${JSON.stringify(selection)}`
        );
      }

      const quantity = normalizeIntegerField(
        selection.quantity ?? 0,
        "quantity"
      );

      const selectedUnits = normalizeNumberField(
        selection.selectedUnits ?? 0,
        "selectedUnits"
      );

      const lineCost = getCatalogItemCost(catalogItem, {
        quantity,
        selectedUnits,
      });

      const responseKey = CATEGORY_TO_RESPONSE_KEY[catalogItem.category];
      totals[responseKey] += lineCost;
    }
  } else {
    const storageAmount = selectedStorageGB !== null ? normalizeNumberField(selectedStorageGB, "selectedStorageGB") : 0;
    const bandwidthAmount = selectedBandwidth !== null ? normalizeNumberField(selectedBandwidth, "selectedBandwidth") : 0;

    const [storageItem, networkItem] = await Promise.all([
      prisma.serviceCatalog.findFirst({
        where: { category: "STORAGE", isActive: true },
        select: {
          category: true,
          basePrice: true,
          storagePrice: true,
          hasSliders: true,
          isFixedVariant: true,
        },
        orderBy: [{ id: "asc" }],
      }),
      prisma.serviceCatalog.findFirst({
        where: { category: "NETWORK", isActive: true },
        select: {
          category: true,
          basePrice: true,
          storagePrice: true,
          hasSliders: true,
          isFixedVariant: true,
        },
        orderBy: [{ id: "asc" }],
      }),
    ]);

    if (storageItem) {
      totals.blockStorage = getCatalogItemCost(storageItem, {
        selectedUnits: storageAmount,
      });
    }

    if (networkItem) {
      totals.bandwidth = getCatalogItemCost(networkItem, {
        selectedUnits: bandwidthAmount,
      });
    }
  }

  const monthlyTotal = Object.values(totals).reduce((sum, next) => sum + next, 0);

  res.status(200).json({
    success: true,
    data: {
      ...totals,
      monthlyTotal,
    },
  });
});

export default { getPublicPricing, estimateCost };

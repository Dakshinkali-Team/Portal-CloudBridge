import prisma from "../config/prisma.js";

const SERVICE_CATEGORIES = ["COMPUTE", "DATABASE", "STORAGE", "NETWORK"];
const CATEGORY_TO_RESPONSE_KEY = {
  COMPUTE: "compute",
  DATABASE: "database",
  STORAGE: "blockStorage",
  NETWORK: "bandwidth",
};

const UNIT_BY_CATEGORY = {
  STORAGE: "GB",
  NETWORK: "TB",
};

const createHttpError = (status, message) =>
  Object.assign(new Error(message), { status });

const parsePositiveInt = (value, fieldName) => {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw createHttpError(400, `${fieldName} must be a positive integer`);
  }

  return parsed;
};

const serializeCatalogItem = (catalogItem) => ({
  id: catalogItem.id,
  name: catalogItem.name,
  basePrice: Number(catalogItem.basePrice),
  unit: UNIT_BY_CATEGORY[catalogItem.category] ?? null,
  category: catalogItem.category,
  hasSliders: Boolean(catalogItem.hasSliders),
  storagePrice: Number(catalogItem.storagePrice),
  isFixedVariant: Boolean(catalogItem.isFixedVariant),
});

const serializeAdminCatalogItem = (catalogItem) => ({
  id: catalogItem.id,
  name: catalogItem.name,
  category: catalogItem.category,
  description: catalogItem.description,
  basePrice: Number(catalogItem.basePrice),
  hasSliders: catalogItem.hasSliders,
  vcpuPrice: Number(catalogItem.vcpuPrice),
  ramPrice: Number(catalogItem.ramPrice),
  storagePrice: Number(catalogItem.storagePrice),
  isFixedVariant: catalogItem.isFixedVariant,
  variantSizeGb: catalogItem.variantSizeGb,
  isActive: catalogItem.isActive,
  unit: UNIT_BY_CATEGORY[catalogItem.category] ?? null,
});

const normalizeCategory = (category) => {
  const normalized = String(category ?? "").trim().toUpperCase();

  if (!SERVICE_CATEGORIES.includes(normalized)) {
    throw createHttpError(
      400,
      `category must be one of: ${SERVICE_CATEGORIES.join(", ")}`
    );
  }

  return normalized;
};

const normalizeNumberField = (value, fieldName) => {
  const parsed = Number.parseFloat(value);

  if (Number.isNaN(parsed)) {
    throw createHttpError(400, `${fieldName} must be a valid number`);
  }

  return parsed;
};

const normalizeBooleanField = (value, fieldName) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalizedValue = value.trim().toLowerCase();

    if (normalizedValue === "true") {
      return true;
    }

    if (normalizedValue === "false") {
      return false;
    }
  }

  throw createHttpError(400, `${fieldName} must be a boolean value`);
};

const buildAdminCatalogUpdateData = (body) => {
  const data = {};

  if (body.name !== undefined) {
    if (typeof body.name !== "string" || !body.name.trim()) {
      throw createHttpError(400, "name must be a non-empty string");
    }

    data.name = body.name.trim();
  }

  if (body.category !== undefined) {
    data.category = normalizeCategory(body.category);
  }

  if (body.description !== undefined) {
    data.description =
      body.description === null
        ? null
        : String(body.description).trim() || null;
  }

  if (body.basePrice !== undefined) {
    data.basePrice = normalizeNumberField(body.basePrice, "basePrice");
  }

  if (body.hasSliders !== undefined) {
    data.hasSliders = normalizeBooleanField(body.hasSliders, "hasSliders");
  }

  if (body.vcpuPrice !== undefined) {
    data.vcpuPrice = normalizeNumberField(body.vcpuPrice, "vcpuPrice");
  }

  if (body.ramPrice !== undefined) {
    data.ramPrice = normalizeNumberField(body.ramPrice, "ramPrice");
  }

  if (body.storagePrice !== undefined) {
    data.storagePrice = normalizeNumberField(body.storagePrice, "storagePrice");
  }

  if (body.isFixedVariant !== undefined) {
    data.isFixedVariant = normalizeBooleanField(
      body.isFixedVariant,
      "isFixedVariant"
    );
  }

  if (body.variantSizeGb !== undefined) {
    data.variantSizeGb = parsePositiveInt(body.variantSizeGb, "variantSizeGb");
  }

  if (body.isActive !== undefined) {
    data.isActive = normalizeBooleanField(body.isActive, "isActive");
  }

  return data;
};

export const getServiceCatalogForCalculator = async () => {
  const catalogItems = await prisma.serviceCatalog.findMany({
    where: {
      isActive: true,
    },
    orderBy: [{ category: "asc" }, { id: "asc" }],
    select: {
      id: true,
      name: true,
      basePrice: true,
      category: true,
      hasSliders: true,
      storagePrice: true,
      isFixedVariant: true,
    },
  });

  const catalogByCategory = {
    compute: [],
    database: [],
    blockStorage: [],
    bandwidth: [],
  };

  for (const item of catalogItems) {
    const responseKey = CATEGORY_TO_RESPONSE_KEY[item.category];

    if (!responseKey) {
      continue;
    }

    catalogByCategory[responseKey].push(serializeCatalogItem(item));
  }

  return catalogByCategory;
};

export const getAdminServiceCatalog = async () => {
  const catalogItems = await prisma.serviceCatalog.findMany({
    orderBy: [{ category: "asc" }, { id: "asc" }],
  });

  return catalogItems.map(serializeAdminCatalogItem);
};

export const updateAdminServiceCatalogItem = async (id, body) => {
  const catalogId = parsePositiveInt(id, "id");
  const updateData = buildAdminCatalogUpdateData(body);

  if (Object.keys(updateData).length === 0) {
    throw createHttpError(400, "At least one catalog field must be provided");
  }

  const updatedCatalogItem = await prisma.serviceCatalog.update({
    where: { id: catalogId },
    data: updateData,
  });

  return serializeAdminCatalogItem(updatedCatalogItem);
};

import prisma from "../config/prisma.js";
import { buildPaginationMeta } from "../utils/pagination.js";

const ACTIVE_SERVICE_INCLUDE = {
  variants: {
    orderBy: { id: "asc" },
    include: {
      attributes: {
        orderBy: { id: "asc" },
      },
    },
  },
};

const SERVICE_CATALOG_SELECT = {
  id: true,
  name: true,
  category: true,
  description: true,
  basePrice: true,
  hasSliders: true,
  vcpuPrice: true,
  ramPrice: true,
  storagePrice: true,
  isFixedVariant: true,
  variantSizeGb: true,
  isActive: true,
};

const buildActiveServiceWhereClause = ({ search, category }) => {
  const where = {
    isActive: true,
  };

  if (category) {
    where.category = category;
  }

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        specifications: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  return where;
};

const buildServiceCatalogMap = async (services) => {
  if (services.length === 0) {
    return new Map();
  }

  // A schema relation is not available yet, so we match catalogs by name + category
  // only when both values line up exactly.
  const catalogFilters = services.map((service) => ({
    name: service.name,
    category: service.category,
    isActive: true,
  }));

  const catalogs = await prisma.serviceCatalog.findMany({
    where: {
      OR: catalogFilters,
    },
    select: SERVICE_CATALOG_SELECT,
  });

  return catalogs.reduce((catalogMap, catalog) => {
    const key = `${catalog.name}::${catalog.category}`;

    if (!catalogMap.has(key)) {
      catalogMap.set(key, catalog);
    }

    return catalogMap;
  }, new Map());
};

const serializeActiveService = (service, catalog) => {
  const prices = service.variants.map((variant) => variant.basePrice);

  return {
    ...service,
    variantCount: service.variants.length,
    startingPrice: prices.length > 0 ? Math.min(...prices) : null,
    catalog: catalog ?? null,
  };
};

export const getAvailableActiveServices = async ({
  page,
  limit,
  search,
  category,
}) => {
  const where = buildActiveServiceWhereClause({ search, category });
  const skip = (page - 1) * limit;

  const [services, total] = await prisma.$transaction([
    prisma.service.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: ACTIVE_SERVICE_INCLUDE,
    }),
    prisma.service.count({ where }),
  ]);

  const serviceCatalogMap = await buildServiceCatalogMap(services);

  return {
    data: services.map((service) =>
      serializeActiveService(
        service,
        serviceCatalogMap.get(`${service.name}::${service.category}`)
      )
    ),
    pagination: buildPaginationMeta(page, limit, total),
  };
};

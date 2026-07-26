import prisma from "../config/prisma.js";

const CATALOG_CACHE_TTL_MS = 30_000;
const activeServiceCache = new Map();

const ACTIVE_SERVICE_SELECT = {
  id: true,
  name: true,
  category: true,
  variants: {
    orderBy: { id: "asc" },
    select: {
      id: true,
      basePrice: true,
      attributes: {
        orderBy: { id: "asc" },
        select: {
          id: true,
          key: true,
          unit: true,
          valueNumber: true,
          valueText: true,
        },
      },
    },
  },
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

const serializeActiveService = (service) => {
  const prices = service.variants.map((variant) => variant.basePrice);

  return {
    ...service,
    variantCount: service.variants.length,
    startingPrice: prices.length > 0 ? Math.min(...prices) : null,
  };
};

export const getAvailableActiveServices = async ({
  page,
  limit,
  search,
  category,
}) => {
  const cacheKey = JSON.stringify({ page, limit, search, category });
  const cachedResult = activeServiceCache.get(cacheKey);

  if (cachedResult?.expiresAt > Date.now()) {
    return cachedResult.data;
  }

  const where = buildActiveServiceWhereClause({ search, category });
  const skip = (page - 1) * limit;

  // The request form has no pagination controls, so avoid COUNT(*) and use an
  // extra row to retain next-page information in a single database round trip.
  const services = await prisma.service.findMany({
    where,
    skip,
    take: limit + 1,
    orderBy: { createdAt: "desc" },
    select: ACTIVE_SERVICE_SELECT,
    relationLoadStrategy: "join",
  });

  const hasNextPage = services.length > limit;
  const pageData = hasNextPage ? services.slice(0, limit) : services;

  const result = {
    data: pageData.map(serializeActiveService),
    pagination: {
      page,
      limit,
      hasNextPage,
    },
  };

  activeServiceCache.set(cacheKey, {
    data: result,
    expiresAt: Date.now() + CATALOG_CACHE_TTL_MS,
  });

  return result;
};

import prisma from "../config/prisma.js";
import {
  SERVICE_REQUEST_STATUSES,
  SERVICE_REQUEST_TRANSITIONS,
} from "../constants/serviceRequestStatus.js";
import { createAppError } from "../utils/appError.js";

const DASHBOARD_CACHE_TTL_MS = 15_000;
const customerDashboardCache = new Map();
const ADMIN_REQUEST_CACHE_TTL_MS = 15_000;
const adminServiceRequestCache = new Map();
let adminServiceRequestStatsCache = null;

const invalidateCustomerDashboard = (customerId) => {
  customerDashboardCache.delete(customerId);
};

export const invalidateAdminServiceRequestCache = () => {
  adminServiceRequestCache.clear();
  adminServiceRequestStatsCache = null;
};

// Used for Dashboard & Service Request List
const SERVICE_REQUEST_SUMMARY_INCLUDE = {
  customer: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
  reviewer: {
    select: {
      id: true,
      name: true,
    },
  },
  items: {
    select: {
      id: true,
      quantity: true,
      unitPriceSnap: true,
      service: {
        select: {
          id: true,
          name: true,
          category: true,
        },
      },
      serviceVariant: {
        select: {
          id: true,
          basePrice: true,
        },
      },
    },
  },
};

// Customer pages only need request and item information. Keeping the customer
// and reviewer joins out of this common path avoids loading the same user data
// for every row in a customer's own service list.
const CUSTOMER_SERVICE_REQUEST_INCLUDE = {
  items: {
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
      quantity: true,
      unitPriceSnap: true,
      service: {
        select: {
          id: true,
          name: true,
          category: true,
        },
      },
      serviceVariant: {
        select: {
          id: true,
          basePrice: true,
        },
      },
    },
  },
};

// Used only when opening full request details
const SERVICE_REQUEST_DETAIL_INCLUDE = {
  customer: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      accountType: true,
    },
  },
  reviewer: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  },
  items: {
    orderBy: {
      id: "asc",
    },
    include: {
      service: {
        select: {
          id: true,
          name: true,
          specifications: true,
          category: true,
          isActive: true,
        },
      },
      serviceVariant: {
        select: {
          id: true,
          basePrice: true,
          currency: true,
          billingInterval: true,
          attributes: {
            orderBy: {
              id: "asc",
            },
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
    },
  },
};

const mergeDuplicateItems = (items) => {
  const itemMap = new Map();

  for (const item of items) {
    const id = Number(item.serviceVariantId);

    const currentQuantity = itemMap.get(id) ?? 0;
    itemMap.set(id, currentQuantity + Number(item.quantity));
  }

  return Array.from(itemMap.entries()).map(([serviceVariantId, quantity]) => ({
    serviceVariantId,
    quantity,
  }));
};

const serializeRequestItem = (item) => ({
  id: item.id,
  quantity: item.quantity,
  unitPriceSnap: item.unitPriceSnap,
  lineTotal: item.unitPriceSnap * item.quantity,
  service: item.service,
  serviceVariant: item.serviceVariant,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
});

const serializeServiceRequest = (serviceRequest) => {
  const items = serviceRequest.items.map(serializeRequestItem);

  return {
    id: serviceRequest.id,
    status: serviceRequest.status,
    notes: serviceRequest.notes,
    responseMessage: serviceRequest.responseMessage,
    estimatedDate: serviceRequest.estimatedDate,
    createdAt: serviceRequest.createdAt,
    updatedAt: serviceRequest.updatedAt,
    customer: serviceRequest.customer,
    reviewer: serviceRequest.reviewer,
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount: items.reduce((sum, item) => sum + item.lineTotal, 0),
    items,
  };
};

const assertAllVariantsExist = (requestedVariantIds, foundVariants) => {
  const foundVariantIds = new Set(foundVariants.map(v => v.id));

  const missing = requestedVariantIds.filter(id => !foundVariantIds.has(id));

  if (missing.length > 0) {
    throw createAppError(
      400,
      `Invalid serviceVariantId values: ${missing.join(", ")}`
    );
  }
};

const assertServicesAreActive = (variants) => {
  const inactiveVariantIds = variants
    .filter((variant) => !variant.service.isActive)
    .map((variant) => variant.id);

  if (inactiveVariantIds.length > 0) {
    throw createAppError(
      400,
      `Inactive services cannot be requested. Invalid serviceVariantId values: ${inactiveVariantIds.join(", ")}`
    );
  }
};

const buildAdminServiceRequestWhereClause = ({ status, search }) => {
  const where = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where.customer = {
      is: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    };
  }

  return where;
};

const canMoveToNextStatus = (currentStatus, nextStatus) => {
  if (currentStatus === nextStatus) {
    return true;
  }

  const allowedStatuses = SERVICE_REQUEST_TRANSITIONS[currentStatus] ?? new Set();
  return allowedStatuses.has(nextStatus);
};

export const createCustomerServiceRequest = async ({
  customerId,
  notes,
  items,
}) => {
  const mergedItems = mergeDuplicateItems(items);
  // const requestedVariantIds = mergedItems.map((item) => item.serviceVariantId);
  const requestedVariantIds = mergedItems.map((item) =>
  Number(item.serviceVariantId)
);

  const serviceRequest = await prisma.$transaction(async (tx) => {
    const variants = await tx.serviceVariant.findMany({
      where: {
        id: {
          in: requestedVariantIds,
        },
      },
      select: {
        id: true,
        serviceId: true,
        basePrice: true,
        service: {
          select: {
            id: true,
            name: true,
            isActive: true,
          },
        },
      },
    });

    assertAllVariantsExist(requestedVariantIds, variants);
    assertServicesAreActive(variants);

    const variantMap = new Map(
      variants.map((variant) => [variant.id, variant])
    );

    return tx.serviceRequest.create({
      data: {
        customerId,
        status: SERVICE_REQUEST_STATUSES.PENDING,
        notes: notes ?? null,
        // items: {
        //   create: mergedItems.map((item) => {
        //     const variant = variantMap.get(Number(item.serviceVariantId));

        //     return {
        //       serviceId: variant.serviceId,
        //       serviceVariantId: variant.id,
        //       unitPriceSnap: variant.basePrice,
        //       quantity: item.quantity,
        //     };
        //   }),
        // },
        items: {
  create: mergedItems.map((item) => {
    const variant = variantMap.get(Number(item.serviceVariantId));

    if (!variant) {
      throw createAppError(
        400,
        `ServiceVariant not found: ${item.serviceVariantId}`
      );
    }

    return {
      serviceId: variant.serviceId,
      serviceVariantId: variant.id,
      unitPriceSnap: variant.basePrice,
      quantity: Number(item.quantity),
    };
  }),
},
      },
      include: CUSTOMER_SERVICE_REQUEST_INCLUDE,
    });
  },
{timeout: 10000}
);

  invalidateCustomerDashboard(customerId);
  invalidateAdminServiceRequestCache();
  return serializeServiceRequest(serviceRequest);
};

export const getCustomerServiceRequests = async ({
  customerId,
  page,
  limit,
  status,
}) => {
  const skip = (page - 1) * limit;
  const where = { customerId };

  if (status) {
    where.status = status?.toUpperCase();
  }

  // The current customer UI does not display a total or page controls. Fetch
  // one extra record to preserve next-page information without a second,
  // latency-heavy COUNT query to the hosted database.
  const serviceRequests = await prisma.serviceRequest.findMany({
    where,
    skip,
    take: limit + 1,
    orderBy: { createdAt: "desc" },
    include: CUSTOMER_SERVICE_REQUEST_INCLUDE,
    relationLoadStrategy: "join",
  });

  const hasNextPage = serviceRequests.length > limit;
  const pageData = hasNextPage ? serviceRequests.slice(0, limit) : serviceRequests;

  return {
    data: pageData.map(serializeServiceRequest),
    pagination: {
      page,
      limit,
      hasNextPage,
    },
  };
};

export const getAdminServiceRequests = async ({
  page,
  limit,
  status,
  search,
}) => {
  const skip = (page - 1) * limit;
  const where = buildAdminServiceRequestWhereClause({ status, search });
  const cacheKey = JSON.stringify({ page, limit, status: status ?? null, search: search ?? null });
  const cachedResult = adminServiceRequestCache.get(cacheKey);

  if (cachedResult?.expiresAt > Date.now()) {
    return cachedResult.data;
  }

  const serviceRequests = await prisma.serviceRequest.findMany({
    where,
    skip,
    take: limit + 1,
    orderBy: { createdAt: "desc" },
    include: SERVICE_REQUEST_SUMMARY_INCLUDE,
    relationLoadStrategy: "join",
  });

  const hasNextPage = serviceRequests.length > limit;
  const pageData = hasNextPage ? serviceRequests.slice(0, limit) : serviceRequests;

  const result = {
    data: pageData.map(serializeServiceRequest),
    pagination: {
      page,
      limit,
      hasNextPage,
    },
  };

  adminServiceRequestCache.set(cacheKey, {
    data: result,
    expiresAt: Date.now() + ADMIN_REQUEST_CACHE_TTL_MS,
  });

  return result;
};

export const getAdminServiceRequestStats = async () => {
  if (adminServiceRequestStatsCache?.expiresAt > Date.now()) {
    return adminServiceRequestStatsCache.data;
  }

  const statusCounts = await prisma.serviceRequest.groupBy({
    by: ["status"],
    _count: { _all: true },
  });

  const countsByStatus = new Map(
    statusCounts.map(({ status, _count }) => [status, _count._all])
  );

  const stats = {
    totalRequests: statusCounts.reduce((total, entry) => total + entry._count._all, 0),
    pending: countsByStatus.get("PENDING") ?? 0,
    approved: countsByStatus.get("APPROVED") ?? 0,
    rejected: countsByStatus.get("REJECTED") ?? 0,
    byStatus: Object.fromEntries(countsByStatus),
  };

  adminServiceRequestStatsCache = {
    data: stats,
    expiresAt: Date.now() + ADMIN_REQUEST_CACHE_TTL_MS,
  };

  return stats;
};

export const respondToServiceRequest = async ({
  requestId,
  reviewerId,
  status,
  responseMessage,
  estimatedDate,
}) => {
  const existingRequest = await prisma.serviceRequest.findUnique({
    where: { id: requestId },
    select: {
      id: true,
      status: true,
      customerId: true,
    },
  });

  if (!existingRequest) {
    throw createAppError(404, "Service request not found");
  }

  if (!canMoveToNextStatus(existingRequest.status, status)) {
    throw createAppError(
      400,
      `Cannot change request status from ${existingRequest.status} to ${status}`
    );
  }

  const updatedRequest = await prisma.serviceRequest.update({
    where: { id: requestId },
    data: {
      reviewerId,
      status,
      ...(responseMessage !== undefined
        ? { responseMessage: responseMessage ?? null }
        : {}),
      ...(estimatedDate !== undefined ? { estimatedDate } : {}),
    },
    include: SERVICE_REQUEST_SUMMARY_INCLUDE,
  });

  invalidateCustomerDashboard(existingRequest.customerId);
  invalidateAdminServiceRequestCache();
  return serializeServiceRequest(updatedRequest);
};

export const getCustomerDashboardSummaryData = async (customerId) => {
  const cachedDashboard = customerDashboardCache.get(customerId);
  if (cachedDashboard?.expiresAt > Date.now()) {
    return cachedDashboard.data;
  }

  // Neon adds noticeable latency per database round trip. This CTE returns
  // the three counters and five activity records in one indexed query.
  const [dashboardRow] = await prisma.$queryRaw`
    SELECT
      COUNT(*) FILTER (WHERE "status" = 'APPROVED')::int AS "activeServices",
      COUNT(*) FILTER (WHERE "status" = 'PENDING')::int AS "pendingRequests",
      COUNT(*) FILTER (WHERE "status" = 'COMPLETED')::int AS "completed",
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'id', recent."id",
              'status', recent."status",
              'createdAt', recent."createdAt",
              'updatedAt', recent."updatedAt",
              'totalItems', recent."totalItems",
              'items', recent.items
            )
            ORDER BY recent."updatedAt" DESC
          )
          FROM (
            SELECT
              request."id",
              request."status",
              request."createdAt",
              request."updatedAt",
              COALESCE(items."totalItems", 0) AS "totalItems",
              COALESCE(items.items, '[]'::json) AS items
            FROM "ServiceRequest" AS request
            LEFT JOIN LATERAL (
              SELECT
                (
                  SELECT COALESCE(SUM("quantity"), 0)::int
                  FROM "RequestItem"
                  WHERE "requestId" = request."id"
                ) AS "totalItems",
                json_agg(
                  json_build_object(
                    'id', item."id",
                    'quantity', item."quantity",
                    'unitPriceSnap', item."unitPriceSnap",
                    'service', json_build_object('name', service."name")
                  )
                  ORDER BY item."id" ASC
                ) AS items
              FROM (
                SELECT *
                FROM "RequestItem"
                WHERE "requestId" = request."id"
                ORDER BY "id" ASC
                LIMIT 1
              ) AS item
              INNER JOIN "Service" AS service ON service."id" = item."serviceId"
            ) AS items ON true
            WHERE request."customerId" = ${customerId}
            ORDER BY request."updatedAt" DESC
            LIMIT 5
          ) AS recent
        ),
        '[]'::json
      ) AS "recentActivity"
    FROM "ServiceRequest"
    WHERE "customerId" = ${customerId}
  `;

  const dashboardData = {
    counts: {
      activeServices: dashboardRow?.activeServices ?? 0,
      pendingRequests: dashboardRow?.pendingRequests ?? 0,
      completed: dashboardRow?.completed ?? 0,
    },
    recentActivity: dashboardRow?.recentActivity ?? [],
  };

  customerDashboardCache.set(customerId, {
    data: dashboardData,
    expiresAt: Date.now() + DASHBOARD_CACHE_TTL_MS,
  });

  return dashboardData;
};

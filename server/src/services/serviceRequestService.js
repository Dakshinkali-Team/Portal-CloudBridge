import prisma from "../config/prisma.js";
import {
  SERVICE_REQUEST_STATUSES,
  SERVICE_REQUEST_TRANSITIONS,
} from "../constants/serviceRequestStatus.js";
import { createAppError } from "../utils/appError.js";
import { buildPaginationMeta } from "../utils/pagination.js";

const SERVICE_REQUEST_INCLUDE = {
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
    orderBy: { id: "asc" },
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

  console.log(items);
  

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
      include: SERVICE_REQUEST_INCLUDE,
    });
  });

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

  const [serviceRequests, total] = await prisma.$transaction([
    prisma.serviceRequest.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: SERVICE_REQUEST_INCLUDE,
    }),
    prisma.serviceRequest.count({ where }),
  ]);

  return {
    data: serviceRequests.map(serializeServiceRequest),
    pagination: buildPaginationMeta(page, limit, total),
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

  const [serviceRequests, total] = await prisma.$transaction([
    prisma.serviceRequest.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: SERVICE_REQUEST_INCLUDE,
    }),
    prisma.serviceRequest.count({ where }),
  ]);

  return {
    data: serviceRequests.map(serializeServiceRequest),
    pagination: buildPaginationMeta(page, limit, total),
  };
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
    include: SERVICE_REQUEST_INCLUDE,
  });

  return serializeServiceRequest(updatedRequest);
};

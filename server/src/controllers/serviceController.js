import prisma from "../config/prisma.js";

const SERVICE_CATEGORIES = new Set([
  "COMPUTE",
  "DATABASE",
  "STORAGE",
  "NETWORK",
]);

const SERVICE_INCLUDE = {
  variants: {
    orderBy: { id: "asc" },
    include: {
      attributes: {
        orderBy: { id: "asc" },
      },
    },
  },
};

const createHttpError = (status, message) =>
  Object.assign(new Error(message), { status });

const hasValue = (value) =>
  value !== undefined &&
  value !== null &&
  !(typeof value === "string" && value.trim() === "");

const asTrimmedString = (value) =>
  typeof value === "string" ? value.trim() : "";

const parsePositiveInt = (value, fieldName) => {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw createHttpError(400, `${fieldName} must be a positive integer`);
  }

  return parsed;
};

const parseNumberField = (value, fieldName) => {
  const parsed = Number.parseFloat(value);

  if (Number.isNaN(parsed)) {
    throw createHttpError(400, `${fieldName} must be a valid number`);
  }

  return parsed;
};

const normalizeCategory = (category) => {
  const normalized = asTrimmedString(category).toUpperCase();

  if (!SERVICE_CATEGORIES.has(normalized)) {
    throw createHttpError(
      400,
      `category must be one of: ${Array.from(SERVICE_CATEGORIES).join(", ")}`
    );
  }

  return normalized;
};

const normalizeAttribute = (attribute, variantIndex, attributeIndex) => {
  if (!attribute || typeof attribute !== "object" || Array.isArray(attribute)) {
    throw createHttpError(
      400,
      `variants[${variantIndex}].attributes[${attributeIndex}] must be an object`
    );
  }

  const key = asTrimmedString(attribute.key);

  if (!key) {
    throw createHttpError(
      400,
      `variants[${variantIndex}].attributes[${attributeIndex}].key is required`
    );
  }

  const hasNumber = hasValue(attribute.valueNumber);
  const hasText = hasValue(attribute.valueText);

  if (!hasNumber && !hasText) {
    throw createHttpError(
      400,
      `variants[${variantIndex}].attributes[${attributeIndex}] must include valueNumber or valueText`
    );
  }

  return {
    key,
    unit: asTrimmedString(attribute.unit) || null,
    valueNumber: hasNumber
      ? parseNumberField(
          attribute.valueNumber,
          `variants[${variantIndex}].attributes[${attributeIndex}].valueNumber`
        )
      : null,
    valueText: hasText ? asTrimmedString(attribute.valueText) : null,
  };
};

const normalizeVariant = (variant, variantIndex) => {
  if (!variant || typeof variant !== "object" || Array.isArray(variant)) {
    throw createHttpError(400, `variants[${variantIndex}] must be an object`);
  }

  if (!hasValue(variant.basePrice)) {
    throw createHttpError(
      400,
      `variants[${variantIndex}].basePrice is required`
    );
  }

  if (variant.attributes !== undefined && !Array.isArray(variant.attributes)) {
    throw createHttpError(
      400,
      `variants[${variantIndex}].attributes must be an array`
    );
  }

  const currency = asTrimmedString(variant.currency).toUpperCase() || "USD";
  const billingInterval =
    asTrimmedString(variant.billingInterval).toUpperCase() || "MONTHLY";
  const attributesInput = Array.isArray(variant.attributes)
    ? variant.attributes
    : [];

  return {
    basePrice: parseNumberField(
      variant.basePrice,
      `variants[${variantIndex}].basePrice`
    ),
    currency,
    billingInterval,
    attributes: attributesInput.map((attribute, attributeIndex) =>
      normalizeAttribute(attribute, variantIndex, attributeIndex)
    ),
  };
};

const getNormalizedVariants = (body, { required = false } = {}) => {
  if (body.variants !== undefined && !Array.isArray(body.variants)) {
    throw createHttpError(400, "variants must be an array");
  }

  const hasExplicitVariants = Array.isArray(body.variants);
  const hasSingleVariantShorthand =
    hasValue(body.basePrice) ||
    hasValue(body.currency) ||
    hasValue(body.billingInterval) ||
    Array.isArray(body.attributes);

  let variantsInput = [];

  if (hasExplicitVariants) {
    variantsInput = body.variants;
  } else if (hasSingleVariantShorthand) {
    variantsInput = [
      {
        basePrice: body.basePrice,
        currency: body.currency,
        billingInterval: body.billingInterval,
        attributes: body.attributes,
      },
    ];
  }

  if (required && variantsInput.length === 0) {
    throw createHttpError(
      400,
      "At least one service variant is required for this service"
    );
  }

  if (hasExplicitVariants && variantsInput.length === 0) {
    throw createHttpError(400, "variants must contain at least one item");
  }

  if (
    hasSingleVariantShorthand &&
    body.attributes !== undefined &&
    !Array.isArray(body.attributes)
  ) {
    throw createHttpError(400, "attributes must be an array");
  }

  return variantsInput.map((variant, variantIndex) =>
    normalizeVariant(variant, variantIndex)
  );
};

const buildServiceData = (body, { partial = false } = {}) => {
  const data = {};

  if (hasValue(body.name)) {
    data.name = asTrimmedString(body.name);
  } else if (!partial) {
    throw createHttpError(400, "name is required");
  }

  if (!partial && !data.name) {
    throw createHttpError(400, "name is required");
  }

  if (hasValue(body.category)) {
    data.category = normalizeCategory(body.category);
  } else if (!partial) {
    throw createHttpError(400, "category is required");
  }

  const specificationsValue = hasValue(body.specifications)
    ? body.specifications
    : body.specification;

  if (hasValue(specificationsValue)) {
    data.specifications = asTrimmedString(specificationsValue);
  } else if (!partial) {
    throw createHttpError(400, "specifications is required");
  }

  if (!partial && !data.specifications) {
    throw createHttpError(400, "specifications is required");
  }

  return data;
};

const serializeService = (service) => {
  const variantPrices = service.variants.map((variant) => variant.basePrice);

  return {
    ...service,
    variantCount: service.variants.length,
    startingPrice: variantPrices.length ? Math.min(...variantPrices) : null,
  };
};

const handleControllerError = (res, error, fallbackMessage) => {
  if (error?.status) {
    return res.status(error.status).json({
      success: false,
      error: error.message,
    });
  }

  if (error?.code === "P2025") {
    return res.status(404).json({
      success: false,
      error: "Service not found",
    });
  }

  console.error(fallbackMessage, error);

  return res.status(500).json({
    success: false,
    error: "Internal Server Error",
  });
};

// ======================================================
// 1. CREATE SERVICE
// ======================================================
export const createService = async (req, res) => {
  try {
    const serviceData = buildServiceData(req.body);
    const variants = getNormalizedVariants(req.body, { required: true });

    const newService = await prisma.service.create({
      data: {
        ...serviceData,
        variants: {
          create: variants.map((variant) => ({
            basePrice: variant.basePrice,
            currency: variant.currency,
            billingInterval: variant.billingInterval,
            attributes: {
              create: variant.attributes,
            },
          })),
        },
      },
      include: SERVICE_INCLUDE,
    });

    return res.status(201).json({
      success: true,
      data: serializeService(newService),
    });
  } catch (error) {
    return handleControllerError(res, error, "Create Service Error:");
  }
};

// ======================================================
// 2. GET ALL SERVICES (PAGINATED)
// ======================================================
export const getServices = async (req, res) => {
  try {
    const page = parsePositiveInt(req.query.page ?? 1, "page");
    const limit = parsePositiveInt(req.query.limit ?? 10, "limit");
    const skip = (page - 1) * limit;
    const where = hasValue(req.query.category)
      ? { category: normalizeCategory(req.query.category) }
      : undefined;

    const [services, total] = await prisma.$transaction([
      prisma.service.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: SERVICE_INCLUDE,
      }),
      prisma.service.count({ where }),
    ]);

    return res.status(200).json({
      success: true,
      data: services.map(serializeService),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleControllerError(res, error, "Fetch Services Error:");
  }
};

// ======================================================
// 3. GET SERVICE BY ID
// ======================================================
export const getServiceById = async (req, res) => {
  try {
    const id = parsePositiveInt(req.params.id, "id");

    const service = await prisma.service.findUnique({
      where: { id },
      include: SERVICE_INCLUDE,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        error: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: serializeService(service),
    });
  } catch (error) {
    return handleControllerError(res, error, "Fetch Service Error:");
  }
};

// ======================================================
// 4. UPDATE SERVICE
// ======================================================
export const updateService = async (req, res) => {
  try {
    const id = parsePositiveInt(req.params.id, "id");
    const serviceData = buildServiceData(req.body, { partial: true });
    const shouldReplaceVariants =
      Array.isArray(req.body.variants) ||
      hasValue(req.body.basePrice) ||
      hasValue(req.body.currency) ||
      hasValue(req.body.billingInterval) ||
      Array.isArray(req.body.attributes);

    const variants = shouldReplaceVariants
      ? getNormalizedVariants(req.body, { required: true })
      : [];

    const updatedService = await prisma.$transaction(async (tx) => {
      const existingService = await tx.service.findUnique({
        where: { id },
        select: {
          id: true,
          _count: {
            select: {
              requestItems: true,
            },
          },
        },
      });

      if (!existingService) {
        throw createHttpError(404, "Service not found");
      }

      if (shouldReplaceVariants && existingService._count.requestItems > 0) {
        throw createHttpError(
          400,
          "Cannot replace variants for a service that is already referenced in service requests"
        );
      }

      await tx.service.update({
        where: { id },
        data: {
          ...serviceData,
          ...(shouldReplaceVariants
            ? {
                variants: {
                  deleteMany: {},
                  create: variants.map((variant) => ({
                    basePrice: variant.basePrice,
                    currency: variant.currency,
                    billingInterval: variant.billingInterval,
                    attributes: {
                      create: variant.attributes,
                    },
                  })),
                },
              }
            : {}),
        },
      });

      return tx.service.findUnique({
        where: { id },
        include: SERVICE_INCLUDE,
      });
    });

    return res.status(200).json({
      success: true,
      data: serializeService(updatedService),
    });
  } catch (error) {
    return handleControllerError(res, error, "Update Service Error:");
  }
};

// ======================================================
// 5. DELETE SERVICE
// ======================================================
export const deleteService = async (req, res) => {
  try {
    const id = parsePositiveInt(req.params.id, "id");

    const existingService = await prisma.service.findUnique({
      where: { id },
      select: {
        id: true,
        _count: {
          select: {
            requestItems: true,
          },
        },
      },
    });

    if (!existingService) {
      return res.status(404).json({
        success: false,
        error: "Service not found",
      });
    }

    if (existingService._count.requestItems > 0) {
      return res.status(400).json({
        success: false,
        error: "Cannot delete a service that is already referenced in service requests",
      });
    }

    await prisma.service.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    return handleControllerError(res, error, "Delete Service Error:");
  }
};

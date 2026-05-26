import prisma from "../config/prisma.js";

// ======================================================
// 1. CREATE SERVICE
// ======================================================
export const createService = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      basePrice,
      hasSliders,
      vcpuPrice,
      ramPrice,
      storagePrice,
      isFixedVariant,
      variantSizeGb,
      isActive          // now accepted at creation time
    } = req.body;

    if (!name || !category || basePrice === undefined) {
      return res.status(400).json({
        success: false,
        error: "name, category, and basePrice are required"
      });
    }

    const newService = await prisma.serviceCatalog.create({  //service ma rakhne
      data: {
        name,
        category,
        description: description || null,

        basePrice: parseFloat(basePrice),

        hasSliders: Boolean(hasSliders),

        vcpuPrice:    parseFloat(vcpuPrice    || 0),
        ramPrice:     parseFloat(ramPrice     || 0),
        storagePrice: parseFloat(storagePrice || 0),

        isFixedVariant: Boolean(isFixedVariant),
        variantSizeGb:  parseInt(variantSizeGb || 0),

        isActive: isActive !== undefined ? Boolean(isActive) : true  // defaults to true if not provided
      }
    });

    return res.status(201).json({
      success: true,
      data: newService
    });

  } catch (error) {
    console.error("Create Service Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
};


// ======================================================
// 2. GET ALL SERVICES (PAGINATED)
// ======================================================
export const getServices = async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1; //query ma frontend bata aauxa
    const limit = parseInt(req.query.limit) || 10;
    const skip  = (page - 1) * limit;

    const [services, total] = await prisma.$transaction([
      prisma.serviceCatalog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }
      }),
      prisma.serviceCatalog.count()
    ]);

    return res.status(200).json({
      success: true,
      data: services,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("Fetch Error:", error);
    return res.status(500).json({
      success: false,
      error: "Fetch Inventory Failure"
    });
  }
};


// ======================================================
// 3. GET SERVICE BY ID
// ======================================================
export const getServiceById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const service = await prisma.serviceCatalog.findUnique({
      where: { id }
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        error: "Service not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: service
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Fetch Single Record Failure"
    });
  }
};


// ======================================================
// 4. UPDATE SERVICE (SAFE + CONTROLLED)
// ======================================================
export const updateService = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Guardrail: prevent editing in-use templates
    // ⚠️  Uncomment these checks once ServiceRequest and ActiveService
    //     models are added to your schema.prisma
    //
    // const checkRequests = await prisma.serviceRequest.findFirst({
    //   where: { serviceCatalogId: id }
    // });
    // const checkActiveDeployments = await prisma.activeService.findFirst({
    //   where: { serviceCatalogId: id }
    // });
    // if (checkRequests || checkActiveDeployments) {
    //   return res.status(400).json({
    //     success: false,
    //     error: "Cannot update: Service is already used in active or pending workflows"
    //   });
    // }

    const {
      name,
      category,
      description,
      basePrice,
      hasSliders,
      vcpuPrice,
      ramPrice,
      storagePrice,
      isFixedVariant,
      variantSizeGb,
      isActive
    } = req.body;

    const updatedService = await prisma.serviceCatalog.update({
      where: { id },
      data: {
        name,
        category,
        description,

        basePrice:    basePrice    !== undefined ? parseFloat(basePrice)    : undefined,
        vcpuPrice:    vcpuPrice    !== undefined ? parseFloat(vcpuPrice)    : undefined,
        ramPrice:     ramPrice     !== undefined ? parseFloat(ramPrice)     : undefined,
        storagePrice: storagePrice !== undefined ? parseFloat(storagePrice) : undefined,
        variantSizeGb: variantSizeGb !== undefined ? parseInt(variantSizeGb) : undefined,

        hasSliders,
        isFixedVariant,
        isActive
      }
    });

    return res.status(200).json({
      success: true,
      data: updatedService
    });

  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({
      success: false,
      error: "Update failed"
    });
  }
};


// ======================================================
// 5. DELETE SERVICE (SAFE GUARD)
// ======================================================
export const deleteService = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // ⚠️  Uncomment these checks once ServiceRequest and ActiveService
    //     models are added to your schema.prisma
    //
    // const checkRequests = await prisma.serviceRequest.findFirst({
    //   where: { serviceCatalogId: id }
    // });
    // const checkActiveDeployments = await prisma.activeService.findFirst({
    //   where: { serviceCatalogId: id }
    // });
    // if (checkRequests || checkActiveDeployments) {
    //   return res.status(400).json({
    //     success: false,
    //     error: "Cannot delete: Service is referenced in system workflows"
    //   });
    // }

    await prisma.serviceCatalog.delete({
      where: { id }
    });

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully"
    });

  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({
      success: false,
      error: "Deletion failed"
    });
  }
};
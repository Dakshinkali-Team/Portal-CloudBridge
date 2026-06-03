import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../config/prisma.js";

export const getPublicPricing = asyncHandler(async (req, res) => {
  // Try to read a COMPUTE catalog item that contains vcpuPrice / ramPrice
  const item = await prisma.serviceCatalog.findFirst({
    where: { category: "COMPUTE", isActive: true },
    select: { vcpuPrice: true, ramPrice: true },
    orderBy: [{ id: "asc" }],
  });

  if (!item) {
    return res.status(200).json({ success: true, data: { vcpuPrice: 0, ramPrice: 0 } });
  }

  res.status(200).json({ success: true, data: { vcpuPrice: Number(item.vcpuPrice || 0), ramPrice: Number(item.ramPrice || 0) } });
});

export default { getPublicPricing };

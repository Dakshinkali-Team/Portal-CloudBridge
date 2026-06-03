import { asyncHandler } from "../utils/asyncHandler.js";
import { getServiceCatalogForCalculator } from "../services/serviceCatalogService.js";

export const getServiceCatalog = asyncHandler(async (req, res) => {
  const data = await getServiceCatalogForCalculator();

  res.status(200).json({
    success: true,
    data,
  });
});

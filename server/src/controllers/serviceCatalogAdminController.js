import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getAdminServiceCatalog,
  updateAdminServiceCatalogItem,
} from "../services/serviceCatalogService.js";

export const listAdminServiceCatalog = asyncHandler(async (req, res) => {
  const data = await getAdminServiceCatalog();

  res.status(200).json({
    success: true,
    data,
  });
});

export const editAdminServiceCatalogItem = asyncHandler(async (req, res) => {
  const data = await updateAdminServiceCatalogItem(req.params.id, req.body);

  res.status(200).json({
    success: true,
    data,
  });
});

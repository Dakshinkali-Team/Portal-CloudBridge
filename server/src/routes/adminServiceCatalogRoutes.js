import express from "express";
import {
  editAdminServiceCatalogItem,
  listAdminServiceCatalog,
} from "../controllers/serviceCatalogAdminController.js";

const router = express.Router();

router.get("/", listAdminServiceCatalog);
router.patch("/:id", editAdminServiceCatalogItem);

export default router;

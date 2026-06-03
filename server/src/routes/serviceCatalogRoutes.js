import express from "express";
import { getServiceCatalog } from "../controllers/serviceCatalogController.js";

const router = express.Router();

router.get("/catalog", getServiceCatalog);

export default router;

import express from "express";
import { getPublicPricing } from "../controllers/pricingController.js";

const router = express.Router();

// Public pricing used by landing page preview
router.get("/", getPublicPricing);

export default router;

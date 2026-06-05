import express from "express";
import { getPublicPricing, estimateCost } from "../controllers/pricingController.js";

const router = express.Router();

// Public pricing used by landing page preview
router.get("/", getPublicPricing);

// Cost estimation for storage and bandwidth services
router.post("/estimate", estimateCost);

export default router;

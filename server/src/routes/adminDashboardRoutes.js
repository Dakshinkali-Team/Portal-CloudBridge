import express from "express";
import { getAdminDashboardOverview } from "../controllers/adminDashboardController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome Admin Dashboard", user: req.user });
});

router.get("/overview", getAdminDashboardOverview);

export default router;

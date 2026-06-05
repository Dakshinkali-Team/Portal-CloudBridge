import express from "express";
import {
  myProfile,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, myProfile);

export default router;
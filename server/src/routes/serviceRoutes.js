import express from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService
} from "../controllers/serviceController.js";

const router = express.Router();

// Middleware is applied at mount point in server.js — clean routes here
router.post("/",      createService);   // POST   /api/admin/services
router.get("/",       getServices);     // GET    /api/admin/services
router.get("/:id",    getServiceById);  // GET    /api/admin/services/:id
router.put("/:id",    updateService);   // PUT    /api/admin/services/:id
router.delete("/:id", deleteService);   // DELETE /api/admin/services/:id

export default router;
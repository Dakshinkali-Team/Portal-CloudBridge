import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import serviceRoutes from "./src/routes/serviceRoutes.js";
import customerRoutes from "./src/routes/customerRoutes.js";
import adminServiceRequestRoutes from "./src/routes/adminServiceRequestRoutes.js";
import { authMiddleware } from "./src/middleware/authMiddleware.js";
import { adminMiddleware } from "./src/middleware/adminMiddleware.js";
import {
  errorHandler,
  notFoundHandler,
} from "./src/middleware/errorHandler.js";
import { ROLES } from "./src/constants/roles.js";
import { customerMiddleware } from "./src/middleware/customerMiddleware.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// ==========================================
// APPLICATION ROUTE GATEWAYS
// ==========================================

// AUTH PATHWAY
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/customer", authMiddleware, customerMiddleware, customerRoutes);

// ADMIN SERVICE CONFIGURATIONS PATHWAY
// authMiddleware + adminMiddleware applied to entire admin router
app.use("/api/admin", authMiddleware, adminMiddleware, serviceRoutes);
app.use(
  "/api/admin/service-requests",
  authMiddleware,
  adminMiddleware,
  adminServiceRequestRoutes
);

// HEALTH DIAGNOSTIC ROOT INTERCEPTOR
app.get("/", (req, res) => res.send("Server Running"));

// ==========================================
// PROTECTED ROUTE ENTITIES (DASHBOARDS)
// ==========================================

// CUSTOMER DASHBOARD SECURITY GATEWAY
app.get("/api/customer/dashboard", authMiddleware, (req, res) => {
  if (req.user.role !== ROLES.CUSTOMER) {
    return res.status(403).json({ message: "Customer access only" });
  }

  res.json({ message: "Welcome Customer Dashboard", user: req.user });
});

// ADMIN DASHBOARD SECURITY GATEWAY
app.get("/api/admin/dashboard", authMiddleware, (req, res) => {
  if (req.user.role !== ROLES.ADMIN && req.user.role !== ROLES.SUPER_ADMIN) {
    return res.status(403).json({ message: "Admin access only" });
  }

  res.json({ message: "Welcome Admin Dashboard", user: req.user });
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import { authMiddleware } from "./src/middleware/authMiddleware.js";
import { ROLES } from "./src/constants/roles.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// AUTH ROUTES
app.use("/api/auth", authRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

// CUSTOMER DASHBOARD
app.get(
  "/api/customer/dashboard",
  authMiddleware,
  (req, res) => {
    if (req.user.role !== ROLES.CUSTOMER) {
      return res.status(403).json({
        message: "Customer access only",
      });
    }

    res.json({
      message: "Welcome Customer Dashboard",
      user: req.user,
    });
  }
);

// ADMIN DASHBOARD
app.get(
  "/api/admin/dashboard",
  authMiddleware,
  (req, res) => {
    if (
      req.user.role !== ROLES.ADMIN &&
      req.user.role !== ROLES.SUPER_ADMIN
    ) {
      return res.status(403).json({
        message: "Admin access only",
      });
    }

    res.json({
      message: "Welcome Admin Dashboard",
      user: req.user,
    });
  }
);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
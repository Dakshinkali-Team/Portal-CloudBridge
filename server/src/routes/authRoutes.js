import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  checkEmail,
  changePassword,
  forgotPassword,
  resetPassword,
  registerUser,
  loginUser,
} from "../controllers/authController.js";
import {
  changePasswordSchema,
  checkEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validators/authValidators.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post(
  "/check-email",
  validateRequest({ body: checkEmailSchema }),
  checkEmail
);
router.post(
  "/forgot-password",
  validateRequest({ body: forgotPasswordSchema }),
  forgotPassword
);
router.post(
  "/reset-password",
  validateRequest({ body: resetPasswordSchema }),
  resetPassword
);
router.put(
  "/change-password",
  authMiddleware,
  validateRequest({ body: changePasswordSchema }),
  changePassword
);

export default router;

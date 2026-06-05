import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js"; 
import { ROLES } from "../constants/roles.js";
import {
  loginSchema,
  registerSchema,
} from "../validators/authValidators.js";
import { validateEmail, validatePassword } from "../utils/validation.js";

const RESET_TOKEN_TTL_MINUTES = 15;

const normalizeEmail = (email) => String(email || "").trim();

const createResetToken = (email) =>
  jwt.sign({ email: normalizeEmail(email) }, process.env.JWT_SECRET, {
    expiresIn: `${RESET_TOKEN_TTL_MINUTES}m`,
  });

const verifyResetToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

const buildResetPasswordUrl = (rawToken) => {
  const clientUrl = (process.env.CLIENT_URL || "http://localhost:5173").replace(
    /\/$/,
    ""
  );

  return `${clientUrl}/set-password?token=${encodeURIComponent(rawToken)}`;
};

const shouldExposeResetUrl = () =>
  process.env.NODE_ENV !== "production" ||
  process.env.RESET_PASSWORD_SIMULATE === "true" ||
  !process.env.SMTP_HOST;

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, accountType, companyName, role } = req.body;

    // VALIDATE INPUT
    try {
      registerSchema.parse({
        name,
        email,
        password,
        accountType,
        companyName,
        role,
      });
    } catch (validationError) {
      const errors = validationError.errors[0];
      return res.status(400).json({
        success: false,
        message: errors.message,
      });
    }

    const normalizedAccountType =
      String(accountType).trim().toUpperCase() === "COMPANY"
        ? "COMPANY"
        : "INDIVIDUAL";

    // CHECK EXISTING USER
    const existingUser = await prisma.user.findUnique({
      where: { email: email.trim() },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        password: hashedPassword,
        role,
        accountType: normalizedAccountType,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    // If company account and company name provided, create profile record
    if (normalizedAccountType === "COMPANY" && companyName && companyName.trim()) {
      try {
        await prisma.profile.create({
          data: {
            userId: user.id,
            fullName: name?.trim() || null,
            company: companyName.trim(),
          },
        });
      } catch (profileErr) {
        console.warn("Failed to create profile for company user:", profileErr.message);
      }
    }

    // GENERATE TOKEN
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      role: user.role,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log("REGISTER ERROR:", err.message);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // VALIDATE INPUT
    try {
      loginSchema.parse({
        email,
        password,
      });
    } catch (validationError) {
      const errors = validationError.errors[0];
      return res.status(400).json({
        success: false,
        message: errors.message,
      });
    }

    // FIND USER
    const user = await prisma.user.findUnique({
      where: { email: email.trim() },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // JWT TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: user.role,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const validation = validateEmail(email);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.error,
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
      },
    });

    return res.status(200).json({
      success: true,
      exists: Boolean(user),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const validation = validateEmail(email);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.error,
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If email exists, reset instructions will be sent",
      });
    }

    const rawToken = createResetToken(user.email);
    const resetUrl = buildResetPasswordUrl(rawToken);

    if (shouldExposeResetUrl()) {
      console.info(`Password reset link for ${user.email}: ${resetUrl}`);
    }

    return res.status(200).json({
      success: true,
      message: "If email exists, reset instructions will be sent",
      ...(shouldExposeResetUrl() ? { resetUrl } : {}),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const rawToken = String(token || "").trim();

    if (!rawToken) {
      return res.status(400).json({
        success: false,
        message: "Reset token is required.",
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.error,
      });
    }

    let payload;
    try {
      payload = verifyResetToken(rawToken);
    } catch (tokenError) {
      return res.status(400).json({
        success: false,
        message: "Reset token is invalid or expired.",
      });
    }

    const email = normalizeEmail(payload?.email);
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Reset token is invalid or expired.",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset token is invalid or expired.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { currentPassword, password } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.error,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

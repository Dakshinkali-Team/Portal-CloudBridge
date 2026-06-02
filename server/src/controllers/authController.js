import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js"; 
import { ROLES } from "../constants/roles.js";
import { loginSchema, registerSchema } from "../validators/authValidators.js";

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

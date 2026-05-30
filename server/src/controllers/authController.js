import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js"; 
import { ROLES } from "../constants/roles.js";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, accountType, companyName, role } = req.body;
    const normalizedAccountType =
      String(accountType).trim().toUpperCase() === "COMPANY"
        ? "COMPANY"
        : "INDIVIDUAL";

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }
    // CHECK EXISTING USER
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await prisma.user.create({
      data: {
        name,
        email,
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
      error: err.message,
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // FIND USER
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
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
      error: err.message,
    });
  }
};

import { z } from "zod";
import { MIN_PASSWORD_LENGTH } from "../utils/validation.js";

// Email regex pattern - standard RFC 5322 simplified regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Login validation schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .refine((email) => EMAIL_REGEX.test(email), {
      message: "Please enter a valid email address.",
    }),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`),
});

/**
 * Register validation schema
 */
export const registerSchema = z.object({
  name: z.string().min(1, "Full name is required."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .refine((email) => EMAIL_REGEX.test(email), {
      message: "Please enter a valid email address.",
    }),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`),
  accountType: z.enum(["INDIVIDUAL", "COMPANY"]).optional(),
  companyName: z.string().optional(),
  role: z.string().optional(),
});

export const checkEmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .refine((email) => EMAIL_REGEX.test(email), {
      message: "Please enter a valid email address.",
    }),
});

export const forgotPasswordSchema = checkEmailSchema;

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token is required."),
    password: z
      .string()
      .min(
        MIN_PASSWORD_LENGTH,
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
      ),
    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    password: z
      .string()
      .min(
        MIN_PASSWORD_LENGTH,
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
      ),
    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { createAppError } from "../utils/appError.js";

const formatZodIssues = (issues) =>
  issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

export const notFoundHandler = (req, res, next) => {
  next(createAppError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: formatZodIssues(error.issues),
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        error: "Requested resource was not found",
      });
    }

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        error: "A unique constraint was violated",
      });
    }
  }

  const statusCode = error.statusCode || error.status || 500;
  const message = error.message || "Internal Server Error";

  if (statusCode >= 500) {
    console.error("Unhandled Server Error:", error);
  }

  return res.status(statusCode).json({
    success: false,
    error: message,
    ...(error.details ? { details: error.details } : {}),
  });
};

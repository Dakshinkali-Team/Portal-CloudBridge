import { createAppError } from "../utils/appError.js";

export const allowRoles = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return next(createAppError(401, "Authentication is required"));
  }

  if (!allowedRoles.includes(req.user.role)) {
    return next(createAppError(403, "You are not allowed to access this resource"));
  }

  next();
};

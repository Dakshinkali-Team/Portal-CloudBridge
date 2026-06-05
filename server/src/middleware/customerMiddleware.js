import { ROLES } from "../constants/roles.js";

export const customerMiddleware = (req, res, next) => {
  if (req.user.role !== ROLES.CUSTOMER) {
    return res.status(403).json({
      success: false,
      error: "Customer access only"
    });
  }
  next();
};

import express from "express";
import { ROLES } from "../constants/roles.js";
import {
  createCustomerRequest,
  getCustomerAvailableServices,
  getMyServiceRequests,
} from "../controllers/customerServiceController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  availableServicesQuerySchema,
  createServiceRequestBodySchema,
  myServiceRequestsQuerySchema,
} from "../validators/customerServiceValidators.js";

const router = express.Router();

// router.use(authMiddleware, allowRoles(ROLES.CUSTOMER));

router.get(
  "/services",
  validateRequest({ query: availableServicesQuerySchema }),
  getCustomerAvailableServices
);

router.post(
  "/service-request",
  validateRequest({ body: createServiceRequestBodySchema }),
  createCustomerRequest
);

router.get(
  "/my-services",
  validateRequest({ query: myServiceRequestsQuerySchema }),
  getMyServiceRequests
);

export default router;

import express from "express";
import {
  getAllServiceRequests,
  respondToCustomerServiceRequest,
} from "../controllers/adminServiceRequestController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  adminServiceRequestsQuerySchema,
  respondToServiceRequestBodySchema,
  serviceRequestIdParamSchema,
} from "../validators/adminServiceRequestValidators.js";

const router = express.Router();

router.get(
  "/",
  validateRequest({ query: adminServiceRequestsQuerySchema }),
  getAllServiceRequests
);

router.post(
  "/:id/respond",
  validateRequest({
    params: serviceRequestIdParamSchema,
    body: respondToServiceRequestBodySchema,
  }),
  respondToCustomerServiceRequest
);

export default router;

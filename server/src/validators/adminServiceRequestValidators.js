import { z } from "zod";
import {
  createOptionalTrimmedStringSchema,
  optionalDateSchema,
  optionalRequestStatusSchema,
  paginationQuerySchema,
  positiveIdSchema,
  requestStatusSchema,
} from "./commonSchemas.js";

export const adminServiceRequestsQuerySchema = paginationQuerySchema.extend({
  status: optionalRequestStatusSchema,
  search: createOptionalTrimmedStringSchema(100),
});

export const serviceRequestIdParamSchema = z.object({
  id: positiveIdSchema,
});

export const respondToServiceRequestBodySchema = z.object({
  status: requestStatusSchema,
  responseMessage: createOptionalTrimmedStringSchema(1000),
  estimatedDate: optionalDateSchema,
});

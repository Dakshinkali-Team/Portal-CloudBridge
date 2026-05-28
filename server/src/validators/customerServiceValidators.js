import { z } from "zod";
import {
  createOptionalTrimmedStringSchema,
  optionalServiceCategorySchema,
  paginationQuerySchema,
  positiveIdSchema,
} from "./commonSchemas.js";

export const availableServicesQuerySchema = paginationQuerySchema.extend({
  search: createOptionalTrimmedStringSchema(100),
  category: optionalServiceCategorySchema,
});

const requestItemSchema = z.object({
  serviceVariantId: positiveIdSchema,
  quantity: z.coerce.number().int().min(1).max(100),
});

export const createServiceRequestBodySchema = z
  .object({
    notes: createOptionalTrimmedStringSchema(1000),
    items: z.array(requestItemSchema).min(1).max(50),
  })
  .superRefine((value, context) => {
    const seenVariantIds = new Set();

    value.items.forEach((item, index) => {
      if (seenVariantIds.has(item.serviceVariantId)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["items", index, "serviceVariantId"],
          message: "Duplicate serviceVariantId values are not allowed",
        });
      }

      seenVariantIds.add(item.serviceVariantId);
    });
  });

export const myServiceRequestsQuerySchema = paginationQuerySchema;

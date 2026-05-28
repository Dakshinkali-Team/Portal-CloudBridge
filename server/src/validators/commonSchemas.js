import { z } from "zod";
import {
  SERVICE_REQUEST_STATUS_VALUES,
} from "../constants/serviceRequestStatus.js";

const SERVICE_CATEGORY_VALUES = [
  "COMPUTE",
  "DATABASE",
  "STORAGE",
  "NETWORK",
];

const normalizeEmptyString = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmedValue = value.trim();
  return trimmedValue === "" ? undefined : trimmedValue;
};

const normalizeUppercaseString = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmedValue = value.trim();
  return trimmedValue === "" ? undefined : trimmedValue.toUpperCase();
};

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export const positiveIdSchema = z.coerce.number().int().positive();

export const createOptionalTrimmedStringSchema = (maxLength) =>
  z.preprocess(
    normalizeEmptyString,
    z.string().trim().min(1).max(maxLength).optional()
  );

export const optionalServiceCategorySchema = z.preprocess(
  normalizeUppercaseString,
  z.enum(SERVICE_CATEGORY_VALUES).optional()
);

export const requestStatusSchema = z.preprocess(
  normalizeUppercaseString,
  z.enum(SERVICE_REQUEST_STATUS_VALUES)
);

export const optionalRequestStatusSchema = z.preprocess(
  normalizeUppercaseString,
  z.enum(SERVICE_REQUEST_STATUS_VALUES).optional()
);

export const optionalDateSchema = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.union([z.coerce.date(), z.null()]).optional()
);

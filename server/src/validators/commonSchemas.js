import { z } from "zod"; //import the Zod library for schema validation and data normalization functions for common validation schemas used across the application to ensure consistent validation logic and error handling for fields like pagination, IDs, optional strings, service categories, request statuses, and dates
import {
  SERVICE_REQUEST_STATUS_VALUES,
} from "../constants/serviceRequestStatus.js"; //import the SERVICE_REQUEST_STATUS_VALUES constant, which defines the valid status values for service requests and is used in the requestStatusSchema and optionalRequestStatusSchema to ensure that only valid status values are accepted in the application

const SERVICE_CATEGORY_VALUES = [ //define an array of valid service category values using uppercase strings to be used in schema validation for service creation and updates, ensuring that only recognized categories are accepted in the application
  "COMPUTE",
  "DATABASE",
  "STORAGE",
  "NETWORK",
];

const normalizeEmptyString = (value) => { //a preprocessing function to normalize empty strings to undefined, which allows optional string fields to be treated as missing when they are empty, ensuring that validation logic can differentiate between an empty string and an undefined value for optional fields
  if (typeof value !== "string") {            //if the value is not a string, return it as is without modification, allowing non-string values to pass through without being altered by this normalization function
    return value;                        //if the value is a string, trim any leading or trailing whitespace and check if the resulting string is empty; if it is empty, return undefined to indicate that the field is effectively missing, otherwise return the trimmed string for further validation
  }

  const trimmedValue = value.trim(); //trim the string to remove any leading or trailing whitespace, which allows for more flexible input while still enforcing that an empty string is treated as undefined for optional fields
  return trimmedValue === "" ? undefined : trimmedValue;    // if the trimmed string is empty, return undefined to indicate that the field is effectively missing; otherwise, return the trimmed string for further validation and processing in the application
};

const normalizeUppercaseString = (value) => { //a preprocessing function to convert strings to uppercase and normalize empty strings to undefined
  if (typeof value !== "string") {       //if the value is not a string, return it as is without modification, allowing non-string values to pass through without being altered by this normalization function
    return value;                        //if the value is a string, trim any leading or trailing whitespace and check if the resulting string is empty; if it is empty, return undefined to indicate that the field is effectively missing, otherwise convert the trimmed string to uppercase and return it for further validation
  }

  const trimmedValue = value.trim();      //trim the string to remove any leading or trailing whitespace, which allows for more flexible input while still enforcing that an empty string is treated as undefined for optional fields; then convert the trimmed string to uppercase to ensure consistent formatting for fields like service categories and request statuses, which are expected to be in uppercase format for validation against predefined sets of valid values
  return trimmedValue === "" ? undefined : trimmedValue.toUpperCase();        // if the trimmed string is empty, return undefined to indicate that the field is effectively missing; otherwise, convert the trimmed string to uppercase and return it for further validation and processing in the application, ensuring that fields like service categories and request statuses are consistently formatted for validation against predefined sets of valid values
};

export const paginationQuerySchema = z.object({         //schema for validating pagination query parameters (page and limit) in API requests, ensuring that they are positive integers with sensible defaults and limits to prevent abuse and ensure efficient data retrieval
  page: z.coerce.number().int().min(1).default(1),      //the page parameter must be a positive integer, with a minimum value of 1 and a default value of 1 if not provided, allowing for flexible pagination while ensuring that invalid page numbers are not accepted
  limit: z.coerce.number().int().min(1).max(50).default(10),   //the limit parameter must be a positive integer between 1 and 50, with a default value of 10 if not provided, allowing for flexible pagination while preventing excessively large page sizes that could lead to performance issues or abuse of the API
});

export const positiveIdSchema = z.coerce.number().int().positive(); //schema for validating a positive integer ID, which can be used for parameters like user ID, service request ID, etc.

export const createOptionalTrimmedStringSchema = (maxLength) =>    //a function that creates a Zod schema for an optional trimmed string with a specified maximum length, which can be used for validating fields like service names, descriptions, response messages, etc., ensuring that they are not only optional but also properly formatted and do not exceed the defined length limits
  z.preprocess(                                                     //preprocessing function to normalize empty strings to undefined, allowing optional string fields to be treated as missing when they are empty, ensuring that validation logic can differentiate between an empty string and an undefined value for optional fields
    normalizeEmptyString,
    z.string().trim().min(1).max(maxLength).optional()             //the resulting string must be trimmed, with a minimum length of 1 character and a maximum length defined by the maxLength parameter, and is optional, allowing for flexible input while enforcing that if a value is provided, it must meet the specified formatting and length requirements
  );

export const optionalServiceCategorySchema = z.preprocess(            //schema for validating an optional service category field, which is normalized to uppercase and checked against a predefined set of valid service category values, ensuring that only recognized categories are accepted in the application while allowing for flexible input that can be case-insensitive and treats empty strings as missing values
  normalizeUppercaseString,                                       //preprocessing function to convert strings to uppercase and normalize empty strings to undefined
  z.enum(SERVICE_CATEGORY_VALUES).optional()                      //the resulting string must be one of the valid service category values defined in the SERVICE_CATEGORY_VALUES array, and is optional, allowing for flexible input while enforcing that if a value is provided, it must be a valid category recognized by the application
);

export const requestStatusSchema = z.preprocess(      //schema for validating a required request status field, which is normalized to uppercase and checked against a predefined set of valid service request status values, ensuring that only recognized statuses are accepted in the application while allowing for flexible input that can be case-insensitive
  normalizeUppercaseString,
  z.enum(SERVICE_REQUEST_STATUS_VALUES)                 //the resulting string must be one of the valid service request status values defined in the SERVICE_REQUEST_STATUS_VALUES constant, ensuring that only recognized statuses are accepted in the application while allowing for flexible input that can be case-insensitive
);

export const optionalRequestStatusSchema = z.preprocess(        //schema for validating an optional request status field, which is normalized to uppercase and checked against a predefined set of valid service request status values, ensuring that only recognized statuses are accepted in the application while allowing for flexible input that can be case-insensitive and treats empty strings as missing values
  normalizeUppercaseString,
  z.enum(SERVICE_REQUEST_STATUS_VALUES).optional()              //the resulting string must be one of the valid service request status values defined in the SERVICE_REQUEST_STATUS_VALUES constant, and is optional, allowing for flexible input while enforcing that if a value is provided, it must be a valid status recognized by the application while treating empty strings as missing values
);

export const optionalDateSchema = z.preprocess(     //schema for validating an optional date field, which normalizes empty strings to undefined and allows for flexible input that can be treated as missing when empty, while ensuring that if a value is provided, it can be coerced to a valid date or accepted as null
  (value) => (value === "" ? undefined : value),    //preprocessing function to normalize empty strings to undefined, allowing optional date fields to be treated as missing when they are empty, ensuring that validation logic can differentiate between an empty string and an undefined value for optional fields; if the value is an empty string, it is treated as undefined, otherwise it is passed through for further validation
  z.union([z.coerce.date(), z.null()]).optional()   //the resulting value can be coerced to a valid date or accepted as null, and is optional, allowing for flexible input while enforcing that if a value is provided, it must be a valid date or null, while treating empty strings as missing values
);

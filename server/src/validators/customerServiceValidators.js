import { z } from "zod";      
import {                //
  createOptionalTrimmedStringSchema,
  optionalServiceCategorySchema,
  paginationQuerySchema,
  positiveIdSchema,
} from "./commonSchemas.js";  //import specific validation schemas from a commonSchemas file to use in the customer service request validators, ensuring consistency and reuse of validation logic across different parts of the application

export const availableServicesQuerySchema = paginationQuerySchema.extend({ //extend the pagination query schema with additional fields specific to querying available services for customers
  search: createOptionalTrimmedStringSchema(100),                     //optional search field for filtering available services by name or description, with a maximum length of 100 characters, validated by the createOptionalTrimmedStringSchema function imported from commonSchemas.js
  category: optionalServiceCategorySchema,                                      //optional category field for filtering available services by category, validated by the optionalServiceCategorySchema imported from commonSchemas.js
});

export const availableServicesQuerySchema = paginationQuerySchema.extend({ //extend the pagination query schema with additional fields specific to querying available services for customers
  search: createOptionalTrimmedStringSchema(100),             //optional search field for filtering available services by name or description, with a maximum length of 100 characters, validated by the createOptionalTrimmedStringSchema function imported from commonSchemas.js
  category: optionalServiceCategorySchema,              //optional category field for filtering available services by category, validated by the optionalServiceCategorySchema imported from commonSchemas.js
});

const requestItemSchema = z.object({          //define a schema for a request item, which includes a service variant ID and quantity
  serviceVariantId: positiveIdSchema,         //the ID of the service variant being requested, which must be a positive integer validated by the positiveIdSchema imported from commonSchemas.js
  quantity: z.coerce.number().int().min(1).max(100),  //the quantity of the service variant being requested, which must be a positive integer between 1 and 100, ensuring that customers cannot request invalid quantities of services
});

export const createServiceRequestBodySchema = z           //define a schema for the request body when creating a new customer service request, which includes optional notes and an array of request items, with validation to ensure that there are no duplicate service variant IDs in the items array
  .object({                                                 //the request body must be an object that includes the following fields
    notes: createOptionalTrimmedStringSchema(1000),             //optional notes field for the customer to provide additional information about their service request, with a maximum length of 1000 characters, validated by the createOptionalTrimmedStringSchema function imported from commonSchemas.js
    items: z.array(requestItemSchema).min(1).max(50),           //an array of request items, which must contain at least 1 item and no more than 50 items, validated by the requestItemSchema defined above to ensure that each item has a valid service variant ID and quantity
  })
  .superRefine((value, context) => {                            //add a custom validation to ensure that there are no duplicate service variant IDs in the items array
    const seenVariantIds = new Set();                             //create a Set to keep track of seen service variant IDs to detect duplicates

    value.items.forEach((item, index) => {                          //loop through each item in the items array and check if the service variant ID has already been seen; if it has, add a custom issue to the validation context indicating that duplicate service variant IDs are not allowed
      if (seenVariantIds.has(item.serviceVariantId)) {          //if the service variant ID of the current item has already been seen, it means there is a duplicate, so we add a custom issue to the validation context to indicate that duplicate service variant IDs are not allowed in the request
        context.addIssue({                                        //add a custom issue to the validation context to indicate that duplicate service variant IDs are not allowed in the request, specifying the path to the duplicate field and a descriptive error message
          code: z.ZodIssueCode.custom,                      //set the issue code to "custom" to indicate a custom issue that is not covered by the standard Zod validation rules
          path: ["items", index, "serviceVariantId"],       //specify the path to the duplicate field in the request body, which is the serviceVariantId field of the item at the current index in the items array
          message: "Duplicate serviceVariantId values are not allowed", //set the error message to "Duplicate serviceVariantId values are not allowed"
        });
      }

      seenVariantIds.add(item.serviceVariantId);                  //add the service variant ID of the current item to the seenVariantIds Set to mark it as seen
    });
  });

export const myServiceRequestsQuerySchema = paginationQuerySchema;    //use the pagination query schema for querying the customer's own service requests, allowing for pagination of results without any additional filtering fields specific to this endpoint

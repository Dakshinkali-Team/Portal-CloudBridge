import { z } from "zod"; //import the Zod library for schema validation
import {                         //import specific validation schemas from a commonSchemas file to use in the admin service request validators
  createOptionalTrimmedStringSchema,  //function to create an optional trimmed string schema with a specified maximum length
  optionalDateSchema,                //schema for an optional date field
  optionalRequestStatusSchema,        //schema for an optional request status field
  paginationQuerySchema,             //schema for pagination query parameters (page and limit)
  positiveIdSchema,                 //schema for a positive integer ID parameter
  requestStatusSchema,               //schema for a required request status field
} from "./commonSchemas.js";         //import common validation schemas from a separate file for reuse

export const adminServiceRequestsQuerySchema = paginationQuerySchema.extend({ //extend the pagination query schema with additional fields specific to admin service requests
  status: optionalRequestStatusSchema,                                  //optional request status field   
  search: createOptionalTrimmedStringSchema(100),                     //optional search field for filtering service requests by customer name or service name, with a maximum length of 100 characters
});

export const serviceRequestIdParamSchema = z.object({                   //schema for validating the service request ID parameter in the URL, which must be a positive integer
  id: positiveIdSchema,                                                 //the ID parameter must be a positive integer, validated by the positiveIdSchema imported from commonSchemas.js
});

export const respondToServiceRequestBodySchema = z.object({            //schema for validating the request body when responding to a customer service request, which includes the new status, an optional response message, and an optional estimated date for completion
  status: requestStatusSchema,                            //the new status of the service request, which is required and must be a valid request status as defined in the requestStatusSchema imported from commonSchemas.js             
  reviewerId: positiveIdSchema,                           //the ID of the user who is responding to the service request, which is required and must be a positive integer validated by the positiveIdSchema imported from commonSchemas.js  
  responseMessage: createOptionalTrimmedStringSchema(1000), //an optional response message from the admin to the customer, with a maximum length of 1000 characters, validated by the createOptionalTrimmedStringSchema function imported from commonSchemas.js
  estimatedDate: optionalDateSchema,                      //an optional estimated date for when the service request will be completed, validated by the optionalDateSchema imported from commonSchemas.js
});

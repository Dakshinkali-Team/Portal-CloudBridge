import { getAvailableActiveServices } from "../services/customerCatalogService.js";
import {
  createCustomerServiceRequest,
  getCustomerServiceRequests,
  getCustomerDashboardSummaryData,
} from "../services/serviceRequestService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getCustomerAvailableServices = asyncHandler(async (req, res) => {
  const query = req.validated?.query ?? req.query;
  const result = await getAvailableActiveServices(query);

  res.status(200).json({
    success: true,
    data: result.data,
    pagination: result.pagination,
  });
});

export const createCustomerRequest = asyncHandler(async (req, res) => {
  const body = req.validated?.body ?? req.body;
  const serviceRequest = await createCustomerServiceRequest({
    customerId: req.user.id,
    notes: body.notes,
    items: body.items,
  });

  res.status(201).json({
    success: true,
    message: "Service request created successfully",
    data: serviceRequest,
  });
});

export const getMyServiceRequests = asyncHandler(async (req, res) => {
  const query = req.validated?.query ?? req.query;
  const statusQuery = req.query;
  
  const result = await getCustomerServiceRequests({
    customerId: req.user.id,
    page: query.page,
    limit: query.limit,
    ...(statusQuery.status === "ALL" ? {} : { status: statusQuery.status }),
  });

  res.status(200).json({
    success: true,
    data: result.data,
    pagination: result.pagination,
  });
});

export const getCustomerDashboardSummary = asyncHandler(async (req, res) => {
  const result = await getCustomerDashboardSummaryData(req.user.id);

  res.status(200).json({
    success: true,
    data: result,
  });
});

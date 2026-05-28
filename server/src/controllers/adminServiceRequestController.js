import {
  getAdminServiceRequests,
  respondToServiceRequest,
} from "../services/serviceRequestService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllServiceRequests = asyncHandler(async (req, res) => {
  const query = req.validated?.query ?? req.query;
  const result = await getAdminServiceRequests(query);

  res.status(200).json({
    success: true,
    data: result.data,
    pagination: result.pagination,
  });
});

export const respondToCustomerServiceRequest = asyncHandler(
  async (req, res) => {
    const params = req.validated?.params ?? req.params;
    const body = req.validated?.body ?? req.body;

    const updatedRequest = await respondToServiceRequest({
      requestId: params.id,
      reviewerId: req.user.id,
      status: body.status,
      responseMessage: body.responseMessage,
      estimatedDate: body.estimatedDate,
    });

    res.status(200).json({
      success: true,
      message: "Service request updated successfully",
      data: updatedRequest,
    });
  }
);

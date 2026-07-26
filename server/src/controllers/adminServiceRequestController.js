import {
  getAdminServiceRequests,
  getAdminServiceRequestStats,
  respondToServiceRequest,
} from "../services/serviceRequestService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllServiceRequests = asyncHandler(async (req, res) => {
  const query = req.validated?.query ?? req.query;
  const [result, stats] = await Promise.all([
    getAdminServiceRequests(query),
    getAdminServiceRequestStats(),
  ]);
  const selectedStatus = query.status?.toUpperCase();
  const total = selectedStatus
    ? stats.byStatus?.[selectedStatus] ?? 0
    : stats.totalRequests;

  res.status(200).json({
    success: true,
    data: result.data,
    pagination: {
      ...result.pagination,
      total,
      totalPages: total === 0 ? 0 : Math.ceil(total / query.limit),
    },
    stats,
  });
});

export const respondToCustomerServiceRequest = asyncHandler(
  async (req, res) => {
    const params = req.validated?.params ?? req.params;
    const body = req.validated?.body ?? req.body;

    // Extract and validate reviewer id from authenticated user token
    const rawReviewerId = req.user?.id;
    let reviewerId = null;

    if (typeof rawReviewerId === "number") {
      reviewerId = rawReviewerId;
    } else if (typeof rawReviewerId === "string" && /^\d+$/.test(rawReviewerId)) {
      reviewerId = Number(rawReviewerId);
    }

    if (!reviewerId) {
      console.error("Invalid or missing reviewerId on authenticated user", {
        rawReviewerId,
        path: req.originalUrl,
        method: req.method,
      });

      return res.status(401).json({
        success: false,
        error: "Invalid or missing authenticated user id",
      });
    }

    const updatedRequest = await respondToServiceRequest({
      requestId: params.id,
      reviewerId,
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

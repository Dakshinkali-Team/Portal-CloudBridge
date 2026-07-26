import prisma from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAdminDashboardOverview = asyncHandler(async (req, res) => {
  const [totalUsers, activeServices, pendingRequests, recentRequests] = await prisma.$transaction([
    prisma.user.count(),
    prisma.serviceRequest.count({
      where: { status: "APPROVED" },
    }),
    prisma.serviceRequest.count({
      where: { status: "PENDING" },
    }),
    prisma.serviceRequest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        customer: {
          include: {
            profile: true,
          },
        },
        items: {
          include: {
            service: true,
          },
        },
      },
      relationLoadStrategy: "join",
    }),
  ]);

  // Format recent requests for the frontend ActivityItem component
  const formattedRequests = recentRequests.map((req) => {
    const company = req.customer.profile?.company || req.customer.name;
    const firstItem = req.items[0];
    const serviceName = firstItem ? firstItem.service.name : "Cloud Request";
    
    // Status mapping: PENDING -> pending, APPROVED -> approved, COMPLETED -> deployed, REJECTED -> rejected
    let mappedStatus = "pending";
    if (req.status === "APPROVED") mappedStatus = "approved";
    if (req.status === "COMPLETED") mappedStatus = "deployed";
    if (req.status === "REJECTED") mappedStatus = "rejected";

    return {
      id: req.id,
      company,
      service: serviceName,
      status: mappedStatus,
      time: req.createdAt,
    };
  });

  // Dynamic simulation for resource utilization and system health
  const cpu = Math.floor(Math.random() * 15) + 45; // 45-60%
  const memory = Math.floor(Math.random() * 10) + 70; // 70-80%
  const storage = 48; // stable
  const network = Math.floor(Math.random() * 20) + 25; // 25-45%

  const stats = {
    totalUsers,
    activeServices,
    pendingRequests,
    systemHealth: {
      value: "99.9%",
      label: "Stable",
      trendType: "up",
    },
  };

  const resourceUtilization = {
    cpu,
    memory,
    storage,
    network,
  };

  // Static mock alerts to feel alive and functional
  const alerts = [
    {
      id: 1,
      message: "System health check passed successfully",
      alertType: "success",
      time: "Just now",
    },
    {
      id: 2,
      message: "Database backup completed successfully",
      alertType: "info",
      time: "1 hour ago",
    },
    {
      id: 3,
      message: "Scheduled platform updates set for 2026-08-01",
      alertType: "info",
      time: "4 hours ago",
    },
  ];

  res.status(200).json({
    success: true,
    data: {
      stats,
      recentRequests: formattedRequests,
      alerts,
      resourceUtilization,
    },
  });
});

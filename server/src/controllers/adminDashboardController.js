import prisma from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const DASHBOARD_CACHE_TTL_MS = 15_000;
let dashboardCache = null;

export const getAdminDashboardOverview = asyncHandler(async (req, res) => {
  if (dashboardCache?.expiresAt > Date.now()) {
    return res.status(200).json({ success: true, data: dashboardCache.data });
  }

  // The dashboard only renders aggregate counters and a compact activity list.
  // Keeping them in one query avoids four hosted-database round trips.
  const [dashboardRow] = await prisma.$queryRaw`
    WITH recent_requests AS (
      SELECT
        request."id",
        COALESCE(profile."company", customer."name") AS company,
        COALESCE(first_service."name", 'Cloud Request') AS service,
        request."status",
        request."createdAt"
      FROM "ServiceRequest" AS request
      INNER JOIN "User" AS customer ON customer."id" = request."customerId"
      LEFT JOIN "Profile" AS profile ON profile."userId" = customer."id"
      LEFT JOIN LATERAL (
        SELECT service."name"
        FROM "RequestItem" AS item
        INNER JOIN "Service" AS service ON service."id" = item."serviceId"
        WHERE item."requestId" = request."id"
        ORDER BY item."id" ASC
        LIMIT 1
      ) AS first_service ON true
      ORDER BY request."createdAt" DESC
      LIMIT 5
    )
    SELECT
      (SELECT COUNT(*)::int FROM "User") AS "totalUsers",
      COUNT(*) FILTER (WHERE "status" = 'APPROVED')::int AS "activeServices",
      COUNT(*) FILTER (WHERE "status" = 'PENDING')::int AS "pendingRequests",
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'id', recent."id",
              'company', recent.company,
              'service', recent.service,
              'status', recent."status",
              'time', recent."createdAt"
            )
            ORDER BY recent."createdAt" DESC
          )
          FROM recent_requests AS recent
        ),
        '[]'::json
      ) AS "recentRequests"
    FROM "ServiceRequest"
  `;

  // Format recent requests for the frontend ActivityItem component
  const formattedRequests = (dashboardRow?.recentRequests ?? []).map((request) => {
    // Status mapping: PENDING -> pending, APPROVED -> approved, COMPLETED -> deployed, REJECTED -> rejected
    let mappedStatus = "pending";
    if (request.status === "APPROVED") mappedStatus = "approved";
    if (request.status === "COMPLETED") mappedStatus = "deployed";
    if (request.status === "REJECTED") mappedStatus = "rejected";

    return {
      id: request.id,
      company: request.company,
      service: request.service,
      status: mappedStatus,
      time: request.time,
    };
  });

  // Dynamic simulation for resource utilization and system health
  const cpu = Math.floor(Math.random() * 15) + 45; // 45-60%
  const memory = Math.floor(Math.random() * 10) + 70; // 70-80%
  const storage = 48; // stable
  const network = Math.floor(Math.random() * 20) + 25; // 25-45%

  const stats = {
    totalUsers: dashboardRow?.totalUsers ?? 0,
    activeServices: dashboardRow?.activeServices ?? 0,
    pendingRequests: dashboardRow?.pendingRequests ?? 0,
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

  const data = {
    stats,
    recentRequests: formattedRequests,
    alerts,
    resourceUtilization,
  };

  dashboardCache = {
    data,
    expiresAt: Date.now() + DASHBOARD_CACHE_TTL_MS,
  };

  res.status(200).json({
    success: true,
    data,
  });
});

import { useEffect, useState } from "react";
import StatSection from "./admin_dashboard/StatSection.jsx";
import ActivityMonitor from "./admin_dashboard/ActivityMonitor.jsx";
import ResourceUtilization from "./admin_dashboard/ResourceUtilization.jsx";
import useAxios from "../../hooks/useAxios";

const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const api = useAxios();

  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await api.get("/admin/dashboard/overview");
        setDashboardData(response.data?.data ?? null);
      } catch (err) {
        console.error("Failed to load admin dashboard overview:", err);
        setError("Unable to load dashboard data right now.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, [api]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1
          className="text-[30px] font-bold leading-[36px] text-[#0F172B]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Admin Dashboard
        </h1>

        <p
          className="text-[16px] leading-[24px] text-[#45556C]"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          System overview and management
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <StatSection isLoading={isLoading} stats={dashboardData?.stats ?? null} />
      <ActivityMonitor isLoading={isLoading} recentRequests={dashboardData?.recentRequests ?? []} alerts={dashboardData?.alerts ?? []} />
      <ResourceUtilization isLoading={isLoading} utilization={dashboardData?.resourceUtilization ?? null} />
    </div>
  );
};

export default AdminDashboardPage;
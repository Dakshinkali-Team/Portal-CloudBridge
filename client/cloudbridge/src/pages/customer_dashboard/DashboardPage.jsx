import React, { useEffect, useState } from "react";
import StatusCardSection from "./StatusCardSection";
import ActionSection from "./ActionSection";
import SupportBanner from "../../components/sections/SupportBanner";
import useAxios from "../../hooks/useAxios";

const DashboardPage = () => {
  const api = useAxios();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadDashboardData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/customer/dashboard-summary");
        if (mounted) {
          setData(response.data?.data ?? null);
        }
      } catch (err) {
        if (mounted) {
          setError("Unable to load dashboard stats.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      mounted = false;
    };
  }, [api]);

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] p-8 flex flex-col gap-8">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-2 mb-1">
        <h1 className="text-[30px] leading-[36px] font-bold text-[#0F172B] font-inter">
          Dashboard
        </h1>

        <p className="text-[16px] leading-[24px] font-normal text-[#45556C] font-inter">
          Welcome back! Here's an overview of your services.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {/* ================= STATUS CARDS ================= */}
      <StatusCardSection counts={data?.counts} loading={loading} />

      {/* ================= ACTION SECTION ================= */}
      <ActionSection recentActivity={data?.recentActivity} loading={loading} />

      {/* ================= SUPPORT BANNER ================= */}
      <SupportBanner />

    </div>
  );
};

export default DashboardPage;
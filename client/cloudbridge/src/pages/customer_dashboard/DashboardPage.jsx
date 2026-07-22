import React from "react";
import StatusCardSection from "./StatusCardSection";
import ActionSection from "./ActionSection";
import SupportBanner from "../../components/sections/SupportBanner";

const DashboardPage = () => {
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

      {/* ================= STATUS CARDS ================= */}
      <StatusCardSection />

      {/* ================= ACTION SECTION ================= */}
      <ActionSection />

      {/* ================= SUPPORT BANNER ================= */}
      <SupportBanner />

    </div>
  );
};

export default DashboardPage;
import React from "react";
import StatSection from "./admin_dashboard/StatSection.jsx";
import ActivityMonitor from "./admin_dashboard/ActivityMonitor.jsx"; 
import ResourceUtilization from "./admin_dashboard/ResourceUtilization.jsx";
// import AdminSidebar from "./AdminSidebar.jsx";

const AdminDashboardPage = () => {
  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
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

      {/* Sections */}
      <StatSection />
      <ActivityMonitor />
      <ResourceUtilization />

    </div>
  );
};

export default AdminDashboardPage;
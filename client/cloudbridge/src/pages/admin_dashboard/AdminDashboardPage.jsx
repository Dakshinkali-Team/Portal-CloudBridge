import React from "react";
import StatSection from "./StatSection";
import ActivityMonitor from "./ActivityMonitor"; 
import ResourceUtilization from "./ResourceUtilization";

const AdminDashboardPage = () => {
  return (
    <div className="flex flex-col gap-6 w-full px-6 py-6 bg-[#F8FAFC] min-h-screen">

      {/* Header */}
      <div>
        <h1
          className="text-2xl font-bold text-[#0F172B]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Admin Dashboard
        </h1>

        <p
          className="text-sm text-[#45556C] mt-1"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          System overview and management
        </p>
      </div>
      {/* Stats Section */}
      <StatSection />

      {/* Activity Monitor */}
      <ActivityMonitor />
      
      {/* Resource Utilization */}
      <ResourceUtilization />
    </div>
  );
};

export default AdminDashboardPage;
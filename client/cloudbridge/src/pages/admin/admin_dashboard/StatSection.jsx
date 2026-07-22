import React from "react";
import StatCard from "./StatCard.jsx";
import UsersIcon from "../../../../src/assets/admindashboardicon/Users.svg";
import DatabaseIcon from "../../../../src/assets/admindashboardicon/Database.svg";
import FileTextIcon from "../../../../src/assets/admindashboardicon/FileText.svg";
import ActivityIcon from "../../../../src/assets/admindashboardicon/Activity.svg";

const StatSection = ({ stats, isLoading }) => {
  const statsData = [
    {
      label: "Total Users",
      value: stats?.totalUsers ?? 0,
      trend: "+0%",
      icon: UsersIcon,
      iconBgColor: "bg-[#EFF6FF]",
      trendColor: "#00A63E",
    },
    {
      label: "Active Services",
      value: stats?.activeServices ?? 0,
      trend: "+0%",
      icon: DatabaseIcon,
      iconBgColor: "bg-[#F0FDF4]",
      trendColor: "#00A63E",
    },
    {
      label: "Pending Requests",
      value: stats?.pendingRequests ?? 0,
      trend: "0%",
      icon: FileTextIcon,
      iconBgColor: "bg-[#FFF7ED]",
      trendColor: "#EF4444",
    },
    {
      label: "System Health",
      value: stats?.systemHealth?.value ?? "--",
      trend: stats?.systemHealth?.label ?? "--",
      trendType: stats?.systemHealth?.trendType ?? "up",
      icon: ActivityIcon,
      iconBgColor: "bg-[#F0FDF4]",
      trendColor: "#45556C",
    },
  ];

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-[150px] animate-pulse rounded-2xl bg-slate-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatSection;
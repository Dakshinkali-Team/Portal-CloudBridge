import React from "react";
import StatCard from "./StatCard.jsx";
import UsersIcon from "../../../../src/assets/admindashboardicon/Users.svg";
import DatabaseIcon from "../../../../src/assets/admindashboardicon/Database.svg";
import FileTextIcon from "../../../../src/assets/admindashboardicon/FileText.svg";
import ActivityIcon from "../../../../src/assets/admindashboardicon/Activity.svg";

const StatSection = () => {
  const statsData = [
    {
      label: "Total Users",
      value: "1,247",
      trend: "+12%",
      icon: UsersIcon,
      iconBgColor: "bg-[#EFF6FF]",
      trendColor: "#00A63E",
    },
    {
      label: "Active Services",
      value: "432",
      trend: "+8%",
      icon: DatabaseIcon,
      iconBgColor: "bg-[#F0FDF4]",
      trendColor: "#00A63E",
    },
    {
      label: "Pending Requests",
      value: "28",
      trend: "-15%",
      icon: FileTextIcon,
      iconBgColor: "bg-[#FFF7ED]",
      trendColor: "#EF4444", // red for negative
    },
    {
      label: "System Health",
      value: "99.9%",
      trend: "Stable",
      icon: ActivityIcon,
      iconBgColor: "bg-[#F0FDF4]",
      trendColor: "#45556C",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatSection;
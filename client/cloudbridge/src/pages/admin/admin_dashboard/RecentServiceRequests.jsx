import React from "react";
import ActivityItem from "./ActivityItem";

const RecentServiceRequests = () => {
  const data = [
    {
      company: "Acme Corp",
      service: "Database Cluster",
      time: "2 hours ago",
      status: "pending",
    },
    {
      company: "TechStart Inc",
      service: "Web Server",
      time: "4 hours ago",
      status: "approved",
    },
    {
      company: "Cloud Solutions",
      service: "Storage 1TB",
      time: "6 hours ago",
      status: "pending",
    },
    {
      company: "Data Systems",
      service: "Load Balancer",
      time: "1 day ago",
      status: "deployed",
    },
  ];

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 flex flex-col gap-5 sm:gap-6">

      <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#0F172B] font-[DM Sans]">
        Recent Service Requests
      </h2>

      <div className="flex flex-col gap-4">
        {data.map((item, index) => (
          <ActivityItem key={index} type="request" {...item} />
        ))}
      </div>

    </div>
  );
};

export default RecentServiceRequests;
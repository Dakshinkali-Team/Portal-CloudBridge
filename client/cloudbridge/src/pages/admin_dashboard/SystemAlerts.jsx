import React from "react";
import ActivityItem from "./ActivityItem";

const SystemAlerts = () => {
  const alerts = [
    {
      message: "High CPU usage on server-prod-04",
      time: "15 min ago",
      alertType: "warning",
    },
    {
      message: "Scheduled maintenance on 2026-04-20",
      time: "1 hour ago",
      alertType: "info",
    },
    {
      message: "Backup completed successfully",
      time: "2 hours ago",
      alertType: "success",
    },
  ];

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 flex flex-col gap-5 sm:gap-6">

      <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#0F172B] font-[DM Sans]">
        System Alerts
      </h2>

      <div className="flex flex-col gap-4">
        {alerts.map((item, index) => (
          <ActivityItem key={index} type="alert" {...item} />
        ))}
      </div>

    </div>
  );
};

export default SystemAlerts;
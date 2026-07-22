import React from "react";
import ActivityItem from "./ActivityItem";

const SystemAlerts = ({ isLoading, alerts = [] }) => {
  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 flex flex-col gap-5 sm:gap-6">
      <h3 className="text-[20px] font-weight-600 leading-[28px] font-semibold text-[#0F172B] font-[DM Sans]">
        System Alerts
      </h3>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-[64px] animate-pulse rounded-lg bg-slate-100" />
          ))
        ) : alerts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-500">
            No alerts right now.
          </div>
        ) : (
          alerts.map((item, index) => (
            <ActivityItem
              key={`${item.title}-${index}`}
              type="alert"
              message={item.title}
              time={item.time}
              alertType={item.alertType}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SystemAlerts;
import React from "react";
import ActivityItem from "./ActivityItem";

const RecentServiceRequests = ({ isLoading, requests = [] }) => {
  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 flex flex-col gap-5 sm:gap-6">
      <h3 className="text-[20px] font-weight-600 leading-[28px] font-semibold text-[#0F172B] font-[DM Sans]">
        Recent Service Requests
      </h3>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-[80px] animate-pulse rounded-lg bg-slate-100" />
          ))
        ) : requests.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-500">
            No recent service requests found.
          </div>
        ) : (
          requests.map((item, index) => (
            <ActivityItem key={item.id ?? index} type="request" {...item} />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentServiceRequests;
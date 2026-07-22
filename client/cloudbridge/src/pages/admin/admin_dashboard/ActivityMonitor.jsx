import React from "react";
import RecentServiceRequests from "./RecentServiceRequests";
import SystemAlerts from "./SystemAlerts";

const ActivityMonitor = ({ isLoading, recentRequests = [], alerts = [] }) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RecentServiceRequests isLoading={isLoading} requests={recentRequests} />
      <SystemAlerts isLoading={isLoading} alerts={alerts} />
    </div>
  );
};

export default ActivityMonitor;
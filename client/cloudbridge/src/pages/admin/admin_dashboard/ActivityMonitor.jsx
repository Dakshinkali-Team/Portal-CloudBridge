import React from "react";
import RecentServiceRequests from "./RecentServiceRequests";
import SystemAlerts from "./SystemAlerts";
import ActivityItem from "./ActivityItem";

const ActivityMonitor = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">

      <RecentServiceRequests />
      <SystemAlerts />

      {/* <ActivityItem type="activity" /> */}

    </div>
  );
};

export default ActivityMonitor;
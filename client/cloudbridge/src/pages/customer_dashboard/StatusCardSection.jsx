import React, { useMemo } from "react";
import StatusCard from "./StatusCard";

import Icon1 from "../../assets/dashboardcardicon/active.png";
import Icon2 from "../../assets/dashboardcardicon/pending.png";
import Icon3 from "../../assets/dashboardcardicon/completed.png";
import ActionIcon from "../../assets/dashboardcardicon/arrow.png";

const StatusCardSection = ({ counts, loading }) => {
  const displayValues = useMemo(() => {
    if (loading || !counts) {
      return {
        activeServices: "...",
        pendingRequests: "...",
        completed: "...",
      };
    }

    return {
      activeServices: String(counts.activeServices ?? 0),
      pendingRequests: String(counts.pendingRequests ?? 0),
      completed: String(counts.completed ?? 0),
    };
  }, [counts, loading]);

  return (
    <div className="flex gap-6 w-full">
      <StatusCard
        icon={Icon1}
        value={displayValues.activeServices}
        label="Active Services"
        bgColor="#F4F8FF"
        actionIcon={ActionIcon}
      />
      <StatusCard
        icon={Icon2}
        value={displayValues.pendingRequests}
        label="Pending Requests"
        bgColor="#FFFCE8"
        actionIcon={ActionIcon}
      />
      <StatusCard
        icon={Icon3}
        value={displayValues.completed}
        label="Completed"
        bgColor="#F0FDF4"
        actionIcon={ActionIcon}
      />
    </div>
  );
};

export default StatusCardSection;
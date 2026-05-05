import React from "react";
import StatusCard from "./StatusCard";

import Icon1 from "../../assets/dashboardcardicon/active.png";
import Icon2 from "../../assets/dashboardcardicon/pending.png";
import Icon3 from "../../assets/dashboardcardicon/completed.png";
import ActionIcon from "../../assets/dashboardcardicon/arrow.png";

const StatusCardSection = () => {
  return (
    <div className="flex gap-6 w-full">
      <StatusCard icon={Icon1} value="3" label="Active Services" bgColor="#F4F8FF" actionIcon={ActionIcon} />
      <StatusCard icon={Icon2} value="2" label="Pending Requests" bgColor="#FFFCE8" actionIcon={ActionIcon} />
      <StatusCard icon={Icon3} value="12" label="Completed" bgColor="#F0FDF4" actionIcon={ActionIcon} />
    </div>
  );
};

export default StatusCardSection;
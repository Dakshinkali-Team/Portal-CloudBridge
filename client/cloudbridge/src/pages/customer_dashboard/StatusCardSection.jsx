import React from "react";
import StatusCard from "./StatusCard";

import Icon1 from "../../assets/dashboardcardicon/icon1.png";
import Icon2 from "../../assets/dashboardcardicon/icon2.png";
import Icon3 from "../../assets/dashboardcardicon/icon3.png";
import ActionIcon from "../../assets/dashboardcardicon/icon.png";

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
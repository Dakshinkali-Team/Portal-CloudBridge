import React from "react";
import StatusCard from "./StatusCard";

import Icon1 from "../../assets/dashboardcardicon/icon1.png";
import Icon2 from "../../assets/dashboardcardicon/icon2.png";
import Icon3 from "../../assets/dashboardcardicon/icon3.png";
import ActionIcon from "../../assets/dashboardcardicon/icon.png";

const StatusCardSection = () => {
  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="text-[30px] font-bold text-[#0F172B]">
          Dashboard
        </h1>
        <p className="text-[#45556C]">
          Welcome back! Here's an overview of your services.
        </p>
      </div>

      {/* Cards */}
      <div className="flex gap-8 flex-wrap">
        <StatusCard icon={Icon1} value="3" label="Active Services" bgColor="#F4F8FF" actionIcon={ActionIcon}/>
        <StatusCard icon={Icon2} value="2" label="Pending Requests" bgColor="#FFFCE8" actionIcon={ActionIcon}/>
        <StatusCard icon={Icon3} value="12" label="Completed" bgColor="#F0FDF4" actionIcon={ActionIcon}/>
      </div>

    </div>
  );
};

export default StatusCardSection;
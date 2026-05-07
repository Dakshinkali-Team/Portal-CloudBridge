import React from "react";
import ResourceBar from "./ResourceBar";

const ResourceUtilization = () => {
  const resources = [
    { label: "CPU Usage",         percentage: 67, color: "bg-[#3B82F6]" },
    { label: "Memory Usage",      percentage: 82, color: "bg-[#F59E0B]" },
    { label: "Storage Usage",     percentage: 45, color: "bg-[#10B981]" },
    { label: "Network Bandwidth", percentage: 54, color: "bg-[#64748B]" },
  ];

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-xl p-6 md:p-8 shadow-sm">

      <h3 className="text-xl font-bold text-[#0F172B] mb-6 font-['DM_Sans']">
        Resource Utilization
      </h3>

      <div className="flex flex-col gap-5">
        {resources.map((item, index) => (
          <ResourceBar
            key={index}
            label={item.label}
            percentage={item.percentage}
            colorClass={item.color}
          />
        ))}
      </div>
    </div>
  );
};

export default ResourceUtilization;
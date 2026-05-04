import React from "react";
import ActionCard from "./ActionCard";

import Icon1 from "../../assets/quickactionicon/newservicerequest.png";
import Icon2 from "../../assets/quickactionicon/pricecalculator.png";

const ActionSection = () => {
  return (
    <div className="flex gap-6 w-full">

      {/* QUICK ACTIONS */}
      <ActionCard title="Quick Actions">
        <div className="w-full flex flex-col gap-[12px]">

          <div className="w-full flex items-center gap-[12px] p-[16px] rounded-[8px] border border-[#DBEAFE] bg-[#EFF6FF] hover:shadow-sm transition cursor-pointer">
            <img src={Icon1} alt="" className="w-[20px] h-[20px] flex-shrink-0" />
            <div className="flex flex-col">
              <p className="text-[16px] font-medium text-[#0F172B] leading-[24px]">New Service Request</p>
              <p className="text-[14px] text-[#45556C] leading-[20px]">Configure and request cloud services</p>
            </div>
          </div>

          <div className="w-full flex items-center gap-[12px] p-[16px] rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] hover:shadow-sm transition cursor-pointer">
            <img src={Icon2} alt="" className="w-[20px] h-[20px] flex-shrink-0" />
            <div className="flex flex-col">
              <p className="text-[16px] font-medium text-[#0F172B] leading-[24px]">Price Calculator</p>
              <p className="text-[14px] text-[#45556C] leading-[20px]">Estimate costs before requesting</p>
            </div>
          </div>

        </div>
      </ActionCard>

      {/* RECENT ACTIVITY */}
      <ActionCard title="Recent Activity">
        <div className="w-full flex flex-col gap-[16px]">

          {[
            { color: "#00C950", title: "Service deployed", sub: "Database Cluster", time: "2 hours ago" },
            { color: "#FE9A00", title: "Quote generated", sub: "Web Server", time: "5 hours ago" },
            { color: "#00C950", title: "Request approved", sub: "Storage Bucket", time: "1 day ago" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-[12px]">
              <div className="w-[8px] h-[8px] rounded-full mt-[8px] flex-shrink-0" style={{ backgroundColor: item.color }} />
              <div className="flex flex-col gap-[2px]">
                <p className="text-[16px] font-medium text-[#0F172B] leading-[24px]">{item.title}</p>
                <p className="text-[14px] text-[#45556C] leading-[20px]">{item.sub}</p>
                <p className="text-[12px] text-[#90A1B9] leading-[16px]">{item.time}</p>
              </div>
            </div>
          ))}

        </div>
      </ActionCard>

    </div>
  );
};

export default ActionSection;
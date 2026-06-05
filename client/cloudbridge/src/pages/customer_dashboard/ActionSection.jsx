import React from "react";
import { useNavigate } from "react-router-dom";
import ActionCard from "./ActionCard";

import Icon1 from "../../assets/quickactionicon/newservicerequest.png";
import Icon2 from "../../assets/quickactionicon/pricecalculator.png";

const ActionSection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-6 w-full">

      {/* QUICK ACTIONS */}
      <ActionCard title="Quick Actions">
        <div className="w-full flex flex-col gap-[12px]">

          <div
            onClick={() => navigate("/service-request")}
            className="w-full flex items-center gap-[12px] p-[16px] rounded-[8px] border border-[#DBEAFE] bg-[#EFF6FF] hover:shadow-sm transition cursor-pointer"
          >
            <img src={Icon1} alt="" className="w-[20px] h-[20px] flex-shrink-0" />
            <div className="flex flex-col">
              <p className="w-[164px] h-[24px] text-[#0F172B] opacity-100 rotate-0 font-inter font-medium text-[16px] leading-[24px] tracking-[0px]">New Service Request</p>
              <p className="w-[248px] h-[20px] text-[#45556C] opacity-100 rotate-0 font-inter font-normal text-[13.9px] leading-[20px] tracking-[0px]">Configure and request cloud services</p>
            </div>
          </div>

          <div
            onClick={() => navigate("/price-calculator")}
            className="w-full flex items-center gap-[12px] p-[16px] rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] hover:shadow-sm transition cursor-pointer"
          >
            <img src={Icon2} alt="" className="w-[20px] h-[20px] flex-shrink-0" />
            <div className="flex flex-col">
              <p className="w-[164px] h-[24px] text-[#0F172B] opacity-100 rotate-0 font-inter font-medium text-[16px] leading-[24px] tracking-[0px]">Price Calculator</p>
              <p className="w-[248px] h-[20px] text-[#45556C] opacity-100 rotate-0 font-inter font-normal text-[14px] leading-[20px] tracking-[0px]">Estimate costs before requesting</p>
            </div>
          </div>

        </div>
      </ActionCard>

      {/* RECENT ACTIVITY */}
<ActionCard title="Recent Activity">
  <div className="flex flex-col gap-4">

    {[
      { color: "#00C950", title: "Service deployed", sub: "Database Cluster", time: "2 hours ago" },
      { color: "#FE9A00", title: "Quote generated", sub: "Web Server", time: "5 hours ago" },
      { color: "#00C950", title: "Request approved", sub: "Storage Bucket", time: "1 day ago" },
    ].map((item, i) => (
      
      <div key={i} className="flex items-start gap-3">

        {/* dot */}
        <div
          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
          style={{ backgroundColor: item.color }}
        />

        {/* text */}
        <div className="flex flex-col">
          <p className="font-inter text-[15px] font-medium text-[#0F172B] leading-6">
            {item.title}
          </p>

          <p className="font-inter text-[14px] text-[#45556C] leading-5">
            {item.sub}
          </p>

          <p className="font-inter text-[12px] text-[#90A1B9] leading-4">
            {item.time}
          </p>
        </div>

      </div>
    ))}

  </div>
</ActionCard>

    </div>
  );
};

export default ActionSection;
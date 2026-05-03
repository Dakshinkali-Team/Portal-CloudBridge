import React from "react";
import ActionCard from "./ActionCard";

import Icon1 from "../../assets/quickactionicon/newservicerequest.png";
import Icon2 from "../../assets/quickactionicon/pricecalculator.png";

const ActionSection = () => {
  return (
    <div className="flex gap-8 flex-wrap">

      {/* ================= QUICK ACTIONS ================= */}
      <ActionCard title="Quick Actions">
        <div className="w-[546.5px] flex flex-col gap-[12px]">

          {/* Action 1 */}
          <div className="w-full flex items-center gap-[12px] p-[16px] rounded-[8px] border border-[#DBEAFE] bg-[#EFF6FF] hover:shadow-sm transition cursor-pointer">

            <img
              src={Icon1}
              alt=""
              className="w-[20px] h-[20px] flex-shrink-0"
            />

            <div className="flex flex-col">
              <p className="text-[16px] font-medium text-[#0F172B] leading-[24px]">
                New Service Request
              </p>
              <p className="text-[14px] text-[#45556C] leading-[20px]">
                Configure and request cloud services
              </p>
            </div>

          </div>

          {/* Action 2 */}
          <div className="w-full flex items-center gap-[12px] p-[16px] rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] hover:shadow-sm transition cursor-pointer">

            <img
              src={Icon2}
              alt=""
              className="w-[20px] h-[20px] flex-shrink-0"
            />

            <div className="flex flex-col">
              <p className="text-[16px] font-medium text-[#0F172B] leading-[24px]">
                Price Calculator
              </p>
              <p className="text-[14px] text-[#45556C] leading-[20px]">
                Estimate costs before requesting
              </p>
            </div>

          </div>

        </div>
      </ActionCard>

      {/* ================= RECENT ACTIVITY ================= */}
      <ActionCard title="Recent Activity">
        <div className="w-[546.5px] flex flex-col gap-[16px]">

          {/* Item 1 */}
          <div className="flex items-start gap-[12px]">

            {/* DOT (LEFT SIDE) */}
            <div className="w-[8px] h-[8px] rounded-full bg-[#00C950] mt-[8px] flex-shrink-0" />

            {/* TEXT */}
            <div className="flex flex-col gap-[2px]">
              <p className="text-[16px] font-medium text-[#0F172B] leading-[24px]">
                Service deployed
              </p>
              <p className="text-[14px] text-[#45556C] leading-[20px]">
                Database Cluster
              </p>
              <p className="text-[12px] text-[#90A1B9] leading-[16px]">
                2 hours ago
              </p>
            </div>

          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-[12px]">

            <div className="w-[8px] h-[8px] rounded-full bg-[#FE9A00] mt-[8px] flex-shrink-0" />

            <div className="flex flex-col gap-[2px]">
              <p className="text-[16px] font-medium text-[#0F172B] leading-[24px]">
                Quote generated
              </p>
              <p className="text-[14px] text-[#45556C] leading-[20px]">
                Web Server
              </p>
              <p className="text-[12px] text-[#90A1B9] leading-[16px]">
                5 hours ago
              </p>
            </div>

          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-[12px]">

            <div className="w-[8px] h-[8px] rounded-full bg-[#00C950] mt-[8px] flex-shrink-0" />

            <div className="flex flex-col gap-[2px]">
              <p className="text-[16px] font-medium text-[#0F172B] leading-[24px]">
                Request approved
              </p>
              <p className="text-[14px] text-[#45556C] leading-[20px]">
                Storage Bucket
              </p>
              <p className="text-[12px] text-[#90A1B9] leading-[16px]">
                1 day ago
              </p>
            </div>

          </div>

        </div>
      </ActionCard>

    </div>
  );
};

export default ActionSection;
import React from "react";
import StatusCardSection from "./StatusCardSection";
import ActionSection from "./ActionSection";
import SupportBanner from "../../components/sections/SupportBanner";
const DashboardPage = () => {
  return (
   <div className="w-[1281px] h-[990px] p-[32px] pb-[70px] flex flex-col gap-[32px] bg-[#F8FAFC]">

  {/* Header */}
  <div className="flex flex-col gap-[8px]">
    <h1 className="font-family-inter font-bold text-[30px] leading-[36px] text-[#0F172B]">
      Dashboard
    </h1>

    <p className="font-family-inter font-normal text-[16px] leading-[24px] text-[#45556C]">
      Welcome back! Here's an overview of your services.
    </p>
  </div>

  {/* Top Cards */}
  <StatusCardSection />

  {/* Middle Section */}
  <ActionSection />

  {/* Bottom Section */}
  <SupportBanner />

</div>
  );
};
export default DashboardPage;

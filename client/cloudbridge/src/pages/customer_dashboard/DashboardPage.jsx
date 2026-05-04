import React from "react";
import StatusCardSection from "./StatusCardSection";
import ActionSection from "./ActionSection";
import SupportBanner from "../../components/sections/SupportBanner";
const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6 w-full px-6 py-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back! Here's an overview of your services.{" "}
        </p>
      </div>
      {/* Top Section — full width */}
      <StatusCardSection />
      {/* Bottom Section — full width */}
      <ActionSection />{" "}

      {/* <!-- Bottom Section — full width --> */}
      <SupportBanner />
    </div>
  );
};
export default DashboardPage;

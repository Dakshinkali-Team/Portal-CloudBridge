import React from "react";
import StatusCardSection from "./StatusCardSection";
import ActionSection from "./ActionSection";

const DashboardPage = () => {
  return (
    <div className="p-8 flex flex-col gap-8 w-full">

      {/* Top Section */}
      <StatusCardSection />

      {/* Bottom Section */}
      <ActionSection />

    </div>
  );
};

export default DashboardPage;
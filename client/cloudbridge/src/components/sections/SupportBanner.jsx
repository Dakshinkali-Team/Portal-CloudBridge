import React from "react";
import Button from "../common/Button";
const SupportBanner = () => {
  return (
    <div className="bg-[#1D73B2] rounded-2xl px-8 py-6 flex flex-col gap-4">
      
      {/* TEXT */}
      <div>
        <h2 className="text-white text-lg font-semibold">
          Need Help?
        </h2>

        <p className="text-white/90 text-sm mt-1 max-w-xl">
          Our support team is here to assist you with any questions about your cloud services.
        </p>
      </div>

      {/* BUTTON (imported) */}
       <div>
        <button className="bg-white text-[#1D73B2] px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
          Contact Support
        </button>
      </div>

    </div>
  );
};

export default SupportBanner;
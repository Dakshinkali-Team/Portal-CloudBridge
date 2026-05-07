import React from "react";

const StatCard = ({ icon, trend, value, label, iconBgColor, trendColor }) => {
  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-5 flex flex-col justify-between min-h-[170px] transition-all duration-200 hover:shadow-md">

      {/* Top Row */}
      <div className="flex items-center justify-between">
        
        {/* Icon */}
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-md ${iconBgColor}`}
        >
          <img src={icon} alt={label} className="w-6 h-6" />
        </div>

        {/* Trend */}
        <span
          className="text-sm font-medium"
          style={{
            fontFamily: "'Work Sans', sans-serif",
            color: trendColor || "#00A63E",
          }}
        >
          {trend}
        </span>
      </div>

      {/* Value */}
      <h2
        className="text-[30px] font-bold leading-[36px] text-[#0F172B]"
        style={{ fontFamily: "'Work Sans', sans-serif" }}
      >
        {value}
      </h2>

      {/* Label */}
      <p
        className="w-[76px] h-[20px] text-[14px] font-normal leading-[20px] tracking-[0px] text-[#45556C]"
        style={{ fontFamily: "'Work Sans', sans-serif" }}
      >
        {label}
      </p>
    </div>
  );
};

export default StatCard;
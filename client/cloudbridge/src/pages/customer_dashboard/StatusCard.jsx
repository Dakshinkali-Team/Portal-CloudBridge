import React from "react";

const StatusCard = ({ icon, value, label, bgColor, actionIcon }) => {
  return (
    <div className="flex-1 min-w-0 h-[174px] bg-white border border-[#E2E8F0] rounded-[12px] p-[25px] flex flex-col justify-between transition-all duration-200 hover:shadow-md">

      {/* TOP CONTAINER */}
      <div className="flex justify-between items-start">

        {/* Left Icon Wrapper */}
        <div
          className="w-[48px] h-[48px] rounded-[8px] flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: bgColor }}
        >
          <img src={icon} alt="card icon" className="w-[24px] h-[24px] object-contain" />
        </div>

        {/* Right Action Icon */}
        <img src={actionIcon} alt="action icon" className="w-[20px] h-[20px] object-contain" />
      </div>

      {/* MIDDLE */}
      <h2 className="font-family-inter text-[30px] fontweight-700 font-bold text-[#0F172B] leading-[36px]">{value}</h2>

      {/* BOTTOM */}
      <p className="font-family-inter text-[14px] fontweight-400 font-regular text-[#45556C] leading-[20px]">{label}</p>

    </div>
  );
};

export default StatusCard;
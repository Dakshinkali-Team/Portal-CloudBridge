import React from "react";

const StatusCard = ({
  icon,
  value,
  label,
  bgColor,
  actionIcon,
}) => {
  return (
    <div className="w-[389.65px] h-[174px] bg-white border border-[#E2E8F0] rounded-[12px] p-[25px] flex flex-col justify-between transition-all duration-200 hover:shadow-md">
      
      {/* TOP CONTAINER */}
      <div className="flex justify-between items-start">
        
        {/* Left Icon Wrapper */}
        <div
          className="w-[48px] h-[48px] rounded-[8px] flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <img
            src={icon}
            alt="card icon"
            className="w-[24px] h-[24px] object-contain"
          />
        </div>

        {/* Right Action Icon (Custom Image) */}
        <img
          src={actionIcon}
          alt="action icon"
          className="w-[20px] h-[20px] object-contain"
        />
      </div>

      {/*  MIDDLE CONTAINER */}
      <h2 className="text-[24px] font-semibold text-[#0F172B] leading-[32px]">
        {value}
      </h2>

      {/*  BOTTOM CONTAINER */}
      <p className="text-[14px] text-[#45556C] leading-[20px]">
        {label}
      </p>
    </div>
  );
};

export default StatusCard;
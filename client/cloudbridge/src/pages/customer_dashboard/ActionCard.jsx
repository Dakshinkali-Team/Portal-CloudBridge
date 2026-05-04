import React from "react";

const ActionCard = ({ title, children, className = "" }) => {
  return (
    <div className={`flex-1 min-w-0 bg-white border border-[#E2E8F0] rounded-[12px] pt-[25px] pr-[25px] pb-[25px] pl-[25px] flex flex-col gap-[16px] ${className}`}>

      {/* Heading */}
      <h3 className="text-[20px] font-semibold leading-[28px] text-[#0F172B]">
        {title}
      </h3>

      {/* Content */}
      {children}

    </div>
  );
};

export default ActionCard;
import React from "react";

const ActionCard = ({ title, children }) => {
  return (
    <div className="w-[596.5px] h-[318px] bg-white border border-[#E2E8F0] rounded-[12px] pt-[25px] pr-[25px] pb-[1px] pl-[25px] flex flex-col gap-[16px]">
      
      {/* Heading */}
      <div className="w-[546.5px] h-[28px]">
        <h3 className="text-[20px] font-semibold leading-[28px] text-[#0F172B]">
          {title}
        </h3>
      </div>

      {/* Content */}
      {children}
    </div>
  );
};

export default ActionCard;
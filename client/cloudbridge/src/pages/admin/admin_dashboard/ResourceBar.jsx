import React from "react";

const ResourceBar = ({ label, percentage, colorClass }) => {
  return (
    <div className="flex flex-col gap-2 w-full group">
      {/* Label and Percentage Row */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-[#45556C] font-['Work_Sans']">
          {label}
        </span>
        <span className="text-sm font-medium text-[#0F172B] font-['Work_Sans'] tabular-nums">
          {percentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div
        className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={`h-full rounded-full ${colorClass} transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ResourceBar;
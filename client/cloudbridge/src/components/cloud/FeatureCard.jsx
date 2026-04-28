// FeatureCard.jsx
import React from "react";

const FeatureCard = ({ step, title, description, icon }) => {
  return (
    <div className="flex flex-col items-start p-12 bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-sans">
      
      {/* Icon Box */}
      <div className="flex items-center justify-center w-16 h-16 bg-[#0070BA] rounded-lg mb-6">
        <img src={icon} alt={title} className="w-12 h-12 object-contain" />
      </div>

      {/* Step Number */}
      <div className="text-[#0070BA] font-bold uppercase text-base tracking-wide mb-2">
        {step}
      </div>

      {/* Title */}
      <h3 className="text-[20px] leading-[28px] font-bold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[16px] leading-[24px] text-gray-500">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;

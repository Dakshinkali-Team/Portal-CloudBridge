import React from "react";

const ServiceItem = ({ name, price, checked, onChange }) => {
  return (
    <div className="group flex justify-between items-center p-4 pl-3 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">

        {/* ✅ Checkbox (invisible by default) */}
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={`
            w-4 h-4 accent-blue-600 cursor-pointer transition
            opacity-0 
            group-hover:opacity-100 
            ${checked ? "opacity-100" : ""}
          `}
        />

        {/* TEXT */}
        <span className="text-sm font-semibold text-gray-700">
          {name}
        </span>
      </div>

      {/* RIGHT SIDE */}
      <span className="text-sm font-semibold text-gray-900">
        ${price}/mo
      </span>
    </div>
  );
};

export default ServiceItem;
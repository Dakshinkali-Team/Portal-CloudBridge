import React from "react";

const Card = ({ title, children }) => {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-5 border border-gray-100">
      <h3 className="text-DM Sans text-2xl font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};

export default Card;

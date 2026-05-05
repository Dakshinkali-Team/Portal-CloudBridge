import React from "react";

const SummaryCard = ({ total = 330, count = 6 }) => {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-5 border border-gray-100 min-h-60 space-y-6 mt-12 ">
      <h3 className="text-lg font-semibold mb-4">Request Summary</h3>

      {/* Selected Services */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>Selected Services</span>
        <span className="font-medium text-gray-900">{count}</span>
      </div>
 {/* Horizontal Line */}
  <div className="border-t border-gray-400"></div>
      {/* Monthly Total */}
      <div className="flex justify-between items-center">
        <span className="font-bold text-sm text-gray-600">Monthly Total</span>
        <span className="text-xl font-bold text-blue-600">
          ${total}
        </span>
      </div>
       {/* Button */}
      <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition">
        Submit Request
      </button>
    </div>
  );
};

export default SummaryCard;

import React from "react";

const SummaryCard = ({
  total = 330,
  count = 6,
  onSubmit,
  submitting = false,
  disabled = false,
}) => {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-5 border border-gray-100 min-h-60 space-y-6 mt-11 ">
      <h3 className="text-DM Sans text-lg font-semibold mb-4">Request Summary</h3>

      {/* Selected Services */}
      <div className="flex justify-between text-sm text-gray-600 text-Work Sans text-regular">
        <span>Selected Services</span>
        <span className="text-Work Sans text-sm font-semibold text-gray-900">{count}</span>
      </div>
 {/* Horizontal Line */}
  <div className="border-t border-gray-400"></div>
      {/* Monthly Total */}
      <div className="flex justify-between items-center">
        <span className="text-Work Sans font-medium text-base text-[#0F172B]">Monthly Total</span>
        <span className="text-JetsBrain Mono text-2xl font-bold text-blue-600">
          ${total}
        </span>
      </div>
       {/* Button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={disabled}
        className={`w-full text-Work Sans text-white py-2.5 rounded-xl text-medium text-base transition ${
          disabled
            ? "cursor-not-allowed bg-blue-300"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {submitting ? "Submitting..." : "Submit Request"}
      </button>
    </div>
  );
};

export default SummaryCard;

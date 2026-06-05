import { useNavigate } from "react-router-dom";
import PricingPreview from "./pricing/PricingPreview";

const features = [
  "No hidden provisioning fees",
  "Pay-as-you-go flexibility",
  "Volume discounts for enterprise",
  "Predictable monthly billing",
];

const CTASection = () => {
  const navigate = useNavigate();

  const handleFullCostClick = () => {
    navigate("/price-calculator");
  };

  return (
    <section className="py-20 bg-[#FAFAFA]">
      <div className="mx-auto max-w-360 px-6 lg:px-15 flex flex-col lg:flex-row items-center gap-12">
        {/* LEFT CONTENT */}
        <div className="max-w-xl">
          {/* HEADING */}
          <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-6">
            Transparent Pricing,{" "}
            <span className="text-[#0B78C1]">No Surprises.</span>
          </h2>

          {/* CHECKLIST */}
          <ul className="flex flex-col gap-5 mb-8 pl-4 lg:pl-6">
            {features.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                {/* ICON */}
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#D5EDFD] text-blue-600 text-sm">
                  ✓
                </span>

                {/* TEXT */}
                <span className="text-base text-[#535862]">{item}</span>
              </li>
            ))}
          </ul>

          {/* BUTTON */}
          <button
            type="button"
            onClick={handleFullCostClick}
            className="px-5 py-3 text-sm bg-[#0B78C1] text-white rounded-md hover:bg-[#095a99] transition"
          >
            Full Cost Calculator →
          </button>
        </div>

        {/* RIGHT: live pricing preview component */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <PricingPreview />
        </div>
      </div>
    </section>
  );
};

export default CTASection;

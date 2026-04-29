import Preview from "../assets/pricing.png";

const features = [
  "No hidden provisioning fees",
  "Pay-as-you-go flexibility",
  "Volume discounts for enterprise",
  "Predictable monthly billing",
];

const CTASection = () => {
  return (
    <section className="py-20 bg-[#FAFAFA]">
      <div className="mx-auto max-w-360 px-6 lg:px-15 flex flex-col lg:flex-row items-center gap-12">
        {/* LEFT CONTENT */}
        <div className="max-w-xl">
          {/* HEADING */}
          <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-6">
            Transparent Pricing,{" "}
            <span className="text-blue-600">No Surprises.</span>
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
          <button className="px-5 py-3 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Full Cost Calculator →
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src={Preview}
            alt="pricing preview"
            className=" w-full max-w-md lg:max-w-8/10 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;

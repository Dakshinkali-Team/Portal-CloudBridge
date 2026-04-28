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
      <div className="max-w-275 mx-auto flex items-center justify-between gap-10">
        {/* LEFT CONTENT */}
        <div className="w-full max-w-180">
          <div className="w-full max-w-160 px-8 flex flex-col gap-12">
            {/* HEADING */}
            <h2 className="w-136 font-semibold text-[32px] leading-tight tracking-[-0.02em] text-gray-900">
              Transparent Pricing,{" "}
              <span className="text-blue-600 font-semibold">No Surprises.</span>
            </h2>

            {/* CHECKLIST */}
            <ul className="w-136 flex flex-col gap-5 pl-6">
              {features.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  {/* ICON */}
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#D5EDFD] text-blue-600 text-sm">
                    ✓
                  </span>

                  {/* TEXT */}
                  <span className="text-[16px] leading-7 font-normal text-[#535862]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* ACTION BUTTON */}
            <div className="flex items-center gap-3">
              {/* Button */}
          <button className="mt-6 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Full Cost Calculator →
          </button>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className=" w-180 ">
          <img
            src={Preview}
            alt="pricing preview"
            className="w-full h-full object-cover "
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;

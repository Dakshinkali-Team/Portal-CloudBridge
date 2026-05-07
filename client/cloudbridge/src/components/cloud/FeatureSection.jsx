// FeatureSection.jsx
import React from "react";
import FeatureCard from "./FeatureCard.jsx";
import IconConfigure from "../../assets/stepcardicon/configure.png";
import IconQuote from "../../assets/stepcardicon/quote.png";
import IconApprove from "../../assets/stepcardicon/approve.png";
import IconProvision from "../../assets/stepcardicon/provision.png";

const FeatureSection = () => {
  const features = [
    {
      step: "01",
      title: "Configure",
      description: "Select your CPU, RAM, and storage requirements.",
      icon: IconConfigure,
    },
    {
      step: "02",
      title: "Quote",
      description: "Get an instant, transparent monthly cost estimate.",
      icon: IconQuote,
    },
    {
      step: "03",
      title: "Approve",
      description: "Review and approve the quote within your team.",
      icon: IconApprove,
    },
    {
      step: "04",
      title: "Provision",
      description: "Watch your infrastructure come to life automatically.",
      icon: IconProvision,
    },
  ];

  return (
    <section className="w-full bg-white py-[120px] font-sans">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Heading aligned left */}
        <div className="mb-16">
          <p className="text-sm font-semibold text-[#0070BA] uppercase tracking-wide">
            How it works
          </p>
          <h2 className="text-[32px] leading-[40px] font-bold mt-2">
            From Quote to Provision in Minutes
          </h2>
          <p className="text-[18px] leading-[28px] text-gray-500 mt-4 max-w-xl">
            We’ve simplified the complex process of private cloud procurement
            into four easy steps.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.step}
              step={feature.step}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

// Location: src/components/cloud/ServiceSection.jsx
import ServiceCard from "./ServiceCard";

// 🔹 FIXED: Path points up two levels and matches 'terminallmg.png' (lowercase l)
import terminalImg from "../../assets/terminallmg.png"; 

// 🔹 FIXED: Verified paths directly inside assets/
import transparencyIcon from "../../assets/transparency.svg";
import securityIcon from "../../assets/security.svg";
import globeIcon from "../../assets/globe.svg";
import workflowIcon from "../../assets/workflow.svg";
import accessIcon from "../../assets/access.svg";

const ServiceSection = () => {
  const services = [
    {
      icon: transparencyIcon,
      title: "Full Transparency",
      description: "No hidden fees. Real-time cost calculation as you scale.",
    },
    {
      icon: securityIcon,
      title: "Security First",
      description: "End-to-end encryption and isolated network environments.",
    },
    {
      icon: globeIcon,
      title: "Global Reach",
      description: "Deploy across multiple regions with consistent performance.",
    },
    {
      icon: workflowIcon,
      title: "Automated Workflows",
      description: "API-first approach for seamless CI/CD integration.",
    },
    {
      icon: accessIcon,
      title: "Role-Based Access",
      description: "Granular permissions for users, teams, and admins.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm font-semibold text-[#0070BA] uppercase tracking-wide">
            Features
          </p>
          <h2 className="text-[32px] leading-[40px] font-bold mt-2">
            Enterprise-grade control for modern teams
          </h2>
          <p className="text-[18px] leading-[28px] text-gray-500 mt-4 max-w-xl">
            Everything you need to manage your cloud infrastructure at scale, without the complexity.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* LEFT: Reusable List */}
          <div className="flex flex-col gap-10">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          {/* RIGHT: Terminal Preview */}
          <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 border border-gray-100">
            <div className="bg-[#0B1220] rounded-xl overflow-hidden shadow-2xl">
              <img
                src={terminalImg}
                alt="CloudBridge Terminal"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
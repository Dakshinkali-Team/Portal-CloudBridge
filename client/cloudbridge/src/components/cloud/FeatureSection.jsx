import FeatureCard from "./FeatureCard.jsx";

const FeatureSection = () => {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <FeatureCard
          step="01"
          title="Configure"
          description="Select your CPU, RAM, and storage requirements."
          icon="⚙️"
        />
        <FeatureCard
          step="02"
          title="Quote"
          description="Get an instant, transparent monthly cost estimate."
          icon="📊"
        />
        <FeatureCard
          step="03"
          title="Approve"
          description="Review and approve your configuration before deployment."
          icon="✅"
        />
        <FeatureCard
          step="04"
          title="Provision"
          description="Watch your infrastructure come to life automatically."
          icon="⚡"
        />
      </div>
    </div>
  );
};

export default FeatureSection;
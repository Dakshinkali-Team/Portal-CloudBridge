import StepCard from "../components/cloud/StepCard.jsx";

const Home = () => {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StepCard
          step="01"
          title="Configure"
          description="Select your CPU, RAM, and storage requirements."
          icon="⚙️"
        />
        <StepCard
          step="02"
          title="Quote"
          description="Get an instant, transparent monthly cost estimate."
          icon="📊"
        />
        <StepCard
          step="03"
          title="Approve"
          description="Review and approve your configuration before deployment."
          icon="✅"
        />
        <StepCard
          step="04"
          title="Provision"
          description="Watch your infrastructure come to life automatically."
          icon="⚡"
        />
      </div>
    </div>
  );
};

export default Home;
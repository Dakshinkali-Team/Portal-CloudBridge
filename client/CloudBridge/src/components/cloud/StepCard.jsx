export default function StepCard({ step, title, description, icon }) {
  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
      <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-md mb-4">
        {icon}
      </div>

      <p className="text-sm text-gray-500">{step}</p>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
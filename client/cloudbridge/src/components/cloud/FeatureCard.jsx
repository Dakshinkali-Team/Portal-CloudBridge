export default function FeatureCard({
  step,
  title,
  description,
  icon,
}) {
  return (
    <div
      className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-6"
      aria-label={`Step ${step}: ${title}`}
    >
      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0070c1] text-white text-lg">
        {icon}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-[#0070c1]">
          Step {step}
        </p>

        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
// export default function FeatureCard({ step, title, description, icon }) {
//   return (
//     <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
//       {/* Icon Container */}
//       <div className="bg-[#0070c1] text-white w-10 h-10 flex items-center justify-center rounded-lg mb-6">
//         {icon}
//       </div>

//       {/* Step Number */}
//       <p className="text-sm font-bold text-[#0070c1] mb-2">{step}</p>
      
//       {/* Text Content */}
//       <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
//       <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
//     </div>
//   );
// }
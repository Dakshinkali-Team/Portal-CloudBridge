import FeatureCard from "./FeatureCard.jsx";

const FeaturesSection = () => {
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-blue-600 font-medium">
            How it works
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            From Quote to Provision in Minutes
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            We’ve simplified the complex process of private cloud procurement into four easy steps.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {[
            {
              step: "01",
              title: "Configure",
              desc: "Select your CPU, RAM, and storage requirements.",
              icon: "⚙️"
            },
            {
              step: "02",
              title: "Quote",
              desc: "Get an instant, transparent monthly cost estimate.",
              icon: "📊"
            },
            {
              step: "03",
              title: "Approve",
              desc: "Review and approve the quote within your team.",
              icon: "✅"
            },
            {
              step: "04",
              title: "Provision",
              desc: "Watch your infrastructure come to life automatically.",
              icon: "⚡"
            }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="text-2xl mb-3">{item.icon}</div>

              <p className="text-sm text-gray-400">{item.step}</p>

              <h3 className="text-lg font-semibold mt-1">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
// const FeatureSection = () => {
//   return (
//     <section
//       className="py-24 bg-gray-50"
//       aria-labelledby="how-it-works"
//     >
//       {/* Container */}
//       <div className="max-w-[1440px] mx-auto px-4">
        
//         {/* Heading */}
//         <div className="mb-16 text-center">
//           <h2
//             id="how-it-works"
//             className="text-3xl md:text-4xl font-bold text-gray-900"
//           >
//             How It Works
//           </h2>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           <FeatureCard
//             step="01"
//             title="Configure"
//             description="Select your CPU, RAM, and storage requirements."
//             icon="⚙️"
//           />
//           <FeatureCard
//             step="02"
//             title="Quote"
//             description="Get an instant, transparent monthly cost estimate."
//             icon="📊"
//           />
//           <FeatureCard
//             step="03"
//             title="Approve"
//             description="Review and approve your configuration before deployment."
//             icon="✅"
//           />
//           <FeatureCard
//             step="04"
//             title="Provision"
//             description="Watch your infrastructure come to life automatically."
//             icon="⚡"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeatureSection;
// // import FeatureCard from "./FeatureCard.jsx";

// // const FeatureSection = () => {
// //   return (
// //     <div className="p-10 bg-gray-50 min-h-screen">
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// //         <FeatureCard
// //           step="01"
// //           title="Configure"
// //           description="Select your CPU, RAM, and storage requirements."
// //           icon="⚙️"
// //         />
// //         <FeatureCard
// //           step="02"
// //           title="Quote"
// //           description="Get an instant, transparent monthly cost estimate."
// //           icon="📊"
// //         />
// //         <FeatureCard
// //           step="03"
// //           title="Approve"
// //           description="Review and approve your configuration before deployment."
// //           icon="✅"
// //         />
// //         <FeatureCard
// //           step="04"
// //           title="Provision"
// //           description="Watch your infrastructure come to life automatically."
// //           icon="⚡"
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default FeatureSection;
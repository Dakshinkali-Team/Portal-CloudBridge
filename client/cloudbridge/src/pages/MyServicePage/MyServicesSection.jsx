// import { useState } from "react";
// // Corrected paths to match your components folder
// import ServiceCardItem from "../../components/cloud/services/ServiceCardItem";
// import ServiceFilterGroup from "../../components/cloud/services/ServiceFilterGroup";

// const MyServicesSection = () => {
//   const [active, setActive] = useState("All");

//   const services = [
//     {
//       id: 1,
//       name: "Production Database",
//       type: "PostgreSQL Instance",
//       status: "Active",
//       cost: "$80/mo",
//     },
//     {
//       id: 2,
//       name: "Object Storage",
//       type: "Block Storage - 500GB",
//       status: "Pending",
//       cost: "$40/mo",
//     },
//   ];

//   const filtered =
//     active === "All"
//       ? services
//       : services.filter((s) => s.status === active);

//   return (
//     <section className="p-6">
//       <div className="mb-6">
//         <h2 className="text-[32px] leading-[40px] font-bold text-gray-900">
//           My Services
//         </h2>
//         <p className="text-[18px] leading-[28px] text-gray-500 mt-2 max-w-xl">
//           View and manage your cloud services
//         </p>
//       </div>

//       <ServiceFilterGroup active={active} setActive={setActive} />

//       <div className="flex flex-col gap-4 mt-8">
//         {filtered.length > 0 ? (
//           filtered.map((service) => (
//             <ServiceCardItem key={service.id} service={service} />
//           ))
//         ) : (
//           <p className="text-gray-500 italic">No services found for "{active}"</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default MyServicesSection;
import { useState } from "react";
import ServiceCardItem from "../../components/cloud/services/ServiceCardItem";
import ServiceFilterGroup from "../../components/cloud/services/ServiceFilterGroup";
import EmptyState from "../../components/cloud/services/EmptyState";

const MyServicesSection = () => {
  const [active, setActive] = useState("All");

  const services = [
    {
      id: 1,
      name: "Production Database",
      type: "PostgreSQL Instance",
      status: "Active",
      cost: "$80/mo",
      requested: "3/15/2026",
      deployed: "3/16/2026",
    },
    {
      id: 2,
      name: "Web Server Cluster",
      type: "Virtual Machine - Medium",
      status: "Active",
      cost: "$200/mo",
      requested: "3/10/2026",
      deployed: "3/11/2026",
    }
  ];

  const filtered =
    active === "All"
      ? services
      : services.filter((s) => s.status === active);

  return (
   <div className="px-4 py-6">

      {/* Header */}
      {/* <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          My Services
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          View and manage your cloud services
        </p>
      </header> */}

      {/* Filters */}
      <ServiceFilterGroup active={active} setActive={setActive} />

      {/* List */}
      <div className="mt-6 flex flex-col gap-4">
        {filtered.length > 0 ? (
          filtered.map((service) => (
            <ServiceCardItem key={service.id} service={service} />
          ))
        ) : (
          <EmptyState activeFilter={active} />
        )}
      </div>

    </div>
  );
};

export default MyServicesSection;
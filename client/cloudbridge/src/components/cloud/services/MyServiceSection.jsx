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

  const filtered = active === "All" 
    ? services 
    : services.filter((s) => s.status === active);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">My Services</h1>
        <p className="text-gray-500 mt-1 text-lg">View and manage your cloud services</p>
      </header>

      <ServiceFilterGroup active={active} setActive={setActive} />

      <div className="mt-8">
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
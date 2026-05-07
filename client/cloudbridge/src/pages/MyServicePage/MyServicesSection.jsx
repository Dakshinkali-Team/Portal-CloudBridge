
import { useState } from "react";
import { ServiceIcon, IconButton } from "../../components/cloud/services/ReusableAtoms";

const ServiceCard = ({ service }) => (
  <div className="bg-white border border-slate-200 rounded-lg py-2 px-4 hover:shadow-sm transition">

    {/* Header */}
   <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">

      {/* Left */}
      <div className="flex items-center gap-2">
        <ServiceIcon type={service.type} />

        <div>
          <h3 className="text-[12px] font-semibold text-slate-900 leading-tight">
            {service.name}
          </h3>
          <p className="text-[10px] text-slate-500 mt-0.5 ">
            {service.type}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2.5">

        {/* Status */}
        <span
          className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1
            ${
              service.status === "Active"
                ? "bg-green-50 text-green-600"
                : service.status === "Pending"
                ? "bg-orange-50 text-orange-600"
                : "bg-gray-100 text-gray-500"
            }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
          {service.status}
        </span>

        {/* Eye Button */}
        <IconButton />

      </div>
    </div>

    {/* Bottom Section */}
    <div className="grid grid-cols-3 mt-1.5 text-xs">

      <DataField label="Monthly Cost" value={service.cost} isBold />
      <DataField label="Requested" value={service.requested} />
      <DataField label="Deployed" value={service.deployed || "—"} />

    </div>
  </div>
);

const DataField = ({ label, value, isBold }) => (
  <div>
    <p className="text-[9px] uppercase tracking-wider text-slate-500 mb-0">
      {label}
    </p>
    <p className={`text-[12px] ${isBold ? "font-semibold text-slate-900" : "text-slate-700"}`}>
      {value}
    </p>
  </div>
);

export default function MyServicesSection() {
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
    },
    {
      id: 3,
      name: "Object Storage",
      type: "Block Storage - 500GB",
      status: "Pending",
      cost: "$40/mo",
      requested: "4/10/2026",
      deployed: "",
    },
    {
      id: 4,
      name: "CDN Service",
      type: "CDN Service",
      status: "Active",
      cost: "$150/mo",
      requested: "2/20/2026",
      deployed: "2/22/2026",
    },
    {
      id: 5,
      name: "Analytics Platform",
      type: "Analytics Service",
      status: "Cancelled",
      cost: "$120/mo",
      requested: "1/5/2026",
      deployed: "1/10/2026",
    },
  ];

  const filtered =
    active === "All"
      ? services
      : services.filter((s) => s.status === active);

  return (
    <div className="mt-6">

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {["All", "Active", "Pending", "Cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`text-xs px-3 py-1 rounded-md border transition
              ${
                active === f
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {filtered.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>

    </div>
  );
} 
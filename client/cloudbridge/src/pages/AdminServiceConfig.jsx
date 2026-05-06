import { useState } from "react";
import AdminSidebar from "../components/layout/AdminSidebar.jsx";
import Button from '../components/layout/components/Button.jsx';

// ── Data ──────────────────────────────────────────────────────────────────────
const INITIAL_SERVICES = [
  { id: 1, name: "Virtual Machine - Small", category: "Compute",  specs: "2 vCPU, 4GB RAM",       price: 50,  status: "active"   },
  { id: 2, name: "PostgreSQL Instance",     category: "Database", specs: "Standard, 20GB Storage", price: 80,  status: "active"   },
  { id: 3, name: "Block Storage - 100GB",   category: "Storage",  specs: "SSD, 100GB",             price: 10,  status: "active"   },
  { id: 4, name: "Load Balancer",           category: "Network",  specs: "Standard, Auto-scaling", price: 50,  status: "inactive" },
];

// ── Service Icon ──────────────────────────────────────────────────────────────
function ServiceIcon() {
  return (
    <div className="w-10 h-10 rounded-md bg-[#EFF6FF] flex items-center justify-center shrink-0">
      <svg className="w-5 h-5 text-[#0B78C1]" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="2" width="14" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <rect x="1" y="9" width="14" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="3.5" cy="5" r="0.8" fill="currentColor" />
        <circle cx="3.5" cy="11" r="0.8" fill="currentColor" />
      </svg>
    </div>
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const isActive = status === "active";
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
        isActive
          ? "text-emerald-600 bg-emerald-50 border-emerald-200"
          : "text-slate-500 bg-slate-100 border-slate-200"
      }`}
    >
      {status}
    </span>
  );
}

// ── Summary Stats ─────────────────────────────────────────────────────────────
function SummaryStats({ services }) {
  const total    = services.length;
  const active   = services.filter((s) => s.status === "active").length;
  const inactive = services.filter((s) => s.status === "inactive").length;

  const stats = [
    { label: "Total Services",    value: total    },
    { label: "Active Services",   value: active   },
    { label: "Inactive Services", value: inactive },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white border border-[#E2E8F0] rounded-xl px-6 pt-6 pb-4 flex flex-col h-[110px] pt-[25px] pr-[25px] pb-[1px] gap-[4px]"
        >
          <p className="font-work-sans text-3xl font-bold text-[#0F172B]">{s.value}</p>
          <p className="font-work-sans text-sm text-[#45556C]">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminServiceConfig() {
  const [services, setServices] = useState(INITIAL_SERVICES);

  const handleDelete = (id) =>
    setServices((prev) => prev.filter((s) => s.id !== id));

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">

      {/* Sidebar */}
      <AdminSidebar/>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="px-6 lg:px-8 py-7 w-full">

          {/* ── Header row ── */}
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="font-dm-sans text-2xl lg:text-3xl font-bold text-[#0F172B] pb-1">
                Service Configuration
              </h1>
              <p className="font-work-sans text-sm lg:text-base text-[#45556C] mt-1">
                Manage available cloud services and pricing
              </p>
            </div>

            <Button variant="primary" className="text-base shrink-0 px-5! py-2.5! shadow-lg shadow-blue-400/50">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
             Add Service
            </Button>
          </div>

          {/* ── Stat cards ── */}
          <SummaryStats services={services} />

          {/* ── Table card ── */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm w-full overflow-x-auto min-h-[355px]">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  {["Service Name", "Category", "Specifications", "Price/Month", "Status", "Actions"].map(
                    (col, i) => (
                      <th
                        key={col}
                        className={`font-work-sans px-5 h-[52.5px] text-sm font-semibold text-[#0F172B] tracking-wide ${
                          i === 5 ? "text-right" : "text-left"
                        }`}
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E2E8F0]">
                {services.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-400 font-work-sans text-sm">
                      No services found.
                    </td>
                  </tr>
                ) : (
                  services.map((svc) => (
                    <tr key={svc.id} className="hover:bg-slate-50/70 transition-colors">

                      {/* Service Name */}
                      <td className="px-5 h-[73px]">
                        <div className="flex items-center gap-3">
                          <ServiceIcon />
                          <span className="font-work-sans text-base font-medium text-[#0F172B]">
                            {svc.name}
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="font-work-sans px-5 py-4 text-base text-[#45556C]">
                        {svc.category}
                      </td>

                      {/* Specifications */}
                      <td className="font-work-sans px-5 py-4 text-sm text-[#45556C]">
                        {svc.specs}
                      </td>

                      {/* Price/Month */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="font-work-sans text-base font-bold text-[#0F172B]">
                          ${svc.price}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge status={svc.status} />
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {/* Edit */}
                          <button
                            className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors"
                            title="Edit"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                              <path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                            </svg>
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(svc.id)}
                            className="w-7 h-7 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 transition-colors"
                            title="Delete"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                              <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}
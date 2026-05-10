import { useState } from "react";
import PageHeader from './admin_dashboard/PageHeader';
import SummaryStats from './admin_dashboard/SummaryStats';

import TabBar from './admin_dashboard/TabBar';
import IconButton from './admin_dashboard/IconButton';
import StatusBadge from './admin_dashboard/StatusBadge';
import DataTable from "./admin_dashboard/DataTable";
const INITIAL_REQUESTS = [
  {
    id: 1,
    customer: "John Doe",
    company: "Acme Corp",
    service: "Database Cluster",
    price: 250,
    requestDate: "4/17/2026",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Jane Smith",
    company: "TechStart Inc",
    service: "Web Server Medium",
    price: 100,
    requestDate: "4/16/2026",
    status: "Approved",
  },
  {
    id: 3,
    customer: "Bob Johnson",
    company: "Cloud Solutions",
    service: "Storage 1TB",
    price: 75,
    requestDate: "4/16/2026",
    status: "Pending",
  },
  {
    id: 4,
    customer: "Alice Williams",
    company: "Data Systems",
    service: "Load Balancer",
    price: 50,
    requestDate: "4/15/2026",
    status: "Approved",
  },
  {
    id: 5,
    customer: "Charlie Brown",
    company: "WebFlow LLC",
    service: "CDN Service",
    price: 30,
    requestDate: "4/15/2026",
    status: "Rejected",
  },
];
 
// ── Tab options ───────────────────────────────────────────────────────────────
 
const TABS = ["All", "Pending", "Approved", "Rejected"];
 
// ── Table column definitions ──────────────────────────────────────────────────
 
const COLUMNS = [
  { key: "id",          label: "Request ID"   },
  { key: "customer",    label: "Customer"     },
  { key: "service",     label: "Service"      },
  { key: "price",       label: "Price"        },
  { key: "requestDate", label: "Request Date" },
  { key: "status",      label: "Status"       },
  { key: "actions",     label: "Actions", align: "right" },
];
 
// ── SVG icons (inline, no extra dependency) ───────────────────────────────────
 
const EyeIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);
 
const CheckIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
    <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
 
const XIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
 
// ── Page component ────────────────────────────────────────────────────────────
 
export default function AdminServiceRequest() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [activeTab, setActiveTab] = useState("All");
 
  // ── Derived data ────────────────────────────────────────────────────────────
 
  const filtered =
    activeTab === "All"
      ? requests
      : requests.filter((r) => r.status === activeTab);
 
  // ── Stat card values (auto-update when requests change) ─────────────────────
  const stats = [
    { label: "Total Requests", value: requests.length },
    { label: "Pending",  value: requests.filter((r) => r.status === "Pending").length  },
    { label: "Approved", value: requests.filter((r) => r.status === "Approved").length },
    { label: "Rejected", value: requests.filter((r) => r.status === "Rejected").length },
  ];
 
  // ── Action handlers ─────────────────────────────────────────────────────────
 
  const approve = (id) =>
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r))
    );
 
  const reject = (id) =>
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r))
    );
 
  // ── Render ──────────────────────────────────────────────────────────────────
 
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
 
      {/* ── Header ── */}
      <PageHeader
        title="Service Request Management"
        subtitle="Review and manage customer service requests"
      />
 
      {/* ── Stat cards  (4-column grid) ── */}
      <SummaryStats stats={stats} cols="grid-cols-2 lg:grid-cols-4" />
 
      {/* ── Filter tabs ── */}
      <TabBar tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
 
      {/* ── Table ── */}
      <DataTable
        columns={COLUMNS}
        isEmpty={filtered.length === 0}
        emptyMessage="No requests match this filter."
      >
        {filtered.map((req) => (
          <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
 
            {/* Request ID */}
            <td className="px-5 py-4 text-sm text-[#0F172B]">
              #{req.id}
            </td>
 
            {/* Customer + company */}
            <td className="px-5 py-4">
              <p className="text-sm font-semibold text-[#0F172B]">{req.customer}</p>
              <p className="text-xs text-[#45556C] mt-0.5">{req.company}</p>
            </td>
 
            {/* Service name */}
            <td className="px-5 py-4 text-sm text-[#0F172B]">
              {req.service}
            </td>
 
            {/* Price */}
            <td className="px-5 py-4 whitespace-nowrap">
              <span className="font-mono text-sm font-semibold text-[#0F172B]">
                ${req.price}
              </span>
              <span className="text-xs text-[#45556C]">/mo</span>
            </td>
 
            {/* Request date */}
            <td className="px-5 py-4 text-xs text-[#45556C] whitespace-nowrap">
              {req.requestDate}
            </td>
 
            {/* Status badge — uses StatusBadge component */}
            <td className="px-5 py-4">
              <StatusBadge status={req.status} />
            </td>
 
            {/* Action buttons — uses IconButton component */}
            <td className="px-5 py-4">
              <div className="flex items-center justify-end gap-1.5">
 
                <IconButton title="View details" variant="default">
                  <EyeIcon />
                </IconButton>
 
                {/* Approve / Reject only shown for Pending requests */}
                {req.status === "Pending" && (
                  <>
                    <IconButton
                      title="Approve"
                      variant="success"
                      onClick={() => approve(req.id)}
                    >
                      <CheckIcon />
                    </IconButton>
 
                    <IconButton
                      title="Reject"
                      variant="danger"
                      onClick={() => reject(req.id)}
                    >
                      <XIcon />
                    </IconButton>
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}

// import { useState } from "react";
// // import AdminSidebar from "./AdminSidebar.jsx";


// // ── Data ─────────────────────────────────────────────────────────────────────
// const INITIAL_REQUESTS = [
//   { id: 1, customer: "John Doe",      company: "Acme Corp",      service: "Database Cluster",  price: 250, requestDate: "4/17/2026", status: "Pending"  },
//   { id: 2, customer: "Jane Smith",    company: "TechStart Inc",  service: "Web Server Medium", price: 100, requestDate: "4/16/2026", status: "Approved" },
//   { id: 3, customer: "Bob Johnson",   company: "Cloud Solutions",service: "Storage 1TB",       price: 75,  requestDate: "4/16/2026", status: "Pending"  },
//   { id: 4, customer: "Alice Williams",company: "Data Systems",   service: "Load Balancer",     price: 50,  requestDate: "4/15/2026", status: "Approved" },
//   { id: 5, customer: "Charlie Brown", company: "WebFlow LLC",    service: "CDN Service",       price: 30,  requestDate: "4/15/2026", status: "Rejected" },
// ];

// const TABS = ["All", "Pending", "Approved", "Rejected"];

// // ── Status Badge ──────────────────────────────────────────────────────────────
// function StatusBadge({ status }) {
//   const config = {
//     Pending: {
//       text: "text-amber-600",
//       bg: "bg-amber-50",
//       border: "border-amber-200",
//       icon: (
//         <svg className="w-3 h-3 shrink-0" viewBox="0 0 12 12" fill="none">
//           <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
//           <path d="M6 3.5V6.5L7.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//         </svg>
//       ),
//     },
//     Approved: {
//       text: "text-emerald-600",
//       bg: "bg-emerald-50",
//       border: "border-emerald-200",
//       icon: (
//         <svg className="w-3 h-3 shrink-0" viewBox="0 0 12 12" fill="none">
//           <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//       ),
//     },
//     Rejected: {
//       text: "text-red-500",
//       bg: "bg-red-50",
//       border: "border-red-200",
//       icon: (
//         <svg className="w-3 h-3 shrink-0" viewBox="0 0 12 12" fill="none">
//           <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//         </svg>
//       ),
//     },
//   };

//   const c = config[status];
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${c.text} ${c.bg} ${c.border}`}>
//       {c.icon}
//       {status}
//     </span>
//   );
// }

// // ── Action Buttons ────────────────────────────────────────────────────────────
// function ActionButtons({ status, onApprove, onReject }) {
//   return (
//     <div className="flex items-center justify-end gap-1.5">
//       <button
//         className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors shrink-0"
//         title="View"
//       >
//         <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
//           <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.4" />
//           <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
//         </svg>
//       </button>

//       {status === "Pending" && (
//         <button
//           onClick={onApprove}
//           className="w-7 h-7 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-emerald-600 transition-colors shrink-0"
//           title="Approve"
//         >
//           <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
//             <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </button>
//       )}

//       {status === "Pending" && (
//         <button
//           onClick={onReject}
//           className="w-7 h-7 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 transition-colors shrink-0"
//           title="Reject"
//         >
//           <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
//             <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//           </svg>
//         </button>
//       )}
//     </div>
//   );
// }

// // ── Summary Stats ─────────────────────────────────────────────────────────────
// function SummaryStats({ requests }) {
//   const stats = [
//     { label: "Total Requests", value: requests.length },
//     { label: "Pending",        value: requests.filter((r) => r.status === "Pending").length  },
//     { label: "Approved",       value: requests.filter((r) => r.status === "Approved").length },
//     { label: "Rejected",       value: requests.filter((r) => r.status === "Rejected").length },
//   ];

//   return (
//     <div className="grid pt-5 grid-cols-2 lg:grid-cols-4 gap-3 w-full mb-8">
//       {stats.map((s) => (
//         <div
//           key={s.label}
//           className="bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-1 min-h-[90px] lg:min-h-[110px] px-6 pt-6 pb-1"
//         >
//           <p className="font-work-sans text-3xl font-bold text-[#0F172B]">{s.value}</p>
//           <p className="font-work-sans text-sm text-slate-400">{s.label}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ── Main Page ─────────────────────────────────────────────────────────────────
// export default function AdminServiceRequest() {
//   const [activeTab, setActiveTab] = useState("All");
//   const [requests, setRequests]   = useState(INITIAL_REQUESTS);

//   const filtered =
//     activeTab === "All"
//       ? requests
//       : requests.filter((r) => r.status === activeTab);

//   const handleApprove = (id) =>
//     setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r)));

//   const handleReject = (id) =>
//     setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r)));

//   return (
//     // Root: sidebar + main side by side, full viewport height
//     <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">


//       {/* ── Main scrollable area ── */}
//       <main className="flex-1 min-w-0">
//         {/* Inner content with consistent padding */}
//         <div className="w-full">

//           {/* Header */}
//           <div className="mb-2">
//             <h1 className="font-dm-sans text-3xl font-bold text-[#0F172B]">
//               Service Request Management
//             </h1>
//             <p className="font-work-sans text-base text-[#45556C] mt-1">
//               Review and manage customer service requests
//             </p>
//           </div>

//            {/* Summary stat cards */}
//           <SummaryStats requests={requests} />

//           {/* Tab buttons */}
//           <div className="flex items-center gap-3 mb-6 flex-wrap">
//             {TABS.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`font-work-sans px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
//                   activeTab === tab
//                     ? "bg-[#0B78C1] text-white border-[#0B78C1] shadow-lg shadow-blue-400/50"
//                     : "text-[#45556C] bg-white border-[#E2E8F0] hover:bg-slate-50 hover:text-slate-700"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           {/* Table card — scrolls horizontally only on very small screens */}
//           <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm w-full overflow-x-auto">
//             <table className="w-full text-sm min-w-[640px]">
//               <thead>
//                 <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
//                   {["Request ID", "Customer", "Service", "Price", "Request Date", "Status", "Actions"].map(
//                     (col, i) => (
//                       <th
//                         key={col}
//                         className={`font-work-sans px-5 h-[52px] text-sm font-semibold text-[#0F172B] tracking-wide ${
//                           i === 6 ? "text-right" : "text-left"
//                         }`}
//                       >
//                         {col}
//                       </th>
//                     )
//                   )}
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-[#E2E8F0]">
//                 {filtered.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="text-center py-12 text-slate-400 text-sm font-work-sans">
//                       No requests found.
//                     </td>
//                   </tr>
//                 ) : (
//                   filtered.map((req) => (
//                     <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">

//                       {/* Request ID */}
//                       <td className="font-work-sans px-5 py-4 text-[#0F172B] text-sm">
//                         #{req.id}
//                       </td>

//                       {/* Customer */}
//                       <td className="px-5 py-4">
//                         <p className="font-work-sans text-base font-semibold text-[#0F172B]">{req.customer}</p>
//                         <p className="font-work-sans text-sm text-[#45556C] mt-0.5">{req.company}</p>
//                       </td>

//                       {/* Service */}
//                       <td className="font-work-sans px-5 py-4 text-base text-[#0F172B]">
//                         {req.service}
//                       </td>

//                       {/* Price */}
//                       <td className="px-5 py-4 whitespace-nowrap">
//                         <span className="font-jetbrains-mono text-base font-semibold text-[#0F172B]">
//                           ${req.price}
//                         </span>
//                         <span className="font-jetbrains-mono text-base font-semibold text-[#0F172B]">/mo</span>
//                       </td>

//                       {/* Request Date */}
//                       <td className="font-work-sans px-5 py-4 text-sm text-[#45556C] whitespace-nowrap">
//                         {req.requestDate}
//                       </td>

//                       {/* Status */}
//                       <td className="px-5 py-4">
//                         <StatusBadge status={req.status} />
//                       </td>

//                       {/* Actions */}
//                       <td className="px-5 py-4">
//                         <ActionButtons
//                           status={req.status}
//                           onApprove={() => handleApprove(req.id)}
//                           onReject={() => handleReject(req.id)}
//                         />
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

         
//         </div>
//       </main>
//     </div>
//   );
// }
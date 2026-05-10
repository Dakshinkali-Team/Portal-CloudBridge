const CONFIG = {
  pending:  {
    text: "text-amber-700",   bg: "bg-amber-50",   border: "border-amber-200",
    label: "Pending",
    icon: (
      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6 3.5V6.5L7.5 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  approved: {
    text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200",
    label: "Approved",
    icon: (
      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  rejected: {
    text: "text-red-600",     bg: "bg-red-50",     border: "border-red-200",
    label: "Rejected",
    icon: (
      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
        <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  active: {
    text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200",
    label: "active",
    icon: (
      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  inactive: {
    text: "text-slate-500",   bg: "bg-slate-100",  border: "border-slate-200",
    label: "inactive",
    icon: (
      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
};

export default function StatusBadge({ status }) {
  const key = status?.toLowerCase();
  const c = CONFIG[key] ?? {
    text: "text-slate-500", bg: "bg-slate-100", border: "border-slate-200",
    label: status, icon: null,
  };

  return (

    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${c.text} ${c.bg} ${c.border}`}
    >
      {c.icon}
      {c.label}
    </span>

    
  );
}
const VARIANTS = {
  default: "border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-700",
  success: "border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-600",
  danger:  "border-red-200 bg-red-50 hover:bg-red-100 text-red-500",
};

export default function IconButton({ title, variant = "default", onClick, disabled, children }) {
  return (
    <button
      title={title}
      aria-label={title}
      onClick={onClick}
      disabled={disabled}
      className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed ${VARIANTS[variant]}`}
    >

      {children}
    </button>
    
  );
}
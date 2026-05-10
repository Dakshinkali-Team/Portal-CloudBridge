export default function SummaryStats({ stats, cols = "grid-cols-2 lg:grid-cols-4" }) {
  return (
    <div className={`grid ${cols} gap-3 pt-5 mb-8`}>
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white border border-[#E2E8F0] rounded-xl px-6 pt-6 pb-4"
        >
          <p className="text-3xl font-bold text-[#0F172B]">{s.value}</p>
          <p className="text-sm text-slate-400 mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
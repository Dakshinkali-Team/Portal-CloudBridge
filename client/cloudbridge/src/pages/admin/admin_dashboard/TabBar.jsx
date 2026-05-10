export default function TabBar({ tabs, activeTab, onChange }) {
  return (
    <div className="flex items-center gap-3 mb-6 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
            activeTab === tab
              ? "bg-[#0B78C1] text-white border-[#0B78C1] shadow-lg shadow-blue-400/40"
              : "text-[#45556C] bg-white border-[#E2E8F0] hover:bg-slate-50"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
// src/components/common/SectionCard.jsx

const SectionCard = ({ title, children, className = "" }) => (
  <section 
    style={{ fontFamily: "'Inter', sans-serif" }}
    className={`flex flex-col bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm ${className}`}
  >
    {title && (
      <h3 className="text-[20px] font-semibold text-[#0F172B] mb-4 tracking-tight">
        {title}
      </h3>
    )}
    <div className="flex-1">
      {children}
    </div>
  </section>
);

export default SectionCard;
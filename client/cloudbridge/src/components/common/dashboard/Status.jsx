// src/components/common/StatusBadge.jsx

const Status = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        // Photo 3 ko light orange style
        return "bg-[#FFF7ED] text-[#C2410C]"; 
      case "approved":
        // Photo 3 ko light blue style
        return "bg-[#EFF6FF] text-[#2563EB]"; 
      case "deployed":
        // Photo 3 ko light green style
        return "bg-[#F0FDF4] text-[#16A34A]"; 
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <span 
      style={{ fontFamily: "'Inter', sans-serif" }}
      className={`px-3 py-1 rounded-full text-[12px] font-medium tracking-wide ${getStatusStyles(status)}`}
    >
      {status.toLowerCase()}
    </span>
  );
};

export default Status;
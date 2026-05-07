const statusConfig = {
  Active: "bg-green-50 text-green-600 border-green-100",
  Pending: "bg-orange-50 text-orange-600 border-orange-100",
  Cancelled: "bg-red-50 text-red-600 border-red-100",
};

export const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-[12px] font-bold border flex items-center gap-1.5 ${statusConfig[status] || statusConfig.Active}`}>
    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
    {status}
  </span>
);
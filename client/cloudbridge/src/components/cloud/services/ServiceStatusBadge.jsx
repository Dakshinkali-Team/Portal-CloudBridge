// src/components/cloud/services/ServiceStatusBadge.jsx

const ServiceStatusBadge = ({ status }) => {
  const styles = {
    Active: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <span className={`px-3 py-1 text-xs rounded-full font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

export default ServiceStatusBadge;
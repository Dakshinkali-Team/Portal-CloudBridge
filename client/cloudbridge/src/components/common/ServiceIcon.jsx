// src/components/common/ServiceIcon.jsx
const ServiceIcon = ({ src, alt = "service" }) => {
  return (
    <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
      <img src={src} alt={alt} className="w-6 h-6 object-contain" />
    </div>
  );
};

export default ServiceIcon;
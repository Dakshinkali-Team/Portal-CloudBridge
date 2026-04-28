// Location: src/components/cloud/ServiceCard.jsx
const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="flex items-start gap-6 group">
      {/* Icon Box */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm p-2.5 transition-shadow group-hover:shadow-md">
        <img 
          src={icon} 
          alt="" 
          className="w-full h-full object-contain" 
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col">
        <h4 className="text-lg font-semibold text-gray-900 leading-tight">
          {title}
        </h4>
        <p className="mt-2 text-gray-500 leading-relaxed text-sm max-w-[360px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
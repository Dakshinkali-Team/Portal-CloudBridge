import ServiceIcon from "../../common/ServiceIcon";
import IconButton from "../../common/IconButton";
import ServiceStatusBadge from "./ServiceStatusBadge";

// Ensure these are 3 levels up if assets is in src/
import databaseIcon from "../../../assets/icon-database.png";
import eyeIcon from "../../../assets/icon-eye.png";

const ServiceCardItem = ({ service }) => {
  return (
    /* We use grid-cols-12 to create the table-like columns from your Figma */
    <div className="grid grid-cols-12 items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm mb-4">
      
      {/* Column 1-4: Service Name and Icon */}
      <div className="col-span-4 flex items-center gap-4">
        <ServiceIcon src={databaseIcon} />
        <div>
          <h3 className="font-bold text-gray-900 text-base">{service.name}</h3>
          <p className="text-xs text-gray-400 font-medium">{service.type}</p>
        </div>
      </div>

      {/* Column 5-6: Monthly Cost (Stacked) */}
      <div className="col-span-2">
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Monthly Cost</p>
        <p className="text-gray-900 font-extrabold text-sm">{service.cost}</p>
      </div>

      {/* Column 7-8: Requested Date */}
      <div className="col-span-2 text-center border-l border-gray-50">
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Requested</p>
        <p className="text-gray-900 font-medium text-xs">{service.requested || "3/15/2026"}</p>
      </div>

      {/* Column 9-10: Deployed Date */}
      <div className="col-span-2 text-center">
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Deployed</p>
        <p className="text-gray-900 font-medium text-xs">{service.deployed || "3/16/2026"}</p>
      </div>

      {/* Column 11-12: Status & Eye Button */}
      <div className="col-span-2 flex items-center justify-end gap-4">
        <ServiceStatusBadge status={service.status} />
        <IconButton src={eyeIcon} onClick={() => console.log("View", service.id)} />
      </div>
    </div>
  );
};

export default ServiceCardItem;
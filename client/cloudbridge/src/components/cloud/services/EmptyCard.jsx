import ServiceIcon from "../../common/ServiceIcon";
import databaseIcon from "../../../assets/icon-database.png";

const EmptyState = ({ activeFilter }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="opacity-20 mb-4 scale-125">
         <ServiceIcon src={databaseIcon} />
      </div>
      <h3 className="text-lg font-bold text-gray-800">No services found</h3>
      <p className="text-gray-400 text-sm mt-1">
        No services match the {activeFilter} filter.
      </p>
    </div>
  );
};

export default EmptyState;
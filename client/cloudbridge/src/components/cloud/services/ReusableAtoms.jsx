import dbIcon from "../../../assets/icon-database.png";
import eyeIcon from "../../../assets/icon-eye.png";

// The blue square container for services
export const ServiceIcon = () => (
  <div className="w-12 h-12 bg-[#E0F2FE] rounded-xl flex items-center justify-center">
    <img src={dbIcon} alt="Service" className="w-4 h-4 object-contain" />
  </div>
);

// The Detail/View action button
export const IconButton = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="p-2 border border-slate-100 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center active:scale-95"
  >
    <img src={eyeIcon} alt="View" className="w-5 h-5 object-contain opacity-60" />
  </button>
);
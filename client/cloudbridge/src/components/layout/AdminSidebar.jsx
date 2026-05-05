import { NavLink } from "react-router-dom";
import LogoIcon from "../../assets/Cloud_Bridge.svg";
import DashboardIcon from "../../assets/dashboardIcons/Dashboard.svg";
import ServiceConfigIcon from "../../assets/dashboardIcons/ServiceConfig.svg";
import ServiceRequestIcon from "../../assets/dashboardIcons/ServiceRequest.svg";
import LogoutIcon from "../../assets/dashboardIcons/Logout.svg";

const AdminSidebar = () => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: DashboardIcon },
    { name: "Service Config", path: "/service-config", icon: ServiceConfigIcon },
    { name: "Service Requests", path: "/service-requests", icon: ServiceRequestIcon },
  ];

  return (
    <aside className="w-[255px] h-screen flex flex-col bg-white border-r border-[#E2E8F0] sticky top-0">
      
      {/* Brand Logo */}
      <div className="flex flex-col h-[93px] px-6 py-6 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="flex w-10 h-10 justify-center items-center bg-[#0F172B] rounded-lg">
            <img src={LogoIcon} alt="logo" className="w-5 h-5 invert" />
          </div>
          <div>
            <h1 className="text-[18px] font-semibold text-[#0F172B]">CloudBridge</h1>
            <p className="text-[10px] text-gray-400 font-mono">v2.0.1</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 pt-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex h-12 px-4 items-center gap-3 rounded-lg transition-colors
              ${isActive 
                ? "bg-[#EFF6FF] text-[#0B78C1]" 
                : "text-[#45556C] hover:bg-gray-50"}
            `}
          >
            <img src={item.icon} alt="" className="w-5 h-5" />
            <span className="text-[16px] font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Footer */}
      <div className="p-4 border-t border-[#E2E8F0]">
        <button className="flex h-12 px-4 items-center gap-3 rounded-lg w-full text-[#45556C] hover:bg-red-50 hover:text-red-600 transition-colors">
          <img src={LogoutIcon} alt="logout" className="w-5 h-5" />
          <span className="text-[16px] font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
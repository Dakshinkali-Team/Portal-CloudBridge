import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoIcon from "../../assets/Icon.svg";
import DashboardIcon from "../../assets/dashboardIcons/Dashboard.svg";
import ServiceConfigIcon from "../../assets/dashboardIcons/ServiceConfig.svg";
import ServiceRequestIcon from "../../assets/dashboardIcons/ServiceRequest.svg";
import LogoutIcon from "../../assets/dashboardIcons/Logout.svg";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: DashboardIcon },
    {
      name: "Service Config",
      path: "/admin-dashboard/service-config",
      icon: ServiceConfigIcon,
    },
    {
      name: "Service Requests",
      path: "/admin-dashboard/service-requests",
      icon: ServiceRequestIcon,
    },
  ];

  const handleLogout = () => {
    signOut();
    navigate("/login", { replace: true });
  };

 return (
   <div className="h-full flex flex-col">

  {/* LOGO */}
  <div className="border-b border-[#E5E8ED] px-6 py-6">
    <Link to="#" className="flex items-center gap-3">
      <div className="flex w-10 h-10 justify-center items-center rounded-lg bg-[#0B78C1]">
        <img src={LogoIcon} alt="logo" className="w-5 h-5" />
      </div>

      <div>
        <h1 className="font-dm-sans text-[18px] font-semibold text-[#1E293B] leading-[28px]">
          CloudBridge
        </h1>
        <p className="font-jetbrains-mono text-[12px] text-[#64748B] leading-[16px]">
          v2.0.1
        </p>
      </div>
    </Link>
  </div>

  {/* NAV */}
  <div className="flex-1 px-4 py-4 flex flex-col gap-2">
    {navItems.map((item, index) => {
      const isActive = location.pathname === item.path;

      return (
        <Link
          key={index}
          to={item.path}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg
            ${isActive ? "bg-[#E1F2FB]" : "hover:bg-gray-100"}
          `}
        >
          <img src={item.icon} className="w-5 h-5" />

          <span
            className={`font-WorkSans text-[16px] leading-[24px] font-medium
              ${isActive ? "text-[#0B78C1]" : "text-[#45556C]"}
            `}
          >
            {item.name}
          </span>
        </Link>
      );
    })}
  </div>

  {/* LOGOUT */}
  <div className="border-t border-[#E5E8ED] px-4 py-4">
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-gray-100"
    >
      <img src={LogoutIcon} className="w-5 h-5" />

      <span className="font-WorkSans text-[16px] leading-[24px] font-medium text-[#475569]">
        Logout
      </span>
    </button>
  </div>

</div>
  );
};

export default AdminSidebar;

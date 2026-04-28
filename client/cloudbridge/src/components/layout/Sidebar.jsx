import { Link, useLocation } from "react-router-dom";

// Import your icons
import LogoIcon from "../../assets/Icon.svg";
import DashboardIcon from "../../assets/dashboardIcons/Dashboard.svg";
import ServiceIcon from "../../assets/dashboardIcons/MyServices.svg";
import CalculatorIcon from "../../assets/dashboardIcons/PriceCalculator.svg";
import ServiceRequest from "../../assets/dashboardIcons/ServiceRequest.svg";
import ProfileIcon from "../../assets/dashboardIcons/Profile.svg";
import LogoutIcon from "../../assets/dashboardIcons/Logout.svg";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: DashboardIcon },
    { name: "Service Request", path: "/service-request", icon: ServiceRequest },
    { name: "Price Calculator", path: "/price-calculator", icon: CalculatorIcon },
    { name: "My Services", path: "/services", icon: ServiceIcon },
    { name: "Profile", path: "/profile", icon: ProfileIcon },
  ];

  return (
    <div className="w-[255px] h-screen flex flex-col bg-white border-b border-[#E2E8F0]">

      {/* ================= LOGO CONTAINER ================= */}
      <div className="flex flex-col w-[255px] h-[93px] px-6 pt-6 pb-[1px] border-b border-[#E2E8F0]">
        
        <Link className="flex h-[44px] items-center gap-3 w-full">
          
          {/* Icon Box */}
          <div className="flex w-10 h-10 px-[10px] justify-center items-center">
            <img src={LogoIcon} alt="logo" className="w-5 h-5" />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center items-start h-[44px]">
            <h1 className="text-[18px] font-semibold text-[#0F172B] leading-7">
              CloudBridge
            </h1>
          </div>

        </Link>
      </div>

      {/* ================= NAVIGATION ================= */}
      <div className="flex flex-col w-[255px] flex-1 px-4 pt-4 gap-1">

        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex h-12 px-4 items-center gap-3 rounded-lg w-full
                ${
                  isActive
                    ? "bg-[#EFF6FF]"
                    : "hover:bg-gray-100"
                }
              `}
            >
              {/* Icon */}
              <img src={item.icon} alt="" className="w-5 h-5" />

              {/* Text */}
              <div className="flex justify-center items-center">
                <span
                  className={`text-[16px] font-medium leading-6
                    ${
                      isActive
                        ? "text-[#0B78C1]"
                        : "text-[#45556C]"
                    }
                  `}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ================= LOGOUT CONTAINER ================= */}
      <div className="flex flex-col w-[255px] h-[81px] px-4 pt-[17px] border-t border-[#E2E8F0]">

        <button className="flex h-12 px-4 items-center gap-3 rounded-lg w-full hover:bg-gray-100">

          {/* Icon */}
          <img src={LogoutIcon} alt="logout" className="w-5 h-5" />

          {/* Text */}
          <span className="text-[16px] font-medium text-[#45556C] leading-6">
            Logout
          </span>

        </button>

      </div>
    </div>
  );
};

export default Sidebar;
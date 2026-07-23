import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useAxios from "../../hooks/useAxios";

// Import your icons
import LogoIcon from "../../assets/Icon.svg";
import DashboardIcon from "../../assets/dashboardIcons/Dashboard.svg";
import ServiceIcon from "../../assets/dashboardIcons/MyServices.svg";
import CalculatorIcon from "../../assets/dashboardIcons/PriceCalculator.svg";
import ServiceRequest from "../../assets/dashboardIcons/ServiceRequest.svg";
import ProfileIcon from "../../assets/dashboardIcons/Profile.svg";
import LogoutIcon from "../../assets/dashboardIcons/Logout.svg";

const toTitleCase = (value) =>
  value
    .toLowerCase()
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const api = useAxios();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        const response = await api.get("/profile", {
          headers: { "Cache-Control": "no-cache" },
        });

        if (!mounted) {
          return;
        }

        setProfile(response?.data?.data ?? null);
      } catch {
        if (!mounted) {
          return;
        }

        setProfile(null);
      }
    };

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [api]);

  const displayName = useMemo(() => {
    const name = profile?.fullName || profile?.name;
    if (name && typeof name === "string" && name.trim()) {
      return toTitleCase(name);
    }

    const email = profile?.email;
    if (email && typeof email === "string") {
      return toTitleCase(email.split("@")[0]);
    }

    return "Profile";
  }, [profile]);

  const displayEmail = useMemo(() => {
    const email = profile?.email;
    if (email && typeof email === "string" && email.trim()) {
      return email.trim();
    }

    return "profile@cloudbridge.com";
  }, [profile]);

  const displayInitial = useMemo(() => {
    const firstChar = displayName?.[0] ?? "P";
    return firstChar.toUpperCase();
  }, [displayName]);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: DashboardIcon },
    { name: "Service Request", path: "/service-request", icon: ServiceRequest },
    { name: "Price Calculator", path: "/price-calculator", icon: CalculatorIcon},
    { name: "My Services", path: "/services", icon: ServiceIcon },
    { name: "Profile", path: "/profile", icon: ProfileIcon },
  ];

  const handleLogout = () => {
    signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className=" w-66.8 h-screen flex flex-col bg-white border-r border-[#E2E8F0]">
      
      {/* ================= LOGO CONTAINER ================= */}
      <div className="flex flex-col w-63.75 h-23.25 px-6 pt-6 pb-px border-b border-[#E2E8F0]">
        <Link to="#" className="flex h-11 items-center gap-3 w-full">
          <div className="flex w-10 h-10 px-2.5 justify-center items-center rounded-lg bg-[#0B78C1] shadow-[0_10px_15px_-3px_rgba(43,127,255,0.2),0_4px_6px_-4px_rgba(43,127,255,0.2)]">
            <img src={LogoIcon} alt="logo" className="w-5 h-5" />
          </div>

          <div className="flex flex-col justify-center items-start h-11">
            <h1 className="font-dm-sans text-[18px] font-semibold text-[#0F172B] leading-7">
              CloudBridge
            </h1>
            <p className="font-jetbrains-mono text-xs text-[#64748B]">v2.0.1</p> {/*this is added in sidebar */}
          </div>
        </Link>
      </div>

      {/* ================= NAVIGATION ================= */}
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
      
        <div className="border-t border-[#E5E8ED] px-4 py-4">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 text-left transition"
          >
            <div className="w-9 h-9 rounded-full bg-[#0B78C1] text-white font-semibold text-[13px] leading-none flex items-center justify-center shrink-0">
              {displayInitial}
            </div>

            <div className="min-w-0 flex flex-col">
              <span className="font-WorkSans text-[15px] leading-5 font-semibold text-[#0F172B] truncate">
                {displayName}
              </span>
              <span className="font-WorkSans text-[12px] leading-4 text-[#64748B] truncate">
                {displayEmail}
              </span>
            </div>
          </button>
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

export default Sidebar;

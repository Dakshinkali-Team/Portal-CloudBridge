// src/components/common/Sidebar.jsx

import { Link, useLocation } from "react-router-dom";
import { LogOut, Zap, X } from "lucide-react";

import { adminNavItems }    from "../../../data/adminNav";
import { customerNavItems } from "../../../data/customerNav";

const Sidebar = ({ userType = "customer", onClose }) => {
  const location  = useLocation();
  const menuItems = userType === "admin" ? adminNavItems : customerNavItems;

  return (
    <aside className="h-full w-full flex flex-col bg-white border-r border-[#E2E8F0] select-none overflow-hidden">

      {/* ── Logo ── */}
      <div className="flex items-center justify-between px-6 h-[93px] border-b border-[#E2E8F0] shrink-0">

        <div className="flex items-center gap-3">

          {/* Brand icon — blue gradient matching Figma */}
          <div
            className="w-10 h-10 rounded-[8px] flex items-center justify-center shrink-0 shadow-[0_4px_6px_-4px_rgba(11,120,193,0.3),0_10px_15px_-3px_rgba(11,120,193,0.2)]"
            style={{
              background: "linear-gradient(135deg, #0B78C1 0%, #074D82 100%)",
            }}
          >
            <Zap size={16} strokeWidth={2.5} className="text-white" />
          </div>

          {/* Brand name + version */}
          <div className="flex flex-col gap-0">
            <span className="text-[18px] font-semibold text-[#1E293B] leading-[28px] tracking-tight">
              CloudBridge
            </span>
            <span className="text-[12px] font-normal text-[#64748B] leading-[16px] font-mono">
              v2.8.1
            </span>
          </div>

        </div>

        {/* Mobile close — only on small screens */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors duration-150"
          >
            <X size={16} />
          </button>
        )}

      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 flex flex-col gap-1 px-4 py-4 overflow-y-auto">

        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              className={[
                "flex items-center gap-3",
                "h-12 px-4 rounded-[8px]",
                "transition-colors duration-150 outline-none",
                "focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1",
                isActive
                  ? "bg-[#EFF6FF] text-[#0B78C1]"
                  : "text-[#45556C] hover:bg-[#F8FAFC] hover:text-[#1E293B]",
              ].join(" ")}
            >

              {/* Icon */}
              <item.icon
                size={18}
                strokeWidth={isActive ? 2.5 : 1.8}
                className="shrink-0"
                aria-hidden="true"
              />

              {/* Label */}
              <span
                className={[
                  "text-[15px] leading-6 tracking-normal",
                  isActive ? "font-semibold text-[#0B78C1]" : "font-normal text-[#45556C]",
                ].join(" ")}
              >
                {item.label}
              </span>

            </Link>
          );
        })}

      </nav>

      {/* ── Logout ── */}
      <div className="px-4 py-4 border-t border-[#E2E8F0] shrink-0">
        <button
          aria-label="Log out"
          className="
            w-full h-12 px-4
            flex items-center gap-3
            rounded-[8px]
            text-[#45556C]
            hover:bg-red-50
            hover:text-red-600
            transition-colors duration-150
            outline-none
            focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1
          "
        >
          <LogOut size={18} strokeWidth={1.8} className="shrink-0" aria-hidden="true" />
          <span className="text-[15px] font-normal leading-6">Logout</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;

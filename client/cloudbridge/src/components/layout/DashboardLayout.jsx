// src/layouts/DashboardLayout.jsx

import { useState } from "react";
import Sidebar from "../../components/common/dashboard/Sidebar";
import { Menu } from "lucide-react";

const DashboardLayout = ({ children, userType = "customer" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    /*
      Root bg is white — matches the sidebar so sub-pixel rendering
      never exposes a gap between the sidebar and its container.
    */
    <div className="flex h-screen w-screen overflow-hidden bg-white">

      {/* ── DESKTOP SIDEBAR ─────────────────────────────────────────
          Plain flex flow — no fixed/absolute positioning.
          This guarantees zero left gap on all screen sizes.
      ──────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex w-[220px] shrink-0">
        <Sidebar userType={userType} />
      </div>

      {/* ── MOBILE SIDEBAR ──────────────────────────────────────────
          Separate fixed overlay — only active on small screens.
      ──────────────────────────────────────────────────────────── */}

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={[
          "fixed inset-y-0 left-0 z-50 w-[220px] lg:hidden",
          "transform transition-transform duration-200 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <Sidebar userType={userType} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* ── MAIN CONTENT AREA ───────────────────────────────────────
          flex-1 + min-w-0 fills all remaining horizontal space.
          bg-[#F0F2F5] gives the content area its own page bg.
      ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-[#F0F2F5]">

        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center gap-3 h-14 px-4 bg-white border-b border-slate-200 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors duration-150"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
          <span className="text-[15px] font-bold text-slate-900">
            CloudBridge
          </span>
        </header>

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full min-h-full p-6 sm:p-8">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;

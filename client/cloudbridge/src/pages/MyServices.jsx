import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import MyServicesSection from "./MyServicePage/MyServicesSection";

export default function MyServices() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#FDFDFD] overflow-hidden">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 overflow-y-auto p-8">
        <header className="lg:hidden flex items-center gap-3 h-14 px-4 -mx-8 -mt-8 mb-6 bg-white border-b border-slate-200">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
          <span className="text-[15px] font-semibold text-[#0F172B]">CloudBridge</span>
        </header>

        <div className="w-full max-w-9xl">
          <header className="mb-4">
            <h1 className="text-[28px] font-bold text-[#0F172A] tracking-tight">
              My Services
            </h1>
            <p className="text-slate-500 text-base mt-1">
              View and manage your cloud services
            </p>
          </header>

          {/* This executes your reusable section logic */}
          <MyServicesSection />
        </div>
      </main>
    </div>
  );
}

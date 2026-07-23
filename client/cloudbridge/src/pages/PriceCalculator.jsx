import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import PriceCalculatorPage from "./price-calculator/PriceCalculatorPage";

export default function PriceCalculator() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
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

        <PriceCalculatorPage />
      </main>
    </div>
  );
}
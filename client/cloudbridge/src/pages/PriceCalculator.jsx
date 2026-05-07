import Sidebar from "../components/layout/Sidebar";
import PriceCalculatorPage from "./price-calculator/PriceCalculatorPage";

export default function PriceCalculator() {
  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <PriceCalculatorPage />
      </main>
    </div>
  );
}
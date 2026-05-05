import Sidebar from "../components/layout/Sidebar";
import PriceCalculatorPage from "./price-calculator/PriceCalculatorPage";

export default function PriceCalculator() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Price Calculator Page */}
      <PriceCalculatorPage />
      
    </div>
  );
}
import Sidebar from "../components/layout/Sidebar";
import DashboardPage from "./customer_dashboard/DashboardPage";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard Page */}
      <DashboardPage />

    </div>
  );
}
import Sidebar from "../components/layout/Sidebar";
import DashboardPage from "./customer_dashboard/DashboardPage";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard Page */}
      <DashboardPage />
      
    </div>
  );
}
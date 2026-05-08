import Sidebar from "../components/layout/Sidebar";
import DashboardPage from "./customer_dashboard/DashboardPage";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
         {/* Dashboard Page */}
      <DashboardPage />
      </main> 
    </div>
  );
}
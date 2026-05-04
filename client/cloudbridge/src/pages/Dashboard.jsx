import Sidebar from "../components/layout/Sidebar";
import DashboardPage from "./customer_dashboard/DashboardPage";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard Page */}
      <DashboardPage />

      {/* Page Content */}
      <div className="flex-1 ml-[255px] p-6">
        <Outlet />
      </div>

    </div>
  );
}
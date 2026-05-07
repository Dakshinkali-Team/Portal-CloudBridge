import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminDashboardLayout = () => {
  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">

      {/* Sidebar */}
      <div className="w-[256px] flex-shrink-0 bg-white border-r border-[#E5E8ED]">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 flex flex-col gap-8">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminDashboardLayout;
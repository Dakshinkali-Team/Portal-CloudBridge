import { Outlet } from "react-router-dom";
import AdminSidebar from "../layout/AdminSidebar.jsx";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <AdminSidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;






// import { Outlet } from "react-router-dom";
// import Sidebar from "../layout/Sidebar.jsx";

// const DashboardLayout = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-100">

//       {/* Sidebar — fixed width */}
//       <Sidebar />

//       {/* Main content — takes remaining width, no overflow */}
//       <div className="flex-1 min-w-0">
//         <Outlet />
//       </div>

//     </div>
//   );
// };

// export default DashboardLayout;
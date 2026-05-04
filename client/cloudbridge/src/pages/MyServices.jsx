// // import Sidebar from "../components/layout/Sidebar"
// // import MyServicesSection from "./MyServicePage/MyServicesSection";
// // export default function MyServices() {
// //   return (
// //     <div className="relative min-h-screen bg-gray-100">
      
// //       <Sidebar />   
// //       <MyServicesSection />

// //       </div>
// //   )
// // }; 
// import Sidebar from "../components/layout/Sidebar";
// import MyServicesSection from "./MyServicePage/MyServicesSection";

// export default function MyServices() {
//   return (
//     <div className="flex min-h-screen bg-[#F8FAFC]">
//       {/* Sidebar - Fixed width */}
//       <Sidebar />

//       {/* Main Content Area - Flexible width */}
//       <main className="flex-1 overflow-y-auto">
//         <div className="p-8 max-w-7xl mx-auto">
//           <header className="mb-10">
//             <h1 className="text-2xl font-bold text-slate-900">My Services</h1>
//             <p className="text-slate-500 mt-1">View and manage your cloud services</p>
//           </header>

//           <MyServicesSection />
//         </div>
//       </main>
//     </div>
//   );
// }


import Sidebar from "../components/layout/Sidebar";
import MyServicesSection from "./MyServicePage/MyServicesSection";

export default function MyServices() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Changed p-8 to pt-10 px-12 to align with sidebar top */}
        {/* <div className="pt-10 px-12 max-w-7xl mx-auto"> */}
        <div className="pt-10 pl-2 pr-6">
          <header className="mb-6 pl-3.5"> {/* Reduced margin from 10 to 6 */}
            <h1 className="text-2xl font-bold text-slate-900">My Services</h1>
            <p className="text-slate-500 mt-1">View and manage your cloud services</p>
          </header>

          <MyServicesSection />
        </div>
      </main>
    </div>
  );
}
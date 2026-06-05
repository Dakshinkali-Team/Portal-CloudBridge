import Sidebar from "../components/layout/Sidebar";
import MyServicesSection from "./MyServicePage/MyServicesSection";

export default function MyServices() {
  return (
    <div className="flex h-screen bg-[#FDFDFD] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="w-full max-w-9xl">
          <header className="mb-2">
            <h1 className="text-[28px] font-bold text-[#0F172A] tracking-tight">
              My Services
            </h1>
            <p className="text-slate-500 text-base mt-1">
              View and manage your cloud services
            </p>
          </header>

          {/* This executes your reusable section logic */}
          <MyServicesSection />
        </div>
      </main>
    </div>
  );
}

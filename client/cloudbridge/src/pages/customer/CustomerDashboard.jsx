// src/pages/customer/CustomerDashboard.jsx
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/common/dashboard/StatCard";
import SectionCard from "../../components/common/dashboard/SectionCard";
import { Server, Clock, CheckCircle, FilePlus, Calculator } from "lucide-react";

const CustomerDashboard = () => {
  return (
    <DashboardLayout userType="customer">
      <div style={{ fontFamily: "'Inter', sans-serif" }} className="w-full flex flex-col gap-8">
        
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-[30px] font-bold text-[#0F172A] tracking-tight">Dashboard</h1>
          <p className="text-[16px] text-[#64748B]">Welcome back! Here's an overview of your services.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Active Services" value="3" icon={Server} iconBg="#EFF6FF" iconColor="#2563EB" trend="+4%" trendType="up" />
          <StatCard title="Pending Requests" value="2" icon={Clock} iconBg="#FFF7ED" iconColor="#EA580C" trend="+1%" trendType="up" />
          <StatCard title="Completed" value="12" icon={CheckCircle} iconBg="#F0FDF4" iconColor="#16A34A" trend="+18%" trendType="up" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions - Corrected Icon for New Service Request */}
          <SectionCard title="Quick Actions">
            <div className="space-y-4">
              <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-all group text-left">
                {/* FilePlus Icon used to match the 'Request' nature */}
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <FilePlus size={20} className="text-blue-500 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#1E293B]">New Service Request</p>
                  <p className="text-[12px] text-[#64748B]">Configure and request cloud services</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-all group text-left">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                  <Calculator size={20} className="text-slate-500 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#1E293B]">Price Calculator</p>
                  <p className="text-[12px] text-[#64748B]">Estimate costs before requesting</p>
                </div>
              </button>
            </div>
          </SectionCard>

          {/* Recent Activity */}
          <SectionCard title="Recent Activity">
            <div className="space-y-6">
              {[
                { title: "Service deployed", desc: "Database Cluster", time: "2 hours ago", color: "bg-emerald-500" },
                { title: "Quote generated", desc: "Web Server", time: "5 hours ago", color: "bg-orange-500" },
                { title: "Request approved", desc: "Storage Bucket", time: "1 day ago", color: "bg-emerald-500" },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${activity.color}`} />
                  <div className="flex flex-col">
                    <p className="text-[14px] font-semibold text-[#1E293B]">{activity.title}</p>
                    <p className="text-[13px] text-[#64748B]">{activity.desc}</p>
                    <p className="text-[12px] text-[#94A3B8] mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Support Banner */}
        <div className="bg-[#0B78C1] rounded-2xl p-8 flex flex-col items-start gap-6">
          <div className="text-white space-y-2">
            <h2 className="text-[24px] font-bold">Need Help?</h2>
            <p className="text-blue-50 opacity-90 text-[16px] max-w-2xl">
              Our support team is here to assist you with any questions about your cloud services.
            </p>
          </div>
          <button className="bg-white text-[#0B78C1] px-6 py-2.5 rounded-xl font-bold hover:bg-blue-50 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
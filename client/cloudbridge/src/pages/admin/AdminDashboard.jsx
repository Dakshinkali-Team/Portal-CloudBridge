// src/pages/admin/AdminDashboard.jsx
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/common/dashboard/StatCard";
import SectionCard from "../../components/common/dashboard/SectionCard";
import Status from "../../components/common/dashboard/Status";
import ProgressBar from "../../components/common/dashboard/ProgressBar";
import { Users, Server, FileText, Activity, AlertCircle, Info, CheckCircle2 } from "lucide-react";

const AdminDashboard = () => {
  return (
    <DashboardLayout userType="admin">
      <div style={{ fontFamily: "'Inter', sans-serif" }} className="w-full flex flex-col gap-8">
        <header className="space-y-1">
          <h1 className="text-[30px] font-bold text-[#0F172A] tracking-tight">Admin Dashboard</h1>
          <p className="text-[16px] font-normal text-[#64748B]">System overview and management</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard title="Total Users" value="1,247" icon={Users} trend="+12%" trendType="up" iconBg="#EFF6FF" iconColor="#2563EB" />
          <StatCard title="Active Services" value="432" icon={Server} trend="+8%" trendType="up" iconBg="#F0FDF4" iconColor="#16A34A" />
          <StatCard title="Pending Requests" value="28" icon={FileText} trend="-15%" trendType="down" iconBg="#FFF7ED" iconColor="#EA580C" />
          <StatCard title="System Health" value="99.9%" icon={Activity} trend="Stable" trendType="up" iconBg="#F0FDF4" iconColor="#059669" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
          <SectionCard title="Recent Service Requests">
            <div className="flex flex-col gap-4">
              {[
                { company: "Acme Corp", service: "Database Cluster", time: "2 hours ago", status: "Pending" },
                { company: "TechStart Inc", service: "Web Server", time: "4 hours ago", status: "Approved" },
                { company: "Cloud Solutions", service: "Storage 1TB", time: "6 hours ago", status: "Pending" },
                { company: "Data Systems", service: "Load Balancer", time: "1 day ago", status: "Deployed" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-[#F1F5F9] bg-white">
                  <div className="flex flex-col">
                    <h3 className="text-[14px] font-semibold text-[#1E293B]">{item.company}</h3>
                    <p className="text-[13px] text-[#64748B]">{item.service}</p>
                    <p className="text-[12px] text-[#94A3B8] mt-1">{item.time}</p>
                  </div>
                  <Status status={item.status} />
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="System Alerts">
            <div className="flex flex-col gap-3">
              {[
                { title: "High CPU usage on server-prod-04", time: "15 min ago", icon: AlertCircle, color: "text-orange-500" },
                { title: "Scheduled maintenance on 2026-04-20", time: "1 hour ago", icon: Info, color: "text-blue-500" },
                { title: "Backup completed successfully", time: "2 hours ago", icon: CheckCircle2, color: "text-emerald-500" },
              ].map((alert, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl border border-[#F1F5F9] bg-white">
                  <alert.icon className={`mt-0.5 shrink-0 ${alert.color}`} size={18} />
                  <div className="flex flex-col">
                    <h3 className="text-[14px] font-medium text-[#1E293B] leading-tight">{alert.title}</h3>
                    <p className="text-[12px] text-[#94A3B8] mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Resource Utilization">
          <div className="flex flex-col gap-8 py-2">
            <ProgressBar label="CPU Usage" value={67} color="bg-blue-500" />
            <ProgressBar label="Memory Usage" value={82} color="bg-orange-500" />
            <ProgressBar label="Storage Usage" value={45} color="bg-green-500" />
            <ProgressBar label="Network Bandwidth" value={54} color="bg-sky-500" />
          </div>
        </SectionCard>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
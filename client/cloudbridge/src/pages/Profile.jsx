import React from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Calculator, 
  Server, 
  User, 
  Mail, 
  Building2, 
  Calendar,
  LogOut,
  Cloud
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
    active ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'
  }`}>
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </div>
);

const InputField = ({ label, placeholder, icon: Icon }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">
      {label}
    </label>
    <div className="flex items-center gap-3 px-4 py-3 bg-[#F8FAFC] border border-slate-100 rounded-xl focus-within:border-blue-200 transition-all">
      <Icon size={18} className="text-slate-400" />
      <input 
        type="text"
        placeholder={placeholder}
        className="bg-transparent w-full text-sm outline-none text-slate-700 placeholder:text-slate-400"
      />
    </div>
  </div>
);

const SecurityRow = ({ label }) => (
  <button className="w-full flex items-center px-4 py-4 bg-[#F8FAFC] border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
    <span className="text-sm font-medium text-slate-600">{label}</span>
  </button>
);

const ProfilePage = () => {
  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-100 flex flex-col p-6 gap-8">
        <div className="flex items-center gap-3 p-3 bg-[#0077b6] text-white rounded-xl shadow-lg shadow-blue-100">
          <div className="p-1.5 bg-white/20 rounded-lg">
            <Cloud size={24} fill="white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none">CloudBridge</h1>
            <span className="text-[10px] opacity-80">v2.0.1</span>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem icon={ClipboardList} label="Service Request" />
          <SidebarItem icon={Calculator} label="Price Calculator" />
          <SidebarItem icon={Server} label="My Services" />
          <SidebarItem icon={User} label="Profile" active />
        </nav>

        <div className="pt-4 border-t border-slate-100">
          <SidebarItem icon={LogOut} label="Logout" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900">My Profile</h2>
          <p className="text-sm text-slate-500 mt-1">Manage your account information</p>
        </header>

        <div className="max-w-[672px] space-y-6">
          {/* Personal Information Card */}
          <section className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-800 mb-2">Personal Information</h3>
            
            <div className="grid grid-cols-1 gap-5">
              <InputField label="Full Name" placeholder="Alena Maharjan" icon={User} />
              <InputField label="Email" placeholder="alena@example.com" icon={Mail} />
              <InputField label="Company" placeholder="Dakshinkali-Team" icon={Building2} />
              <InputField label="Member Since" placeholder="April 15, 2026" icon={Calendar} />
            </div>
          </section>

          {/* Security Settings Card */}
          <section className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-800 mb-2">Security Settings</h3>
            <div className="space-y-3">
              <SecurityRow label="Change Password" />
              <SecurityRow label="Enable Two-Factor Authentication" />
            </div>
          </section>

          {/* Form Actions */}
          <div className="flex items-center gap-4 pt-4">
            <button className="px-16 py-3.5 bg-[#0077b6] text-white font-bold rounded-xl shadow-xl shadow-blue-100 hover:bg-[#005f91] transition-all">
              Save Changes
            </button>
            <button className="px-10 py-3.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all">
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
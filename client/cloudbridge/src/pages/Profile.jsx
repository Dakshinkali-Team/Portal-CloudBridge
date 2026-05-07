import React from 'react';
import { User, Mail, Building2, Calendar } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import ProfileInput from '../components/profile/ProfileInput';

const SecurityRow = ({ label }) => (
  <button className="w-full flex items-center px-4 py-3.5 bg-[#F8FAFC] border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
    <span className="text-[13px] font-medium text-slate-600">{label}</span>
  </button>
);

const ProfilePage = () => { 
  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto p-8 bg-slate-50/50">
        <header className="mb-6 max-w-[700px]">
          <h2 className="text-2xl font-bold text-slate-900">My Profile</h2>
          <p className="text-sm text-slate-500">Manage your account information</p>
        </header>

        <div className="max-w-[700px] space-y-5 pb-8">

          {/* Personal Info */}
          <section className="p-6 bg-white border border-slate-200/60 rounded-xl shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-800">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <ProfileInput label="Full Name" placeholder="Alena Maharjan" icon={User} />
              <ProfileInput label="Email" placeholder="alena@example.com" icon={Mail} />
              <ProfileInput label="Company" placeholder="Dakshinkali-Team" icon={Building2} />
              <ProfileInput label="Member Since" placeholder="April 15, 2026" icon={Calendar} />
            </div>
          </section>

          {/* Security */}
          <section className="p-6 bg-white border border-slate-200/60 rounded-xl shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-800">
              Security Settings
            </h3>

            <div className="space-y-2">
              <SecurityRow label="Change Password" />
              <SecurityRow label="Enable Two-Factor Authentication" />
            </div>
          </section>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button className="flex-1 py-3 bg-[#0077b6] text-white font-bold rounded-lg shadow-md hover:bg-[#005f91] transition-all text-sm">
              Save Changes
            </button>

            <button className="px-8 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition-all text-sm">
              Cancel
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
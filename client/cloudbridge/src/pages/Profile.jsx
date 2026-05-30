import React, { useEffect, useState } from 'react';
import { User, Mail, Building2, Calendar } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import ProfileInput from '../components/profile/ProfileInput';
import { useAuth } from '../context/AuthContext';
import http from '../utils/http';

const SecurityRow = ({ label }) => (
  <button className="w-full flex items-center px-4 py-3.5 bg-[#F8FAFC] border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
    <span className="text-[13px] font-medium text-slate-600">{label}</span>
  </button>
);

const ProfilePage = ({ nested = false }) => {
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    let isMounted = true;

    const fetchProfile = async () => {
      if (!isMounted) return;
      setLoading(true);

      try {
        // add no-cache header to avoid 304 Not Modified responses
        let res = await http.get('/profile', { headers: { 'Cache-Control': 'no-cache' } });

        // If server responds with 304 (Not Modified) and no body, force a cache-busting request
        if (res.status === 304 || !res.data) {
          res = await http.get(`/profile?ts=${Date.now()}`, { headers: { 'Cache-Control': 'no-cache' } });
        }

        if (!isMounted) return;
        setData(res.data?.data || null);
      } catch (err) {
        if (!isMounted) return;
        console.error('Failed to fetch profile', err);
        setError('Unable to load profile');
      } finally {
        if (!isMounted);
        setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  const formatDate = (iso) => {
    if (!iso) return '';
    try {
      const dt = new Date(iso);
      return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(dt);
    } catch {
      return iso;
    }
  };

  const fullName = data?.fullName || data?.name || (data?.email ? data.email.split('@')[0] : '');

  const accountType = data?.accountType || 'INDIVIDUAL';
  const company = accountType === 'COMPANY' ? data?.company?.name || '' : '';

  const memberSince = formatDate(data?.createdAt);

  const pageContent = (
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
              {error && (
                <div className="text-sm text-red-600">{error}</div>
              )}
              <ProfileInput label="Full Name" placeholder="Full name" icon={User} value={fullName} loading={loading} />
              <ProfileInput label="Email" placeholder="Email" icon={Mail} value={data?.email} loading={loading} />
              {accountType === 'COMPANY' && (
                <ProfileInput label="Company" placeholder="Company" icon={Building2} value={company || 'Not provided'} loading={loading} />
              )}
              <ProfileInput label="Member Since" placeholder="Member since" icon={Calendar} value={memberSince} loading={loading} />
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

          {/* Buttons
          <div className="flex items-center gap-3 pt-2">
            <button className="flex-1 py-3 bg-[#0077b6] text-white font-bold rounded-lg shadow-md hover:bg-[#005f91] transition-all text-sm">
              Save Changes
            </button>

            <button className="px-8 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition-all text-sm">
              Cancel
            </button>
          </div> */}

        </div>
      </main>
  );

  return nested ? pageContent : (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      <Sidebar />
      {pageContent}
    </div>
  );
};

export default ProfilePage;
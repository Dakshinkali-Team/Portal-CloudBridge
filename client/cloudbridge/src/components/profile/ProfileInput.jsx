import React, { useState } from 'react';
import { User, Mail, Building2, Calendar } from 'lucide-react';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullName: "Alena Maharjan",
    email: "alena@example.com",
    company: "Dakshinkali-Team",
    memberSince: "April 15, 2026"
  });

  // ✅ Stable input handler
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setProfileData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    console.log("Data saved for Dakshinkali-Team:", profileData);
  };

  return (
    <div className="w-full min-h-screen bg-white font-work-sans">
      <div className="max-w-[1537px] mx-auto px-10 py-8">

        <div className="mb-10">
          <h1 className="font-dm-sans font-bold text-[30px] text-[#0F172B]">
            My Profile
          </h1>
          <p className="text-[16px] text-[#45556C] mt-1">
            Manage your account information
          </p>
        </div>

        <div className="max-w-[672px] space-y-6">

          {/* Personal Info */}
          <section className="bg-white border border-[#E2E8F0] rounded-[12px] p-[25px] shadow-sm">
            <h2 className="font-dm-sans font-semibold text-[20px] text-[#0F172B] mb-6">
              Personal Information
            </h2>

            <div className="space-y-4">

              {/* Full Name */}
              <div className="space-y-2">
                <label className="font-work-sans font-medium text-[14px] text-[#314158] ">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center text-[#94A3B8]">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName || ""}
                    onChange={handleInputChange}
                    className="w-full h-[50px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-12 pr-4"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="font-work-sans font-medium text-[14px] text-[#314158] ">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center text-[#94A3B8]">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email || ""}
                    onChange={handleInputChange}
                    className="w-full h-[50px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-12 pr-4"
                  />
                </div>
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label className="font-work-sans font-medium text-[14px] text-[#314158] ">Company</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center text-[#94A3B8]">
                    <Building2 size={20} />
                  </div>
                  <input
                    type="text"
                    name="company"
                    value={profileData.company || ""}
                    onChange={handleInputChange}
                    className="w-full h-[50px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-12 pr-4"
                  />
                </div>
              </div>

              {/* Member Since */}
              <div className="space-y-2">
                <label className="font-work-sans font-medium text-[14px] text-[#314158] ">Member Since</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center text-[#94A3B8]">
                    <Calendar size={20} />
                  </div>
                  <input
                    type="text"
                    name="memberSince"
                    value={profileData.memberSince || ""}
                    onChange={handleInputChange}
                    className="w-full h-[50px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-12 pr-4"
                  />
                </div>
              </div>

            </div>
          </section>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onSave}
              className="flex-1 h-[52px] bg-[#0077b6] text-white rounded-lg"
            >
              Save Changes
            </button>

            <button
              type="button"
              className="px-8 h-[52px] bg-[#F1F5F9] rounded-lg"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
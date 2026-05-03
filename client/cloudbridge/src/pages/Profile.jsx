import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { User, Mail, Building, Calendar } from "lucide-react";

export default function Profile() {
  // Form data handle garna state use gareko
  const [formData, setFormData] = useState({
    fullName: "Alena Maharjan",
    email: "alena@example.com",
    company: "Dakshinkali-Team",
    memberSince: "April 15, 2026"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("Saving Data:", formData);
    alert("Changes saved successfully!");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar fixed side ma bascha */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-500 mt-1">Manage your account information</p>
          </div>

          {/* Personal Information Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 mb-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Personal Information</h2>
            
            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 w-5 h-5 transition-colors" />
                  <input 
                    name="fullName"
                    type="text" 
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 w-5 h-5 transition-colors" />
                  <input 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@company.com"
                    className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Company</label>
                <div className="relative group">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 w-5 h-5 transition-colors" />
                  <input 
                    name="company"
                    type="text" 
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Member Since (Read-only logic usually) */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Member Since</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    value={formData.memberSince}
                    readOnly
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-gray-500 cursor-not-allowed outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 mb-8 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Security Settings</h2>
            <div className="space-y-3">
              <button className="w-full text-left bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 font-medium py-4 px-6 rounded-lg transition-all border border-transparent hover:border-blue-100">
                Change Password
              </button>
              <button className="w-full text-left bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 font-medium py-4 px-6 rounded-lg transition-all border border-transparent hover:border-blue-100">
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button 
              onClick={handleSave}
              className="bg-[#0070BA] hover:bg-[#005ea6] text-white font-semibold py-3 px-12 rounded-lg transition shadow-md sm:flex-none"
            >
              Save Changes
            </button>
            <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-600 font-semibold py-3 px-8 rounded-lg transition sm:flex-none">
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
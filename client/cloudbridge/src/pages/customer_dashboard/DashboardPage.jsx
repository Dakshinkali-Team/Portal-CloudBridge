import React, { useEffect, useState } from "react";
import StatusCardSection from "./StatusCardSection";
import ActionSection from "./ActionSection";
import SupportBanner from "../../components/sections/SupportBanner";
import useAxios from "../../hooks/useAxios";

const DashboardPage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const apiCall = useAxios();

  useEffect(() => {
    const fetchUserProfile = async () => {  
      const myProfile = await apiCall.get("/profile");
      setUserProfile(myProfile.data);
    };

    fetchUserProfile();
  }, []);
  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] p-8 flex flex-col gap-8">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[30px] leading-[36px] font-bold text-[#0F172B] font-inter">
          Dashboard
        </h1>

        <p className="text-[16px] leading-[24px] font-normal text-[#45556C] font-inter">
          Welcome back! Here's an overview of your services.
        </p>
      </div>

        {
          userProfile && (
            <>
              <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
                <div className="flex items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{userProfile?.data.name}</p>
                    <p className="text-xs text-gray-500">{userProfile?.data.email}</p>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{userProfile?.data.role}</p>
                  </div>
                </div>  
              </div>
            </>
          )
        }

      {/* ================= STATUS CARDS ================= */}
      <StatusCardSection />

      {/* ================= ACTION SECTION ================= */}
      <ActionSection />

      {/* ================= SUPPORT BANNER ================= */}
      <SupportBanner />

    </div>
  );
};

export default DashboardPage;
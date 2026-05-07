import React from "react";
import { useNavigate } from "react-router-dom";
import GridBackground from "../../../components/common/GridBackground";

const CheckEmail = () => {
  const navigate = useNavigate();

  return (
    // Main Wrapper
    <div className="relative flex min-h-screen w-full items-center justify-center bg-white overflow-hidden px-8">
      <GridBackground />

      {/* Main Container */}
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center">
        
        {/* Content Box: max-w 360px (max-w-90) */}
        <div className="flex w-full max-w-90 flex-col gap-8">
          
          {/* Header Section: gap-6 (24px) between icon and text */}
          <div className="flex flex-col items-center gap-6 w-full">
            
            {/* Icon Box: 56x56px, rounded-xl (12px), background color */}
            <div className="flex w-14 h-14 items-center justify-center rounded-xl bg-[#E1F2FB] shadow-sm">
              <svg 
                className="w-6 h-6 text-[#1570EF]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Title + Subtitle container */}
            <div className="flex flex-col items-center text-center w-full gap-3">
              <h1 className="w-90 h-9.5 text-[30px] leading-9.5 font-semibold text-[#181D27] tracking-[0%]">
                Check your email
              </h1>
              <p className="w-90 text-[16px] leading-6 font-normal text-[#535862] tracking-[0%]">
                We've sent a password reset link to your email address. Click the link in the email to reset your password.
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex flex-col w-full gap-3">
            
            <div className="flex items-start justify-center bg-[#F0F8FD] border border-[#C9E8F9] rounded-lg w-90 h-19.5 pt-4.25 pb-px px-4.25 mx-auto">
          
              <p className=" font-normal text-[14px] leading-5 tracking-normal text-[#053D68] text-center">
                Didn't receive the email? Check your spam folder or{" "}
                <button 
                  type="button" 
                  onClick={() => console.log("Resend email triggered")} 
                  className=" text-blue-600 font-semibold text-[14px] leading-5 hover:underline transition-all"
                >
                  try again
                </button>
              </p>
            </div>

            {/* Back to Login Button */}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex w-full h-11 items-center justify-center gap-1.5 bg-transparent rounded-lg px-4 py-2.5 text-sm font-semibold text-[#535862] hover:bg-gray-50 hover:text-[#181D27] transition-all"
            >
              <svg 
                className="w-5 h-5 text-[#535862]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              
              <span className="w-27 h-6 inline-flex items-center justify-center tracking-[0%]">
                Back to log in
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
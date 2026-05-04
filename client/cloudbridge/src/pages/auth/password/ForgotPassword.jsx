import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import GridBackground from "../../../components/common/GridBackground";
import Logo from "../../../assets/Icon.svg";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    // Main Wrapper
    <div className="relative flex min-h-screen w-full items-center justify-center bg-white overflow-hidden px-8">
      <GridBackground />

      {/* Main Container */}
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center">
        
        {/* Content Box: max-w 360px */}
        <div className="flex w-full max-w-90 flex-col gap-8">
          
          <div className="flex flex-col items-center gap-6 w-full">
            
           <div className="flex w-10 h-10 items-center justify-center rounded-lg bg-linear-to-br from-[#0B78C1] to-[#074D82] px-2.5 shadow-[0px_4px_6px_-4px_rgba(11,120,193,0.2),0px_10px_15px_-3px_rgba(11,120,193,0.2)]">
              <img 
                src={Logo} 
                alt="logo" 
                className="w-[16.67px] h-[11.67px] object-contain"
              />
            </div>

            <div className="flex flex-col items-center text-center w-full gap-3">
              <h1 className="w-90 h-9.5 text-[30px] leading-9.5 font-semibold text-[#181D27] tracking-[0%]">
                Reset your password
              </h1>
              <p className="w-90 h-6 text-[16px] leading-6 font-normal text-[#535862] tracking-[0%]">
                Enter your email and we'll send you a reset link.
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full gap-3">
            
            {/* Email Input Field */}
            <div className="flex flex-col w-full gap-1.5">
              <label className="w-9 h-5 text-[14px] leading-5 font-medium text-[#344054] tracking-[0%]">
                Email
              </label>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full h-11"
              />
            </div>
            
            <Button text="Proceed with reset" />

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex w-full h-11 items-center justify-center gap-1.5 bg-transparent rounded-lg px-4 py-2.5 text-sm font-semibold text-[#535862] hover:bg-gray-50 hover:text-[#181D27] transition-all"
            >
              {/* Arrow-left icon */}
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

export default ForgotPassword;
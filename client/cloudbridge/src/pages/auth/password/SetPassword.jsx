import React from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import GridBackground from "../../../components/common/GridBackground";
import Logo from "../../../assets/Icon.svg";

const SetPassword = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start py-20 bg-white overflow-hidden">
      <GridBackground />

      <div className="relative flex w-full max-w-7xl flex-col items-center px-8">
        <div className="flex w-full max-w-90 flex-col">
          
          <div className="flex flex-col items-center w-full">
            <div className="flex w-10 h-10 items-center justify-center rounded-lg bg-linear-to-br from-[#0B78C1] to-[#074D82] px-2.5 shadow-[0px_4px_6px_-4px_rgba(11,120,193,0.2),0px_10px_15px_-3px_rgba(11,120,193,0.2)] mb-6">
              <img src={Logo} alt="icon" className="w-5 h-5" />
            </div>

            <div className="flex flex-col items-center text-center w-full">
              <h1 className="text-[24px] leading-tight font-semibold text-[#181D27] mb-1">
                Set your password
              </h1>
              <p className="text-[14px] text-[#535862] mb-8">
                Welcome! Create a password to secure your account.
              </p>
            </div>
          </div>

          <form className="flex flex-col w-full">
            <div className="mb-4">
              <Input label="Password" type="password" placeholder="Create a strong password" />
            </div>
            <div className="mb-8">
              <Input label="Confirm Password" type="password" placeholder="Create a strong password" />
            </div>
            
            <Button text="Complete Setup" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
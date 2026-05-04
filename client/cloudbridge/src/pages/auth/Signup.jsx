import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import GridBackground from "../../components/common/GridBackground";
import Logo from "../../assets/Icon.svg";

const Signup = () => {
  const [type, setType] = useState("individual");

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start pt-20 bg-white overflow-hidden">
      <GridBackground />

      <div className="relative flex w-full max-w-7xl flex-col items-center px-8">
        <div className="flex w-full max-w-90 flex-col">
          {/* Header Section */}
          <div className="flex flex-col items-center w-full">
            {/* Logo -> Title (mb-6) */}
            <div className="flex w-10 h-10 items-center justify-center rounded-lg bg-linear-to-br from-[#0B78C1] to-[#074D82] px-2.5 shadow-[0px_4px_6px_-4px_rgba(11,120,193,0.2),0px_10px_15px_-3px_rgba(11,120,193,0.2)] mb-6">
      
              <img src={Logo} alt="logo" className="w-5 h-5" />
            </div>

            {/* Title + Subtitle */}
            <div className="flex flex-col items-center text-center w-full">
              {/* Title -> Subtitle (mb-1) */}
              <h1 className="text-[24px] leading-tight font-semibold text-[#181D27] mb-1">
                Create an account
              </h1>
              {/* Subtitle -> Toggle (mb-8) */}
              <p className="text-[14px] text-[#535862] mb-8">
                Start your private cloud journey today.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex flex-col w-full">
            {/* Account Type Toggle (mb-6) */}
            <div className="flex bg-[#F9FAFB] border border-[#F2F4F7] rounded-lg p-1 mb-6">
              <button
                onClick={() => setType("individual")}
                className={`flex-1 py-1.5 text-sm rounded-md transition-all duration-200 ${
                  type === "individual"
                    ? "bg-white shadow-sm font-semibold text-[#181D27]"
                    : "text-[#535862] hover:text-[#181D27]"
                }`}
              >
                Individual
              </button>

              <button
                onClick={() => setType("company")}
                className={`flex-1 py-1.5 text-sm rounded-md transition-all duration-200 ${
                  type === "company"
                    ? "bg-white shadow-sm font-semibold text-[#181D27]"
                    : "text-[#535862] hover:text-[#181D27]"
                }`}
              >
                Company
              </button>
            </div>

            <form className="flex flex-col w-full">
              {/* Company Field (only shows if type is company) */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  type === "company"
                    ? "max-h-24 opacity-100 mb-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <Input label="Company Name" placeholder="Amalgamated Inc." />
              </div>

              {/* Email -> Password (mb-4) */}
              <div className="mb-4">
                <Input label="Email" placeholder="Enter your email" />
              </div>

              {/* Password -> Buttons (mb-6) */}
              <div className="mb-6">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col">
                {/* Create Account -> Google (mb-3) */}
                <div className="mb-3">
                  <Button text="Create Account" />
                </div>
                {/* Google -> Footer (mb-8) */}
                <div className="mb-8">
                  <Button
                    text="Sign up with Google"
                    variant="google"
                    icon="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Footer Link */}

          <p className="text-center text-sm text-[#535862] mb-12">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

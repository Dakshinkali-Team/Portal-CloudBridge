import { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";
import GridBackground from "../../components/common/GridBackground";
import Logo from "../../assets/Icon.svg";

const Signup = () => {
  const [type, setType] = useState("individual");

  return (
    <div className="relative min-h-screen bg-white">
      {/* Grid Background */}
      <GridBackground />

      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center min-h-screen">
        
        {/* Card */}
        <div className="w-90 p-8 ">

          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{
                background:
                  "linear-gradient(135deg, #0B78C1 0%, #074D82 100%)",
                boxShadow:
                  "0 10px 15px -3px rgba(11,120,193,0.2), 0 4px 6px -4px rgba(11,120,193,0.2)",
              }}
            >
              <img src={Logo} alt="logo" className="w-4 h-3" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-center text-gray-900">
            Create an account
          </h2>
          <p className="text-gray-500 text-sm text-center mt-1 mb-5">
            Start your private cloud journey today
          </p>

          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-5">
            <button
              onClick={() => setType("individual")}
              className={`flex-1 py-1.5 text-sm rounded-md transition ${
                type === "individual"
                  ? "bg-white shadow-sm font-medium"
                  : "text-gray-500"
              }`}
            >
              Individual
            </button>

            <button
              onClick={() => setType("company")}
              className={`flex-1 py-1.5 text-sm rounded-md transition ${
                type === "company"
                  ? "bg-white shadow-sm font-medium"
                  : "text-gray-500"
              }`}
            >
              Company
            </button>
          </div>

          {/* 🔥 Reserved space to prevent layout shift */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              type === "company" ? "h-18 opacity-100 mb-4" : "h-0 opacity-0"
            }`}
          >
            <Input label="Company Name" placeholder="Amalgamated Inc." />
          </div>

          {/* Common Inputs */}
          <Input label="Email" placeholder="Enter your email" />
          <Input label="Password" type="password" placeholder="••••••••" />

          {/* Button */}
          <Button text="Create Account" />

          {/* Google */}
          <Button
            text="Sign in with Google"
            variant="google"
            icon="https://cdn-icons-png.flaticon.com/512/281/281764.png"
          />

          {/* Login link */}
          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;
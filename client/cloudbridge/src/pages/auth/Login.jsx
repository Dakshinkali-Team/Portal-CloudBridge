import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import GridBackground from "../../components/common/GridBackground";
import Logo from "../../assets/Icon.svg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="relative flex min-h-240 flex-col items-center justify-start pt-32 bg-white overflow-hidden">
      
      {/* Background Grid */}
      {/* <GridBackground /> */}

      {/* Main Container */}
      <div className="relative flex w-full max-w-7xl flex-col items-center px-8">
        
        {/* Content */}
        <div className="flex w-full max-w-90 flex-col gap-8">
          
          {/* Header */}
          <div className="flex flex-col items-center gap-6 w-full">
            
            {/* Logo Box */}
            <div className="flex w-10 h-10 items-center justify-center rounded-lg bg-linear-to-br from-[#0B78C1] to-[#074D82] shadow-[0_10px_15px_-3px_rgba(11,120,193,0.2),0_4px_6px_-4px_rgba(11,120,193,0.2)]">
              <img src={Logo} alt="logo" className="w-5 h-5" />
            </div>

            {/* Title + Subtitle */}
            <div className="flex flex-col items-center gap-3 text-center w-full">
              <h1 className="text-[30px] leading-9.5 font-semibold text-[#181D27]">
                Log in to your account
              </h1>
              <p className="text-[16px] leading-6 text-[#535862]">
                Welcome back! Please enter your details.
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5 w-full">
            
            {/* Inputs */}
            <Input label="Email" placeholder="Enter your email" />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
            />

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-blue-600" />
                Remember for 30 days
              </label>

              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password
              </Link>
            </div>

            {/* Buttons */}
            <Button text="Sign in" />

            <Button
              text="Sign in with Google"
              variant="google"
              icon="https://cdn-icons-png.flaticon.com/512/281/281764.png"
            />
          </form>

          {/* Signup */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import GridBackground from "../../components/common/GridBackground";
import Logo from "../../assets/Icon.svg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start pt-20 bg-white overflow-hidden">
      
      <GridBackground />

      <div className="relative flex w-full max-w-7xl flex-col items-center px-8">
        <div className="flex w-full max-w-90 flex-col">
          
          {/* Header Section */}
          <div className="flex flex-col items-center w-full">
            {/* Logo -> Title (Minimized to mb-6) */}
            <div className="flex w-10 h-10 items-center justify-center rounded-lg bg-linear-to-br from-[#0B78C1] to-[#074D82] shadow-sm mb-6">
              <img src={Logo} alt="logo" className="w-5 h-5" />
            </div>

            <div className="flex flex-col items-center text-center w-full">
              {/* Title -> Subtitle (Minimized to mb-1) */}
              <h1 className="text-[24px] leading-tight font-semibold text-[#181D27] mb-1">
                Log in to your account
              </h1>
              {/* Subtitle -> Email (Minimized to mb-8) */}
              <p className="text-[14px] text-[#535862] mb-8">
                Welcome back! Please enter your details.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form className="flex flex-col w-full">
            
            {/* Email -> Password (Minimized to mb-4) */}
            <div className="mb-4">
               <Input label="Email" placeholder="Enter your email" />
            </div>
            
            {/* Password -> Remember (Minimized to mb-6) */}
            <div className="mb-6">
                <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                />
            </div>

            {/* Remember -> Sign In (Minimized to mb-6) */}
            <div className="flex justify-between items-center text-xs mb-6">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-blue-600" />
                Remember for 30 days
              </label>

              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Forgot password
              </Link>
            </div>

            {/* Buttons Section */}
            <div className="flex flex-col">
                {/* Sign In -> Google (Minimized to mb-3) */}
                <div className="mb-3">
                    <Button text="Sign in" />
                </div>

                {/* Google -> Signup Link (Minimized to mb-8) */}
                <div className="mb-8">
                    <Button
                    text="Sign in with Google"
                    variant="google"
                    icon="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                    />
                </div>
            </div>
          </form>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
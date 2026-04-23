import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";
import GridBackground from "../../components/common/GridBackground";
import Logo from "../../assets/Icon.svg";

const Signup = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Grid Background */}
      <GridBackground />

      {/* Card */}
      <div>
        {/* Logo */}
         <div className="flex justify-center items-center mb-4">
                    <div
                      className="flex items-center justify-center w-[40px] h-[40px] rounded-lg"
                      style={{
                        padding: "0 10px",
                        background:
                          "linear-gradient(135deg, #0B78C1 0%, #0B75BC 7.14%, #0A72B8 14.29%, #0A6FB3 21.43%, #0A6BAF 28.57%, #0A68AA 35.71%, #0965A5 42.86%, #0962A1 50%, #095F9C 57.14%, #085C98 64.29%, #085994 71.43%, #08568F 78.57%, #08538B 85.71%, #075086 92.86%, #074D82 100%)",
                        boxShadow:
                          "0 10px 15px -3px rgba(11,120,193,0.2), 0 4px 6px -4px rgba(11,120,193,0.2)",
                      }}
                    >
                      <img src={Logo} alt="logo" className="w-5 h-5" />
                    </div>
                  </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          Create an account
        </h2>
        <p className="text-gray-500 text-sm text-center mt-1 mb-5">
          Start your private cloud journey today
        </p>

        {/* Toggle (Individual / Company) */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-5">
          <button className="flex-1 py-1.5 text-sm font-medium bg-white rounded-md shadow-sm">
            Individual
          </button>
          <button className="flex-1 py-1.5 text-sm text-gray-500">
            Company
          </button>
        </div>

        {/* Inputs */}
        <Input label="Email" placeholder="Enter your email" />
        <Input label="Password" type="password" placeholder="••••••••" />

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center text-sm mb-4">
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="accent-blue-600" />
            Remember for 30 days
          </label>

          <span className="text-blue-600 cursor-pointer hover:underline">
            Forgot password
          </span>
        </div>

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
  );
};

export default Signup;

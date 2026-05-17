import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import GridBackground from "../../components/common/GridBackground";
import Logo from "../../assets/Icon.svg";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!email.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const token = res?.data?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      localStorage.setItem("token", token);

      // =========================
      // SAFE ROLE EXTRACTION
      // =========================
      let role = null;

try {
  const decoded = jwtDecode(token);
  role = decoded?.role || null;
} catch {
  // fallback decode (extra safety)
  try {
    const base64 = token.split(".")[1];
    const payload = JSON.parse(atob(base64));
    role = payload?.role || null;
  } catch (fallbackErr) {
    console.error("Decode failed:", fallbackErr);
  }
}

      if (!role) {
        throw new Error("Role not found in token");
      }

      alert("Login Successful");

      // =========================
      // ROLE BASED NAVIGATION
      // =========================
      if (role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (role === "CUSTOMER") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Login Error:", error);

      alert(
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start pt-20 bg-white overflow-hidden">
      <GridBackground />

      <div className="relative flex w-full max-w-7xl flex-col items-center px-8">
        <div className="flex w-full max-w-90 flex-col">

          {/* Header Section (UNCHANGED) */}
          <div className="flex flex-col items-center w-full">
            <div className="flex w-10 h-10 items-center justify-center rounded-lg bg-linear-to-br from-[#0B78C1] to-[#074D82] px-2.5 shadow-[0px_4px_6px_-4px_rgba(11,120,193,0.2),0px_10px_15px_-3px_rgba(11,120,193,0.2)] mb-6">
              <img src={Logo} alt="logo" className="w-5 h-5" />
            </div>

            <div className="flex flex-col items-center text-center w-full">
              <h1 className="text-[24px] leading-tight font-semibold text-[#181D27] mb-1">
                Log in to your account
              </h1>

              <p className="text-[14px] text-[#535862] mb-8">
                Welcome back! Please enter your details.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form className="flex flex-col w-full" onSubmit={handleLogin}>
            
            <div className="mb-4">
              <Input
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center text-xs mb-6">
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

            <div className="flex flex-col">
              <div className="mb-3">
                <Button text={loading ? "Signing in..." : "Sign in"} />
              </div>

              <div className="mb-6">
                <Button
                  text="Sign in with Google"
                  variant="google"
                  icon="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                />
              </div>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600 mb-8">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
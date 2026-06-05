import { useState } from "react";
// import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import GridBackground from "../../components/common/GridBackground";
import Logo from "../../assets/Icon.svg";
import { API_BASE_URL } from "../../constants.js";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { getDefaultRouteForRole } from "../../utils/auth";
import useAxios from "../../hooks/useAxios.js";
import { validateLoginCredentials } from "../../utils/validation";

const Login = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    // Clear previous errors
    setErrors({});

    // FRONTEND VALIDATION
    const validation = validateLoginCredentials({
      email,
      password,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      const res = await axiosInstance.post(`/auth/login`, {
        email: email.trim(),
        password,
      });

      const token = res?.data?.token;
      const role = res?.data?.role ?? res?.data?.user?.role;

      if (!token) {
        throw new Error("Token not found");
      }

      const session = signIn({ token, role });

      if (!session.role) {
        throw new Error("Role not found in token");
      }

      toast.success(res?.data?.message || "Login successful.");

      const fromLocation = location.state?.from;
      const fromPath = fromLocation?.pathname
        ? `${fromLocation.pathname}${fromLocation.search || ""}${fromLocation.hash || ""}`
        : undefined;

      const safeRedirect =
        fromPath && fromPath !== "/login" && fromPath !== "/signup"
          ? fromPath
          : getDefaultRouteForRole(session.role);

      navigate(safeRedirect, { replace: true });
    } catch (error) {
      console.error("Login Error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden bg-white pt-20">
      <GridBackground />

      <div className="relative flex w-full max-w-7xl flex-col items-center px-8">
        <div className="flex w-full max-w-90 flex-col">
          <div className="flex w-full flex-col items-center">
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-[#0B78C1] to-[#074D82] px-2.5 shadow-[0px_4px_6px_-4px_rgba(11,120,193,0.2),0px_10px_15px_-3px_rgba(11,120,193,0.2)]">
              <img src={Logo} alt="logo" className="h-5 w-5" />
            </div>

            <div className="flex w-full flex-col items-center text-center">
              <h1 className="mb-1 text-[24px] font-semibold leading-tight text-[#181D27]">
                Log in to your account
              </h1>

              <p className="mb-8 text-[14px] text-[#535862]">
                Welcome back! Please enter your details.
              </p>
            </div>
          </div>

          <form className="flex w-full flex-col" onSubmit={handleLogin}>
            <div className="mb-4">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: "" });
                  }
                }}
                error={errors.email}
                required
              />
            </div>

            <div className="mb-6">
              <Input
                label="Password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: "" });
                  }
                }}
                error={errors.password}
                required
              />
            </div>

            <div className="mb-6 flex items-center justify-between text-xs">
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

              {/* <div className="mb-6">
                <Button
                  text="Sign in with Google"
                  variant="google"
                  icon="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                />
              </div> */}
            </div>
          </form>

          <p className="mb-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:underline"
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

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import GridBackground from "../../components/common/GridBackground";
import Logo from "../../assets/Icon.svg";
import http from "../../utils/http.js";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { getDefaultRouteForRole } from "../../utils/auth";
import { validateRegistrationData } from "../../utils/validation";

const Signup = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { toast } = useToast();

  const [type, setType] = useState("individual");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // Clear previous errors
    setErrors({});

    // FRONTEND VALIDATION
    const validation = validateRegistrationData({
      name,
      email,
      password,
      companyName,
      accountType: type,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      password,
      accountType: type === "company" ? "COMPANY" : "INDIVIDUAL", 
      role: "CUSTOMER",
      ...(type === "company" && { companyName: companyName.trim() }),
    };

    try {
      const { data } = await http.post("/auth/register", payload);
      const token = data?.token;
      const role = data?.role ?? data?.user?.role;

      if (!token) {
        throw new Error("Token not found in registration response");
      }

      const session = signIn({ token, role });

      if (!session.role) {
        throw new Error("Role not found in registration response");
      }

      toast.success(data?.message || "Account created successfully.");
      navigate(getDefaultRouteForRole(session.role), { replace: true });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Registration failed. Please try again."
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
                Create an account
              </h1>
              <p className="mb-8 text-[14px] text-[#535862]">
                Start your private cloud journey today.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col">
            <div className="mb-6 flex rounded-lg border border-[#F2F4F7] bg-[#F9FAFB] p-1">
              <button
                type="button"
                onClick={() => {
                  setType("individual");
                  if (errors.companyName) {
                    setErrors({ ...errors, companyName: "" });
                  }
                }}
                className={`flex-1 rounded-md py-1.5 text-sm transition-all duration-200 ${
                  type === "individual"
                    ? "bg-white font-semibold text-[#181D27] shadow-sm"
                    : "text-[#535862] hover:text-[#181D27]"
                }`}
              >
                Individual
              </button>

              <button
                type="button"
                onClick={() => setType("company")}
                className={`flex-1 rounded-md py-1.5 text-sm transition-all duration-200 ${
                  type === "company"
                    ? "bg-white font-semibold text-[#181D27] shadow-sm"
                    : "text-[#535862] hover:text-[#181D27]"
                }`}
              >
                Company
              </button>
            </div>

            <form className="flex w-full flex-col" onSubmit={handleSubmit}>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  type === "company"
                    ? "mb-4 max-h-24 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <Input
                  label="Company Name"
                  placeholder="Amalgamated Inc."
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    if (errors.companyName) {
                      setErrors({ ...errors, companyName: "" });
                    }
                  }}
                  error={type === "company" ? errors.companyName : ""}
                />
              </div>

              <div className="mb-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      setErrors({ ...errors, name: "" });
                    }
                  }}
                  error={errors.name}
                  required
                />
              </div>

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

              <div className="flex flex-col">
                <div className="mb-3">
                  <Button
                    text={loading ? "Creating..." : "Create Account"}
                    disabled={loading}
                  />
                </div>
                {/* <div className="mb-8">
                  <Button
                    text="Sign up with Google"
                    variant="google"
                    icon="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                  />
                </div> */}
              </div>
            </form>
          </div>

          <p className="mb-12 text-center text-sm text-[#535862]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline"
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

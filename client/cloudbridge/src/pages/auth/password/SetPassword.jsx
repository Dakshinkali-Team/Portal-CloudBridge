import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import GridBackground from "../../../components/common/GridBackground";
import Logo from "../../../assets/Icon.svg";
import http from "../../../utils/http";
import { useToast } from "../../../context/ToastContext";
import { validatePassword } from "../../../utils/validation";

const SetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    setErrors({});

    if (!token) {
      setErrors({ token: "Reset token is missing or invalid." });
      toast.error("Reset token is missing or invalid.");
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setErrors({ password: passwordValidation.error });
      return;
    }

    if (!confirmPassword) {
      setErrors({ confirmPassword: "Please confirm your password." });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      return;
    }

    setLoading(true);

    try {
      const { data } = await http.post("/auth/reset-password", {
        token,
        password,
        confirmPassword,
      });

      window.sessionStorage.removeItem("cloudbridge-reset-url");
      window.sessionStorage.removeItem("cloudbridge-reset-email");

      toast.success(data?.message || "Password reset successful");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

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

          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                label="Password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: "" });
                  }
                }}
                error={errors.password}
              />
            </div>
            <div className="mb-8">
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Create a strong password"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  if (errors.confirmPassword) {
                    setErrors({ ...errors, confirmPassword: "" });
                  }
                }}
                error={errors.confirmPassword}
              />
            </div>
            
            <Button text={loading ? "Completing..." : "Complete Setup"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;

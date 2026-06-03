import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Input from "../common/Input";
import http from "../../utils/http";
import { useToast } from "../../context/ToastContext";
import { validatePassword } from "../../utils/validation";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
      setLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    setErrors({});

    if (!currentPassword.trim()) {
      setErrors({ currentPassword: "Current password is required." });
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
      const { data } = await http.put("/auth/change-password", {
        currentPassword,
        password,
        confirmPassword,
      });

      toast.success(data?.message || "Password changed successfully");
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Unable to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Password">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <Input
          label="Current Password"
          type="password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(event) => {
            setCurrentPassword(event.target.value);
            if (errors.currentPassword) {
              setErrors({ ...errors, currentPassword: "" });
            }
          }}
          error={errors.currentPassword}
        />

        <Input
          label="New Password"
          type="password"
          placeholder="Create a new password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            if (errors.password) {
              setErrors({ ...errors, password: "" });
            }
          }}
          error={errors.password}
        />

        <Input
          label="Confirm New Password"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
            if (errors.confirmPassword) {
              setErrors({ ...errors, confirmPassword: "" });
            }
          }}
          error={errors.confirmPassword}
        />

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;

import { useState } from "react";
import toast from "react-hot-toast";
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
} from "@/app/store/api/authApi";

export default function ForgotPasswordModal({ isOpen, onClose, title, type }) {
  const [modalStep, setModalStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [verifyEmail] = useVerifyEmailMutation();

  const [forgotPassword] = useForgotPasswordMutation();
  const [resetPassword] = useResetPasswordMutation();

  const resetForm = () => {
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setModalStep("email");
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsEmailLoading(true);
    try {
      await forgotPassword(email)
        .unwrap()
        .then((res) => {
          if (res?.success) {
            setModalStep("otp");
            toast.success("OTP sent to your email");
          } else {
            toast.error(res?.message || "Failed to send reset link");
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send reset link");
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setIsOtpLoading(true);
    if (type === "verify") {
      const data = {
        email: email,
        otp: otp,
      };
      verifyEmail(data)
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success("OTP verified successfully");
            onClose();
            resetForm();
            router.push("/auth/signin");
          } else {
            toast.error(res?.message || "Failed to verify OTP");
          }
        })
        .finally(() => {
          setIsOtpLoading(false);
        });
    } else {
      setModalStep("password");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsPasswordLoading(true);

    const payload = {
      email: email.trim(),
      token: otp.trim(),
      password: newPassword.trim(),
    };

    try {
      await resetPassword(payload)
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success("Password updated successfully");
            onClose();
            resetForm();
          } else {
            toast.error(res?.message || "Failed to update password");
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update password");
    } finally {
      setIsPasswordLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white dark:bg-gray-800 p-8 rounded-lg w-[400px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => {
            onClose();
            resetForm();
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {modalStep === "email" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              {title}
            </h2>
            <form onSubmit={handleForgotPassword}>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#101013] text-white py-2 rounded-lg hover:bg-[#2a2c31] transition-colors duration-300 relative"
                disabled={isEmailLoading}
              >
                {isEmailLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          </>
        )}

        {modalStep === "otp" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Enter OTP
            </h2>
            <form onSubmit={handleOtpVerification}>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                  OTP Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter OTP"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#101013] text-white py-2 rounded-lg hover:bg-[#2a2c31] transition-colors duration-300 relative"
                disabled={isOtpLoading}
              >
                {isOtpLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </form>
          </>
        )}

        {modalStep === "password" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Set New Password
            </h2>
            <form onSubmit={handlePasswordUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter new password"
                  required
                  disabled={isPasswordLoading}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Confirm new password"
                  required
                  disabled={isPasswordLoading}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#101013] text-white py-2 rounded-lg hover:bg-[#2a2c31] transition-colors duration-300 relative"
                disabled={isPasswordLoading}
              >
                {isPasswordLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { FaEyeSlash } from "react-icons/fa6";
import { MdRemoveRedEye } from "react-icons/md";
import { useState, useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useSigninMutation, useSignupMutation } from "@/app/store/api/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ForgotPasswordModal from "@/app/Components/SharedComponent/ForgotPasswordModal";

// Create a client-side only effect hook
function useClientEffect(effect, deps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      return effect();
    }
  }, deps);
}

export default function SignInForm({
  formTitle = "Sign In",
  formSubHeader = "Welcome back! Please enter your credentials to access your dashboard.", // Form Title
  buttonText = "Sign In", // Button text
  accountExist = "Don't have an account? ",
  logs = "Register here",
  forget,

  placeholderText = {
    email: "email@example.com",
    password: "Password",
  }, // Dynamic placeholders
}) {
  const [showPassword, setShowPassword] = useState([
    { id: 1, value: false }, // for password
    { id: 2, value: false }, // for confirm password
  ]);

  const [showIcon, setShowIcon] = useState([
    { id: 1, value: false }, // for password
    { id: 2, value: false }, // for confirm password
  ]);

  const adminLogin = formTitle === "Admin Log In";
  const signInStyle = accountExist === "Don't have an account? ";
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [signin, { isLoading: isSigninLoading, error: signinError }] =
    useSigninMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useClientEffect(() => {
    setIsLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const data = {
        email: formData.email,
        password: formData.password,
      };
      await toast.promise(signin(data).unwrap(), {
        loading: "Signing in...",
        success: (response) => {
          if (response?.success) {
            setFormData({ email: "", password: "" });
            if (response?.type === "admin") {
              router.push("/admin");
            } else {
              router.push("/");
            }
            return "Successfully signed in!";
          }
          throw new Error(
            typeof response?.message === "string"
              ? response.message
              : "Sign in failed"
          );
        },
      });
    } catch (err) {
      const errorMessage =
        typeof err?.data?.message?.message === "string"
          ? err.data.message.message
          : typeof err?.message?.message === "string"
          ? err.message.message
          : "Sign in failed. Please try again.";

      toast.error(errorMessage);
    }
  };

  const togglePasswordVisibility = (id) => {
    setShowPassword((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, value: !item.value } : item
      )
    );
  };

  const handleValue = (e, id) => {
    setShowIcon((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, value: e.target.value ? true : false }
          : item
      )
    );
  };

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <div className="dark:bg-[url('/bg.png')] dark:bg-cover dark:bg-no-repeat">
          <div
            className={` max-w-[896px] mx-auto px-5 2xl:px-0 ${
              adminLogin
                ? "h-screen flex flex-col justify-center bg-[#F9FAFB]"
                : "md:pb-[115px] pb-[104px] md:pt-[156px] pt-[121px] lg:pt-[188px]  "
            }  leading-[130%]`}
          >
            <div>
              <h1 className="text-[#070707] dark:text-[#FDFEFF] font-medium md:text-[28px] text-2xl lg:text-[32px] leading-[130%]">
                {formTitle}
              </h1>
              <p className="text-c2 mt-3 leading-[130%] text-base dark:text-[#ECF0FE]">
                {formSubHeader}
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className={`md:p-6 px-4 py-6 md:px-6 border ${
                adminLogin ? "bg-white" : "bg-form-gradient-light"
              } dark:border-[#545460] rounded-[16px] md:mt-8 mt-6  dark:bg-custom-gradient`}
            >
              <div className="flex flex-col gap-6">
                {/* Email field */}
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="email"
                    className="text-base text-c2 dark:text-[#ECF0FE]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={placeholderText.email}
                    className="border border-[#DFE1E7] dark:border-[#393C44] rounded-[8px] md:p-6 px-6 py-5 placeholder:text-[#878991] dark:bg-[#0B0B0C] dark:text-[#878991] dark:placeholder:text-[#878991]"
                  />
                </div>

                {/* Password field */}
                <div className="flex flex-col gap-3 w-full">
                  <label
                    htmlFor="password"
                    className="text-base text-c2 dark:text-[#ECF0FE]"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword[0]?.value ? "text" : "password"}
                      name="password"
                      onChange={(e) => {
                        handleValue(e, 1);
                        handleChange(e);
                      }}
                      className="border dark:bg-[#0B0B0C] dark:border-[#393C44] rounded-[8px] md:p-6 px-6 py-5 placeholder:text-c2 w-full border-[#DFE1E7]"
                      placeholder={placeholderText.password}
                    />
                    {showIcon[0]?.value && (
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(1)}
                        className="absolute top-1/2 right-4 -translate-y-1/2 transform text-[#2A2A2A]"
                      >
                        {showPassword[0]?.value ? (
                          <MdRemoveRedEye className="text-2xl dark:text-white" />
                        ) : (
                          <FaEyeSlash className="text-2xl dark:text-white" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit button and footer */}
              <div>
                <button
                  className="my-8 md:py-6 py-5 text-center w-full bg-[#070707] dark:bg-[#F3F6FE] dark:border dark:border-[#070707] dark:text-[#070707] text-white font-medium text-lg leading-normal rounded-[12px] disabled:opacity-50"
                  type="submit"
                  disabled={isSigninLoading}
                >
                  {isSigninLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white dark:border-gray-900"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    buttonText
                  )}
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between mb-5">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsModalOpen(true);
                    }}
                    className="text-[#393C44] dark:text-[#ECF0FE] text-base font-medium hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <h2
                  className={`text-c2 leading-[160%] dark:text-[#A8AAB4] text-base ${
                    signInStyle ? "pt-2" : ""
                  }`}
                >
                  {accountExist}
                  <span className="font-medium text-[#070707]">
                    <Link
                      href="/auth/signup"
                      className=" hover:underline border-[#070707] dark:text-[#FDFEFF] dark:border-[#A8AAB4]"
                    >
                      {logs}
                    </Link>
                  </span>
                </h2>
              </div>
            </form>
          </div>
        </div>
      )}

      <ForgotPasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Forgot Password"
        type="forgot"
      />
    </>
  );
}

"use client";

import { FaEyeSlash } from "react-icons/fa6";
import { MdRemoveRedEye } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Command } from "cmdk";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSignupMutation } from "@/app/store/api/authApi";
import { countries } from "@/app/data/countries";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignupForm({
  bgImage, // Background image URL
  formTitle = "Create Your Account",
  formSubHeader = "Register now to access your dashboard and manage your message post seamlessly.", // Form Title
  buttonText = "Sign Up", // Button text
  termsText = "By agreeing to this, you accept the terms", // Terms text
  accountExist = "Already have an account? ",
  logs = "Log in here",
  forget,

  placeholderText = {
    email: "email@example.com",
    firstName: "First",
    lastName: "Last",
    country: "Country",
    password: "Password",
    confirmPassword: "Confirm Password",
  }, // Dynamic placeholders
  isSignIn = false, // Prop to differentiate Sign In or Sign Up
}) {
  // Initialize showPassword state for both fields
  const [showPassword, setShowPassword] = useState([
    { id: 1, value: false }, // for password
    { id: 2, value: false }, // for confirm password
  ]);

  // Initialize showIcon state for both fields
  const [showIcon, setShowIcon] = useState([
    { id: 1, value: false }, // for password
    { id: 2, value: false }, // for confirm password
  ]);

  const [check, setCheck] = useState(true);

  const adminLogin = formTitle === "Admin Log In";
  const signInStyle = accountExist === "Don't have an account? ";

  const [termsOpen, setTermsOpen] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [signup, { isLoading: isSignupLoading, error: signupError }] =
    useSignupMutation();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Conditionally set the form fields for Sign In and Sign Up
  const formFields = [
    ...(isSignIn
      ? []
      : [
          // Only add the 'name' and 'location' fields for Sign Up
          {
            id: "name",
            label: "Name",
            type: "text",
            placeholder: placeholderText.firstName,
            fullWidth: false,
          },
          {
            id: "name2",
            type: "text",
            placeholder: placeholderText.lastName,
            fullWidth: false,
          },
          {
            id: "location",
            label: "Country",
            type: "text",
            placeholder: placeholderText.location,
            fullWidth: true,
          },
        ]),
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: placeholderText.email,
      fullWidth: true,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: placeholderText.password,
      fullWidth: false,
    },
    ...(isSignIn
      ? []
      : [
          {
            id: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            placeholder: placeholderText.confirmPassword,
            fullWidth: false,
          },
        ]),
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.name2 ||
      !formData.email ||
      !formData.location ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (check) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    try {
      const data = {
        name: formData.name,
        last_name: formData.name2,
        email: formData.email,
        address: formData.location,
        password: formData.password,
      };
      await signup(data).unwrap();
      toast.success("Signup successful! Redirecting to login...");
      setFormData({
        name: "",
        last_name: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
      });
      router.push("/auth/signin");
    } catch (err) {
      if (err.status === 409) {
        toast.error("Email already exists. Please use a different email.");
      } else if (err.status === 400) {
        toast.error(
          err.data?.message || "Invalid input data. Please check your entries."
        );
      } else {
        toast.error("An error occurred. Please try again later.");
      }
      console.error("Signup error:", err);
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
    <div>
      <div className=" dark:bg-[url('/bg.png')]  dark:bg-cover dark:bg-no-repeat">
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
              <div className="flex flex-col  ">
                <div className="flex flex-col gap-3 w-full">
                  <label
                    htmlFor="name"
                    className="text-base text-c2 dark:text-[#ECF0FE]"
                  >
                    Name
                  </label>
                  <div className="flex md:flex-row flex-col w-full gap-6">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={placeholderText.firstName}
                      className="border border-[#DFE1E7] dark:border-[#393C44] rounded-[8px] md:p-6 px-6 py-5 placeholder:text-[#878991] dark:bg-[#0B0B0C] dark:text-[#878991] dark:placeholder:text-[#878991] w-full"
                    />
                    <input
                      type="text"
                      id="name2"
                      name="name2"
                      value={formData.name2}
                      onChange={handleChange}
                      placeholder={placeholderText.lastName}
                      className="border border-[#DFE1E7] dark:border-[#393C44] rounded-[8px] md:p-6 px-6 py-5 placeholder:text-[#878991] dark:bg-[#0B0B0C] dark:text-[#878991] dark:placeholder:text-[#878991] w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-1/2"></div>
              </div>
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

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="location"
                  className="text-base text-c2 dark:text-[#ECF0FE]"
                >
                  Country
                </label>
                <div className="relative">
                  <Command className="border border-[#DFE1E7] dark:border-[#393C44] rounded-[8px] overflow-hidden">
                    <div className="flex items-center border-b">
                      <Command.Input
                        placeholder={
                          isLoading
                            ? "Loading countries..."
                            : "Search countries..."
                        }
                        className="w-full p-6 outline-none cursor-pointer bg-white dark:bg-[#0B0B0C] text-[#878991] dark:text-[#ECF0FE]"
                        value={formData.location}
                        onValueChange={(value) => {
                          handleChange({
                            target: { name: "location", value },
                          });
                        }}
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                        disabled={isLoading}
                      />
                    </div>
                    {isOpen && (
                      <Command.List className="max-h-[200px] overflow-y-auto custom-scrollbar">
                        <Command.Empty className="py-2 px-3 text-[#878991] dark:text-[#ECF0FE]">
                          {isLoading ? "Loading..." : "No country found."}
                        </Command.Empty>
                        {countries.map((country) => (
                          <Command.Item
                            key={country.value}
                            value={country.label}
                            onSelect={() => {
                              handleChange({
                                target: {
                                  name: "location",
                                  value: country.label,
                                },
                              });
                              setIsOpen(false);
                            }}
                            className="py-2 px-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-[#878991] dark:text-[#ECF0FE]"
                          >
                            {country.label}
                          </Command.Item>
                        ))}
                      </Command.List>
                    )}
                  </Command>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#878991] dark:text-[#ECF0FE] pointer-events-none" />
                </div>
              </div>

              {/* Password fields container */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Password field */}
                <div className="flex flex-col gap-3 w-full ">
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

                <div className="w-full flex flex-col justify-end">
                  <label
                    htmlFor="confirmPassword"
                    className="text-base text-c2 dark:text-[#ECF0FE]"
                  >
                    {/* Confirm Password */}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword[1]?.value ? "text" : "password"}
                      name="confirmPassword"
                      onChange={(e) => {
                        handleValue(e, 2);
                        handleChange(e);
                      }}
                      className="border dark:bg-[#0B0B0C] dark:border-[#393C44] rounded-[8px] md:p-6 px-6 py-5 placeholder:text-c2 w-full border-[#DFE1E7]"
                      placeholder={placeholderText.confirmPassword}
                    />
                    {showIcon[1]?.value && (
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(2)}
                        className="absolute top-1/2 right-4 -translate-y-1/2 transform text-[#2A2A2A]"
                      >
                        {showPassword[1]?.value ? (
                          <MdRemoveRedEye className="text-2xl dark:text-white" />
                        ) : (
                          <FaEyeSlash className="text-2xl dark:text-white" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex md:items-center items-start gap-[18px]">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCheck(!check);
                }}
              >
                <div>
                  {check ? (
                    <MdOutlineCheckBoxOutlineBlank
                      onClick={() => setTermsOpen(true)}
                      className="text-2xl text-[#393C44] dark:text-[#A8AAB4]"
                    />
                  ) : (
                    <MdOutlineCheckBox className="text-2xl text-[#393C44] dark:text-[#A8AAB4]" />
                  )}
                </div>
              </button>
              <label
                htmlFor="agreed"
                className="md:text-base text-[14px] text-c2 leading-[160%] dark:text-[#A8AAB4]"
              >
                {formTitle === "Create Your Account" ? (
                  <label htmlFor="terms" className="text-sm md:text-base">
                    By agreeing to this, you accept the{" "}
                    <span
                      onClick={() => setTermsOpen(true)}
                      className="text-blue-500 cursor-pointer underline"
                    >
                      terms
                    </span>
                    .
                  </label>
                ) : (
                  termsText
                )}
              </label>

              {/* Terms and Condition pop up box */}
              <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
                <DialogContent className="max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      Terms and Conditions
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 overflow-y-auto custom-scrollbar  max-h-[60vh] pr-4">
                    <section>
                      <h3 className="text-lg font-semibold mb-2">
                        1. Introduction
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        These Terms and Conditions govern your use of our
                        service and website. By accessing or using our service,
                        you agree to be bound by these terms.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-2">
                        2. Definitions
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        &quot;Service&quot; refers to the website, platform, and
                        all related services. &quot;User&quot; refers to any
                        individual or entity using our Service.
                        &quot;Content&quot; refers to all materials,
                        information, and data available through our Service.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-2">
                        3. User Accounts
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Users are responsible for maintaining the
                        confidentiality of their account credentials. You must
                        immediately notify us of any unauthorized use of your
                        account. We reserve the right to terminate accounts that
                        violate our terms.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-2">
                        4. Privacy Policy
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Our Privacy Policy describes how we collect, use, and
                        protect your personal information. By using our Service,
                        you consent to our data practices as described in our
                        Privacy Policy. We implement various security measures
                        to protect your personal information.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-2">
                        5. Payment Terms
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        All payments are processed securely through our payment
                        providers. Fees are non-refundable unless otherwise
                        specified. We reserve the right to modify our pricing
                        with appropriate notice.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-2">
                        6. Intellectual Property
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        All content, features, and functionality are owned by us
                        and protected by international copyright laws. Users may
                        not copy, modify, or distribute our content without
                        permission.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-2">
                        7. Limitation of Liability
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        We shall not be liable for any indirect, incidental,
                        special, consequential, or punitive damages. Our
                        liability is limited to the amount paid for our
                        services.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-2">
                        8. Changes to Terms
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        We reserve the right to modify these terms at any time.
                        Continued use of the Service after changes constitutes
                        acceptance of new terms. Users will be notified of
                        significant changes.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-2">
                        9. Contact Information
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        For questions about these Terms, please contact us at
                        support@example.com
                      </p>
                    </section>
                  </div>
                  <div className="flex justify-end pt-4 border-t">
                    <Button onClick={() => setTermsOpen(false)}>Close</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div>
              {signupError && (
                <div className="mt-4 text-red-600 dark:text-red-400 text-sm">
                  {signupError?.data?.message ||
                    "An error occurred during signup"}
                </div>
              )}
              <button
                className="my-8 md:py-6 py-5 text-center w-full bg-[#070707] dark:bg-[#F3F6FE] dark:border dark:border-[#070707] dark:text-[#070707] text-white font-medium text-lg leading-normal rounded-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSignupLoading}
              >
                {isSignupLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  buttonText
                )}
              </button>
            </div>
            <div>
              {forget && (
                <div>
                  <a
                    href="#"
                    className="text-[#393C44] dark:text-[#ECF0FE] text-base font-medium"
                  >
                    {forget}
                  </a>
                </div>
              )}
              <h2
                className={`text-c2 leading-[160%] dark:text-[#A8AAB4] text-base ${
                  signInStyle ? "pt-2" : ""
                }`}
              >
                {accountExist}
                <span className="font-medium text-[#070707]">
                  <Link
                    href="/auth/signin"
                    className="border-b border-[#070707] dark:text-[#FDFEFF] dark:border-[#A8AAB4]"
                  >
                    {logs}
                  </Link>
                </span>
              </h2>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

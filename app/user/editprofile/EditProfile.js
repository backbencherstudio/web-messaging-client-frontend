"use client";

import React, { useState, useEffect } from "react";
import { User, Eye, EyeOff, ChevronDown } from "lucide-react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useRequestEmailChangeMutation,
  useChangeEmailMutation,
  useEnable2FAMutation,
  useDisable2FAMutation,
} from "@/app/store/api/authApi";
import { Button } from "@/components/ui/button";
import EmailChangeModal from "@/app/Components/SharedComponent/EmailChangeModal";
import EmailChangeOtpModal from "@/app/Components/SharedComponent/EmailChangeOtpModal";
import { countries } from "@/app/data/countries";
import toast from "react-hot-toast";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { twoFactorStorage } from "@/app/utils/twoFactorStorage";

const EditProfile = () => {
  const { data: profile, isLoading, error } = useGetProfileQuery();
  console.log(profile);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [requestEmailChange] = useRequestEmailChangeMutation();
  const [changeEmail] = useChangeEmailMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [isEmailChangeModalOpen, setIsEmailChangeModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const [enable2FA] = useEnable2FAMutation();
  const [disable2FA] = useDisable2FAMutation();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [is2FALoading, setIs2FALoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    password: "",
  });

  useEffect(() => {
    const stored2FAStatus = twoFactorStorage.getStatus();
    setIs2FAEnabled(stored2FAStatus);

    // Cleanup function
    return () => {
      // Clear any pending state updates
      setIs2FAEnabled(false);
      setIs2FALoading(false);
    };
  }, []);

  useEffect(() => {
    if (profile?.data) {
      setFormData({
        name: profile.data.name || "",
        email: profile.data.email || "",
        country: profile.data.country || "",
        password: profile.data.password || "",
      });
    }
  }, [profile?.data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handle2FAToggle = async (checked) => {
    setIs2FALoading(true);
    try {
      if (checked) {
        const response = await enable2FA().unwrap();
        if (response.success) {
          setIs2FAEnabled(true);
          twoFactorStorage.setStatus(true);
          toast.success(response.message || "2FA enabled successfully");
        }
      } else {
        const response = await disable2FA().unwrap();
        if (response.success) {
          setIs2FAEnabled(false);
          twoFactorStorage.setStatus(false);
          toast.success(response.message || "2FA disabled successfully");
        }
      }
    } catch (error) {
      setIs2FAEnabled(!checked);
      twoFactorStorage.setStatus(!checked);
      toast.error(error?.data?.message || "Failed to update 2FA settings");
    } finally {
      setIs2FALoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.country) {
      toast.error("Please select a valid country.");
      return;
    }
    if (formData.password && formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const updateData = {
        name: formData.name,
        country: formData.country,
        ...(formData.password && { password: formData.password }),
      };

      await updateProfile(updateData).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  const handleEmailChangeRequest = async (email) => {
    try {
      await requestEmailChange(email).unwrap();
      setNewEmail(email);
      setIsEmailChangeModalOpen(false);
      setIsOtpModalOpen(true);
      toast.success("Verification code sent to your new email");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to request email change");
    }
  };

  const handleEmailChangeVerification = async ({ otp, newEmail }) => {
    try {
      const response = await changeEmail({
        email: newEmail,
        token: otp,
      }).unwrap();

      if (!response.success) {
        // Handle unsuccessful response
        toast.error(response.message || "Failed to verify email change");
        return;
      }

      setIsOtpModalOpen(false);
      setFormData((prev) => ({
        ...prev,
        email: newEmail,
      }));
      toast.success("Email changed successfully");
    } catch (error) {
      const errorMessage =
        error?.data?.message ||
        error?.error ||
        error?.message ||
        "Failed to verify email change";
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-[url('/bg.png')]">
        <div className="text-xl text-gray-600 dark:text-gray-300">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center pt-[100px] lg:pt-[120px] pb-[100px]">
        <div className="m-4 border dark:border-[#545460] bg-white dark:bg-[#1E1E1E] text-[#070707] dark:text-[#FDFEFF] rounded-lg shadow-lg max-w-[942px] w-full px-6 py-6 md:px-10 md:py-8">
          {/* Header */}
          <h1 className="text-2xl font-semibold mb-8">Edit Profile</h1>

          {/* Profile Info */}
          <div className="flex items-center mb-8">
            <div className="relative">
              {/* Image placeholder or uploader */}
            </div>
            <div>
              <h2 className="text-lg font-medium">{profile?.data?.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {profile?.data?.email}
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="First name & last name"
                className="w-full px-4 py-3 rounded-lg border dark:border-[#545460] bg-white dark:bg-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-[#545460]"
              />
            </div>

            {/* Email Display + Button */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  disabled
                  value={formData.email}
                  placeholder="info@mail.com"
                  className="w-full px-4 py-3 rounded-lg border dark:border-[#545460] text-gray-500 bg-gray-200 dark:bg-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-[#545460] cursor-not-allowed"
                />
              </div>
              <Button
                type="button" // Add this to prevent form submission
                onClick={() => setIsEmailChangeModalOpen(true)}
                variant="outline"
                className="ml-4 self-end mb-2 dark:border-[#545460] dark:hover:bg-[#2A2A2A]"
              >
                Change Email
              </Button>
            </div>

            {/* Country */}
            <div className="flex flex-col gap-3">
              <label htmlFor="country" className="dark:text-[#ECF0FE]">
                Country
              </label>
              <div className="relative">
                <select
                  id="country"
                  name="country"
                  value={formData.country || ""}
                  onChange={handleChange}
                  className="border border-[#DFE1E7] dark:border-[#393C44] rounded-[8px] md:p-6 px-6 py-5 bg-white dark:bg-[#2A2A2A] dark:text-[#ECF0FE] appearance-none cursor-pointer w-full"
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option
                      key={country.value}
                      value={country.label}
                      className="py-2 bg-white dark:bg-[#0B0B0C] dark:text-[#ECF0FE]"
                    >
                      {country.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#878991] dark:text-[#ECF0FE] pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 rounded-lg border dark:border-[#545460] bg-white dark:bg-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-[#545460]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Password must be at least 8 characters long
              </p>
            </div>

            {/* 2FA toggle button */}
            <div className="flex items-center space-x-4">
              <Switch
                id="2fa"
                checked={is2FAEnabled}
                onCheckedChange={handle2FAToggle}
                disabled={is2FALoading}
              />
              <Label htmlFor="2fa" className="font-medium cursor-pointer">
                Two-Factor Authentication (2FA)
              </Label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isUpdating}
              className="w-fit px-6 py-3 bg-black dark:bg-[#FDFEFF] text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>

      {/* Modals */}
      <EmailChangeModal
        isOpen={isEmailChangeModalOpen}
        onClose={() => setIsEmailChangeModalOpen(false)}
        onSubmit={handleEmailChangeRequest}
        currentEmail={profile?.data?.email}
      />
      <EmailChangeOtpModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onSubmit={handleEmailChangeVerification}
        email={profile?.data?.email}
        newEmail={newEmail}
      />
    </>
  );
};

export default EditProfile;

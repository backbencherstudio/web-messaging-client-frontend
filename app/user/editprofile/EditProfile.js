"use client";

import React, { useState, useEffect } from "react";
import { User, Eye, EyeOff } from "lucide-react";
import { ChevronDown } from "lucide-react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/app/store/api/authApi";
import { countries } from "@/app/data/countries";
const EditProfile = () => {
  const { data: profile, isLoading, error } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  useEffect(() => {
    if (profile?.data) {
      setFormData({
        name: profile.data.name || "",
        email: profile.data.email || "",
        address: profile.data.address || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Password validation
      if (formData.password && formData.password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
      }

      // Only send the fields that can be updated
      const updateData = {
        name: formData.name,
        country: formData.address,
        // Only include password if it's been changed
        ...(formData.password && { password: formData.password }),
      };

      await updateProfile(updateData).unwrap();
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error?.data?.message || "Failed to update profile");
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="flex justify-center pt-[100px] lg:pt-[120px] bg-cover bg-no-repeat dark:bg-[url('/bg.png')] pb-[100px] ">
      <div className="m-4 border dark:border-[#545460] bg-white dark:bg-[#1E1E1E] text-[#070707] dark:text-[#FDFEFF] rounded-lg shadow-lg max-w-[942px] w-full px-6 py-6 md:px-10 md:py-8">
        {/* Header */}
        <h1 className="text-2xl font-semibold mb-8">Edit Profile</h1>

        {/* Profile Image Section */}
        <div className="flex items-center  mb-8">
          <div className="relative">
            {/* <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-[#2A2A2A] flex items-center justify-center">
              <User className="w-10 h-10 text-gray-500 dark:text-gray-400" />
            </div> */}
            {/* <button 
              className="absolute bottom-0 right-0 w-6 h-6 bg-black dark:bg-[#545460] rounded-full flex items-center justify-center"
              onClick={() => alert('Image upload functionality will be implemented')}
            >
              <span className="text-white text-xs">✎</span>
            </button> */}
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
          {/* Name Field */}
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

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              disabled
              value={formData.email}
              onChange={handleInputChange}
              placeholder="info@mail.com"
              className="w-full px-4 py-3 rounded-lg border dark:border-[#545460] text-gray-500 bg-gray-200 dark:bg-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-[#545460] cursor-not-allowed"
            />
          </div>

          {/* Location Field */}
          <div className="flex flex-col gap-3">
            <label htmlFor="address" className="dark:text-[#ECF0FE]">
              Country
            </label>
            <div className="relative">
              <select
                id="address"
                name="address"
                value={formData.address || ""}
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

          {/* Password Field */}
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

          {/* Save Button */}
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
  );
};

export default EditProfile;

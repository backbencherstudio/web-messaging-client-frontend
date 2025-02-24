'use client';


import React, { useState, useEffect } from 'react';
import { User, Eye, EyeOff } from 'lucide-react';
import { ChevronDown } from 'lucide-react';


const dummyUsers = {
  "user123": {
    id: "user123",
    name: "M Mansur",
    email: "deanna.curtis@example.com",
    location: "Dhaka, Bangladesh",
    password: "secretpassword123",
    avatar: null 
  },
  "user456": {
    id: "user456",
    name: "John Doe",
    email: "john.doe@example.com",
    location: "New York, USA",
    password: "password456",
    avatar: null
  }
};

const countries = [
  { value: "", label: "Select a country" },
  { value: "US", label: "United States" },
  { value: "UK", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
];


const EditProfile = () => {
 
  const userId = "user123"; 
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const fetchUserData = () => {
      setIsLoading(true);
     
      setTimeout(() => {
        const userData = dummyUsers[userId];
        if (userData) {
          setFormData({
            name: userData.name,
            email: userData.email,
            location: userData.location,
            password: userData.password
          });
        }
        setIsLoading(false);
      }, 500);
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Saving changes:', formData);
   
    alert('Profile updated successfully!');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-[url('/bg.png')]">
        <div className="text-xl text-gray-600 dark:text-gray-300">Loading...</div>
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
    <div className="flex justify-center pt-[121px] md:pt-[156px] lg:pt-[188px] bg-cover bg-no-repeat dark:bg-[url('/bg.png')] pb-[100px] ">
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
            <h2 className="text-lg font-medium">{formData.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{formData.email}</p>
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
              value={formData.email}
              onChange={handleInputChange}
              placeholder="info@mail.com"
              className="w-full px-4 py-3 rounded-lg border dark:border-[#545460] bg-white dark:bg-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-[#545460]"
            />
          </div>

          {/* Location Field */}
          <div className="flex flex-col gap-3">
                  <label htmlFor="location" className=" dark:text-[#ECF0FE]">
                    Country
                  </label>
                  <div className="relative">
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="border border-[#DFE1E7] dark:border-[#393C44] rounded-[8px] md:p-6 px-6 py-5 bg-white dark:bg-[#2A2A2A]  dark:text-[#ECF0FE] appearance-none cursor-pointer w-full"
                    >
                      {countries.map((country) => (
                        <option
                          key={country.value}
                          value={country.value}
                          className="py-2 bg-white dark:bg-[#0B0B0C]  dark:text-[#ECF0FE]"
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
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-fit px-6 py-3 bg-black dark:bg-[#FDFEFF] text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
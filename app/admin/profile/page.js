"use client";
import { useGetProfileQuery } from "@/app/store/api/authApi";
import React, { useState } from "react";
import { MdDoneOutline } from "react-icons/md";
import { PiUserCirclePlusDuotone, PiUserCirclePlusLight } from "react-icons/pi";
import { TbPencil } from "react-icons/tb";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editField, setEditField] = useState(""); // Can be "name", "email", or "password"
  const { data: profile, isLoading, error } = useGetProfileQuery();

  const [formData, setFormData] = useState({
    name: profile?.data?.name,
    email: profile?.data?.email,
    password: "",
  });

  const handleEdit = (field) => {
    setEditField(field);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your update logic here
    setIsModalOpen(false);
  };

  return (
    <div className="px-8 py-4">
      <h1 className="text-2xl font-medium text-gray-700 mb-6">Profile</h1>
      <div className="bg-white rounded-lg shadow-sm p-12">
        <div className="flex items-center gap-6">
          <PiUserCirclePlusDuotone className="h-24 w-24 text-gray-400" />
          <div>
            <h1 className="text-2xl font-medium text-gray-700">
              {profile?.data?.name}
            </h1>
            <p className="text-gray-400"> {profile?.data?.type}</p>
          </div>
        </div>
        <div className="mt-14 mx-3 border-b pb-5">
          <p className="text-gray-400 text-xs">Name</p>
          <div className="flex justify-between items-center gap-2">
            <h1 className="text-gray-800 border-r pr-10">
              {profile?.data?.name}
            </h1>
            <div
              className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => handleEdit("name")}
            >
              <MdDoneOutline className="text-green-500" />
            </div>
          </div>
        </div>
        <div className="mt-4 mx-3 border-b pb-5">
          <p className="text-gray-400 text-xs">Email</p>
          <div className="flex justify-between items-center gap-2">
            <h1 className="text-gray-800">{profile?.data?.email}</h1>
            <div
              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => handleEdit("email")}
            >
              <TbPencil className="text-gray-500" />
            </div>
          </div>
        </div>
        <div className="mt-4 mx-3 border-b pb-5">
          <p className="text-gray-400 text-xs">Password</p>
          <div className="flex justify-between items-center gap-2">
            <h1 className="text-gray-800">********</h1>
            <div
              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => handleEdit("password")}
            >
              <TbPencil className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-medium mb-4">
              Edit {editField.charAt(0).toUpperCase() + editField.slice(1)}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type={editField === "password" ? "password" : "text"}
                value={formData[editField]}
                onChange={(e) =>
                  setFormData({ ...formData, [editField]: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 mb-4"
                placeholder={`Enter new ${editField}`}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

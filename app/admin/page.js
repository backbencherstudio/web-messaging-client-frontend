import React from "react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold ">Dashboard</h1>
      <p className="mt-1.5 text-[#4A4C56] font-normal">
        Here are your analytic details
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Sample Dashboard Cards */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Posts</h2>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Active Users</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}

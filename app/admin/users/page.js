"use client";

import CustomTable from "@/app/Components/SharedComponent/CustomTable";
import { userData } from "../data";

export default function UsersPage() {
  const userColumns = [
    { label: "P No", accessor: "pNo" },
    { label: "User Name", accessor: "userName" },
    { label: "Email", accessor: "email" },
    { label: "Total Messages", accessor: "totalMessages" },
    { label: "Total views", accessor: "totalViews" },
    { label: "Last Message", accessor: "lastMessage" },
  ];

  return (
    <div>
      <CustomTable
        columns={userColumns}
        data={userData}
        title="All Users"
        subtitle="Your report payroll sofar"
        pagination={true}
        search={true}
      />
    </div>
  );
}

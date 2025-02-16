"use client";

import CustomTable from "@/app/Components/SharedComponent/CustomTable";

export default function UsersPage() {
  const userColumns = [
    { label: "P No", accessor: "pNo" },
    { label: "User Name", accessor: "userName" },
    { label: "Email", accessor: "email" },
    { label: "Total Messages", accessor: "totalMessages" },
    { label: "Total views", accessor: "totalViews" },
    { label: "Last Message", accessor: "lastMessage" },
  ];
  const userData = [
    {
      pNo: "#120",
      userName: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      totalMessages: "200",
      totalViews: "20000",
      lastMessage: "Lorem ipsum dolor sit amet, consectetur adipi...",
    },
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

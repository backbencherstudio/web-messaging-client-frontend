"use client";

import CustomTable from "@/app/Components/SharedComponent/CustomTable";

export default function MessagesPage() {
  const messageColumns = [
    { label: "P No", accessor: "pNo" },
    { label: "Message content", accessor: "messageContent" },
    { label: "Posted by", accessor: "postedBy" },
    { label: "Views", accessor: "views" },
    { label: "Pay", accessor: "pay" },
    { label: "Email ", accessor: "email" },
    { label: "Time Posted", accessor: "timePosted" },
    { label: "Action", accessor: "action" },
  ];
  const messageData = [
    {
      pNo: "#120",
      messageContent: "Lorem ipsum dolor sit amet, consectetur adipi...",
      postedBy: "Courtney Henry",
      views: "20000",
      pay: "$0.56",
      email: "CourtneyHenry@gmail.com",
      timePosted: "April 28, 2024",
      action: "Edit",
    },
  ];
  return (
    <div>
      <CustomTable
        columns={messageColumns}
        data={messageData}
        title="Messages"
        subtitle="Your report payroll sofar"
        pagination={true}
        search={true}
      />
    </div>
  );
}

"use client";

import CustomTable from "@/app/Components/SharedComponent/CustomTable";
import { messageData } from "../data";

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

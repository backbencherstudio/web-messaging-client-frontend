"use client";

import CustomTable from "@/app/Components/SharedComponent/CustomTable";
import { contactData } from "../data";

export default function ContactsPage() {
  const contactColumns = [
    { label: "P No", accessor: "pNo" },
    { label: "Name", accessor: "name" },
    { label: "Email", accessor: "email" },
    { label: "Subject", accessor: "subject" },
    { label: "Message", accessor: "message" },
    { label: "Action", accessor: "action" },
  ];

  return (
    <div>
      <CustomTable
        columns={contactColumns}
        data={contactData}
        title="Contact Us Info"
        subtitle="Your report payroll sofar"
        pagination={true}
        search={true}
      />
    </div>
  );
}

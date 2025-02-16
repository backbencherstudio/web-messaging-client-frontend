"use client";

import CustomTable from "@/app/Components/SharedComponent/CustomTable";

export default function ContactsPage() {
  const contactColumns = [
    { label: "P No", accessor: "pNo" },
    { label: "Name", accessor: "name" },
    { label: "Email", accessor: "email" },
    { label: "Subject", accessor: "subject" },
    { label: "Message", accessor: "message" },
    { label: "Action", accessor: "action" },
  ];
  const contactData = [
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
    {
      pNo: "#120",
      name: "Courtney Henry",
      email: "CourtneyHenry@gmail.com",
      subject: "Lorem ipsum dolor sit amet, consectetur adipi...",
      message: "Lorem ipsum dolor sit amet, consectetur adipi...",
      action: "Edit",
    },
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

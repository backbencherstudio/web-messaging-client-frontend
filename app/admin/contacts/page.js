"use client";

import CustomTable from "@/app/Components/SharedComponent/CustomTable";
import { contactData } from "../data";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import DeleteModal from "@/app/Components/SharedComponent/DeleteModal";

export default function ContactsPage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const contactColumns = [
    { label: "P No", accessor: "pNo" },
    { label: "Name", accessor: "name" },
    { label: "Email", accessor: "email" },
    { label: "Subject", accessor: "subject" },
    { label: "Message", accessor: "message" },
    {
      label: "Action",
      accessor: "action",
      customCell: (row) => (
        <button
          onClick={() => handleDelete(row)}
          className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl p-2"
        >
          <RiDeleteBin5Line size={20} />
        </button>
      ),
    },
  ];
  const handleDelete = (contact) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Implement your delete logic here
    console.log("Deleting contact:", selectedContact);
    setShowDeleteModal(false);
  };

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
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Contact"
        message="Are you sure you want to delete this contact?"
      />
    </div>
  );
}

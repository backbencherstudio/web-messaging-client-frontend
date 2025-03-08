"use client";

import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import DeleteModal from "@/app/Components/SharedComponent/DeleteModal";
import { useRouter } from "next/navigation";
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from "@/app/store/api/contactApi";
import CustomPagingTable from "@/app/Components/SharedComponent/CustomPagingTable";
import toast from "react-hot-toast";
import { IoEyeOutline } from "react-icons/io5";
import { SkeletonLoading } from "@/app/Components/SharedComponent/SkeletonLoading";

export default function ContactsPage() {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: contacts, isLoading, error } = useGetContactsQuery(currentPage);
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const contactColumns = [
    { label: "Name", accessor: "name" },
    { label: "Phone No", accessor: "phone_number" },
    { label: "Email", accessor: "email" },
    { label: "Subject", accessor: "subject" },
    { label: "Message", accessor: "message" },
    {
      label: "Action",
      accessor: "action",
      customCell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/admin/contacts/${row.id}`)}
            className="bg-gray-100 hover:bg-gray-200 rounded-xl p-2"
          >
            <IoEyeOutline size={20} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl p-2"
          >
            <RiDeleteBin5Line size={20} />
          </button>
        </div>
      ),
    },
  ];
  const handleDelete = (contact) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    deleteContact(selectedContact.id);
    setShowDeleteModal(false);
    toast.success("Contact deleted successfully");
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  if (isLoading) {
    return <SkeletonLoading />;
  }
  return (
    <div>
      <CustomPagingTable
        columns={contactColumns}
        data={contacts?.data}
        title="All Contacts"
        subtitle="Your report payroll sofar"
        pagination={true}
        search={true}
        paginationData={{
          currentPage: contacts?.pagination?.current_page || 1,
          totalPages: contacts?.pagination?.total_pages || 1,
          totalItems: contacts?.pagination?.total_items || 0,
        }}
        onPageChange={handlePageChange}
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

"use client";

import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import DeleteModal from "@/app/Components/SharedComponent/DeleteModal";
import { useRouter } from "next/navigation";
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from "@/app/store/api/contactApi";
import CustomTable from "@/app/Components/SharedComponent/CustomTable";
import toast from "react-hot-toast";
import { IoEyeOutline } from "react-icons/io5";
import { SkeletonLoading } from "@/app/Components/SharedComponent/SkeletonLoading";

export default function ContactsPage() {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Server-driven table state
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    field: "created_at",
    order: "desc",
  });

  const {
    data: contactsResponse,
    isLoading,
    error,
  } = useGetContactsQuery({
    q: searchTerm,
    page: currentPage,
    limit: itemsPerPage,
    sortBy: sortConfig.field,
    sortOrder: sortConfig.order,
  });

  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  const contactColumns = [
    { label: "#", accessor: "position", sortField: "position" },
    { label: "Name", accessor: "name", sortField: "name" },
    { label: "Email", accessor: "email", sortField: "email" },
    { label: "Phone No", accessor: "phone_number", sortField: "phone_number" },
    { label: "Subject", accessor: "subject", sortField: "subject" },
    { label: "Message", accessor: "message" },
    { label: "Created", accessor: "created", sortField: "created_at" },
    {
      label: "Action",
      accessor: "action",
      customCell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/admin/contacts/${row.id}`)}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-black/20 dark:hover:bg-black/70 rounded-xl p-2"
          >
            <IoEyeOutline size={20} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-500 hover:text-red-700 dark:bg-nav-dark-gradient bg-red-50 hover:bg-red-100 rounded-xl p-2"
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

  const confirmDelete = async () => {
    try {
      await deleteContact(selectedContact.id).unwrap();
      setShowDeleteModal(false);
      toast.success("Contact deleted successfully");
    } catch {
      toast.error("Failed to delete contact");
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSort = (field, order) => {
    setSortConfig({ field, order });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newLimit) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <SkeletonLoading />;
  }

  const rows = contactsResponse?.data?.data || [];
  const paginationData = contactsResponse?.data?.pagination || {};

  return (
    <div>
      <CustomTable
        columns={contactColumns}
        data={rows}
        title="All Contacts"
        subtitle="List of inquiries submitted by users."
        pagination={true}
        search={true}
        serverSide={true}
        onSearch={handleSearch}
        onSort={handleSort}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        searchTerm={searchTerm}
        sortConfig={sortConfig}
        paginationData={paginationData}
        loading={isLoading}
        searchableColumns={[
          "name",
          "email",
          "phone_number",
          "subject",
          "message",
        ]}
        sortableColumns={[
          "position",
          "created_at",
          "name",
          "email",
          "phone_number",
          "subject",
        ]}
        itemsPerPage={itemsPerPage}
        itemsPerPageOptions={[10, 20, 50, 100]}
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

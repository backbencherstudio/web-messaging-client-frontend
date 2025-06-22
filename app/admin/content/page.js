"use client";
import DeleteModal from "@/app/Components/SharedComponent/DeleteModal";
import {
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useGetAboutUsQuery,
  useGetFaqQuery,
  useUpdateAboutUsMutation,
} from "@/app/store/api/faqApi";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";

const ContentPage = () => {
  const [content, setContent] = useState("");
  // Add new states for FAQ management and modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const { data, isLoading } = useGetFaqQuery();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();
  const { data: aboutUs } = useGetAboutUsQuery();
  const [updateAboutUs, { isLoading: isUpdating }] = useUpdateAboutUsMutation();

  // Set content when aboutUs data is loaded
  React.useEffect(() => {
    if (aboutUs?.data?.about_us) {
      setContent(aboutUs.data.about_us);
    }
  }, [aboutUs]);

  // Function to handle FAQ submission
  const handleSubmitFaq = async () => {
    try {
      if (!newQuestion || !newAnswer) {
        alert("Please fill in both question and answer fields");
        return;
      }

      const data = {
        question: newQuestion,
        answer: newAnswer,
      };

      const response = await createFaq(data).unwrap();

      if (response?.success) {
        setNewQuestion("");
        setNewAnswer("");
        setIsModalOpen(false);
        toast.success("FAQ created successfully");
        // The FAQ list will automatically update through the RTK Query cache
      } else {
        alert("Failed to create FAQ. Please try again.");
      }
    } catch (error) {
      console.error("Error creating FAQ:", error);
      alert("An error occurred while creating the FAQ");
    }
  };

  // Add delete function
  const handleDeleteFaq = async (id) => {
    setSelectedFaq(id);
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = async () => {
    try {
      const response = await deleteFaq(selectedFaq).unwrap();
      if (response?.success) {
        setIsDeleteModalOpen(false);
        toast.success("FAQ deleted successfully");
      } else {
        toast.error("Failed to delete FAQ. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast.error("An error occurred while deleting the FAQ");
    }
  };
  const handleUpdateAboutUs = async () => {
    try {
      const response = await updateAboutUs({ about_us: content }).unwrap();
      if (response?.success) {
        toast.success("About Us updated successfully");
      } else {
        toast.error("Failed to update About Us. Please try again.");
      }
    } catch (error) {
      console.error("Error updating About Us:", error);
      toast.error("An error occurred while updating About Us");
    } finally{
      setContent(""); // Clear content after update
    }
  };
  return (
    <div>
      <div className="bg-white dark:bg-transparent p-6 rounded-lg">
        <div className="flex justify-between items-center bg-white dark:bg-transparent rounded-lg">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <CiEdit /> About Us
          </h1>
          <button
            onClick={handleUpdateAboutUs}
            disabled={isUpdating}
            className="bg-primary dark:bg-black/30 dark:hover:bg-black/70 text-white px-4 py-2 rounded-full disabled:opacity-70"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
        <textarea
          className="w-full min-h-[200px] p-4 border dark:bg-transparent border-gray-300 rounded-lg mt-6"
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="bg-white dark:bg-transparent p-6 mt-6 rounded-lg">
        <div className="flex justify-between items-center bg-white dark:bg-transparent rounded-lg">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <CiEdit /> Frequently Asked Questions
          </h1>
          {/* <button className="bg-primary text-white px-4 py-2 rounded-full">
            Save Changes
          </button> */}
        </div>

        {/* Display existing FAQs */}
        <div className="mt-6 space-y-6">
          {isLoading ? (
            <div>Loading FAQs...</div>
          ) : data?.data?.length === 0 ? (
            <div>No FAQs available</div>
          ) : (
            data?.data?.map((faq, index) => (
              <div key={index} className="border p-6 rounded-lg relative">
                <button
                  onClick={() => handleDeleteFaq(faq?.id)}
                  className="absolute right-4 top-4 text-red-500 hover:text-red-700 dark:bg-nav-dark-gradient bg-red-50 hover:bg-red-100 rounded-xl p-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                <h3 className="font-semibold border-b pb-4">{faq.question}</h3>
                <p className="mt-4">{faq.answer}</p>
              </div>
            ))
          )}
        </div>

        {/* Add FAQ button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 flex items-center justify-center gap-2 text-primary bg-[#f6f8fa] dark:bg-nav-dark-gradient w-full text-center py-6 rounded-lg"
        >
          <svg
            className="w-9 h-9"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black dark:bg-black/60     bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-black/90 p-6 rounded-lg w-[80%] max-w-2xl">
              <h2 className="text-xl font-semibold mb-4">Add New FAQ</h2>
              <input
                type="text"
                placeholder="Question"
                className="w-full dark:bg-black/20  p-2 border  rounded-lg mb-4"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <textarea
                placeholder="Answer"
                className="w-full p-2 border dark:bg-black/40  rounded-lg mb-4 h-32"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitFaq}
                  className="px-4 py-2 bg-primary text-white rounded-lg dark:bg-transparent dark:border "
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete FAQ"
        message="Are you sure you want to delete this FAQ?"
      />
    </div>
  );
};

export default ContentPage;

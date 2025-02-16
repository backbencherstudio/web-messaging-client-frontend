"use client";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
const ContentPage = () => {
  const [content, setContent] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
  );
  // Add new states for FAQ management and modal
  const [faqs, setFaqs] = useState([
    {
      question: "What is the purpose of this website?",
      answer:
        "This website is a platform for sharing information and resources.",
    },
    {
      question: "How do I create an account?",
      answer:
        "To create an account, simply click on the 'Sign Up' button and follow the instructions.",
    },
    {
      question: "What are the benefits of using this website?",
      answer:
        "This website offers a wide range of benefits, including access to a vast library of resources, personalized recommendations, and a community of users who share similar interests.",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  // Function to handle FAQ submission
  const handleSubmitFaq = () => {
    if (newQuestion && newAnswer) {
      setFaqs([...faqs, { question: newQuestion, answer: newAnswer }]);
      setNewQuestion("");
      setNewAnswer("");
      setIsModalOpen(false);
    }
  };

  // Add delete function
  const handleDeleteFaq = (indexToDelete) => {
    setFaqs(faqs.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg">
        <div className="flex justify-between items-center bg-white rounded-lg">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <CiEdit /> About Us
          </h1>
          <button className="bg-primary text-white px-4 py-2 rounded-full">
            Save Changes
          </button>
        </div>
        <textarea
          className="w-full h-44 p-4 border border-gray-300 rounded-lg mt-6"
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="bg-white p-6 mt-6 rounded-lg">
        <div className="flex justify-between items-center bg-white rounded-lg">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <CiEdit /> Frequently Asked Questions
          </h1>
          <button className="bg-primary text-white px-4 py-2 rounded-full">
            Save Changes
          </button>
        </div>

        {/* Display existing FAQs */}
        <div className="mt-6 space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border p-6 rounded-lg relative">
              <button
                onClick={() => handleDeleteFaq(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
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
          ))}
        </div>

        {/* Add FAQ button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 flex items-center justify-center gap-2 text-primary bg-[#f6f8fa] w-full text-center py-6 rounded-lg"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-[80%] max-w-2xl">
              <h2 className="text-xl font-semibold mb-4">Add New FAQ</h2>
              <input
                type="text"
                placeholder="Question"
                className="w-full p-2 border rounded-lg mb-4"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <textarea
                placeholder="Answer"
                className="w-full p-2 border rounded-lg mb-4 h-32"
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
                  className="px-4 py-2 bg-primary text-white rounded-lg"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentPage;

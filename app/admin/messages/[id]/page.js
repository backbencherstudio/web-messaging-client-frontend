"use client";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
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
          <div className="flex gap-4">
            <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90">
              Save Changes
            </button>
            <button className="bg-red-100 text-red-600 px-4 py-2 rounded-full hover:bg-red-200">
              Delete
            </button>
          </div>
        </div>
        <textarea
          className="w-full h-44 p-4 border border-gray-300 rounded-lg mt-6"
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="flex items-center gap-6">
            <FaCircleUser size={64} color="#c9ccd8" />
            <p className=" text-gray-500 flex flex-col">
              <span className="font-bold text-[#082B2E]">John Doe</span>
              <span className="text-gray-400">
                <span className=" text-[12px]">john@gmail.com</span>
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-20">
            <div>
              <p className="text-gray-400 text-[12px]">Time Posted</p>
              <p className="text-[#082B2E] ">April 28 , 2025</p>
            </div>
            <div>
              <p className="text-gray-400 text-[12px]">Views</p>
              <p className="text-[#082B2E] ">10,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;

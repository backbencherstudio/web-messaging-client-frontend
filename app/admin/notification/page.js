"use client";
import NotificationPage from "@/app/user/notification/Notification";
import React from "react";
import { FaAngleDown, FaUser } from "react-icons/fa6";

const notificationData = [
  {
    id: 1,
    name: "Robert Fox",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "1 hr ago",
    isRead: false,
  },
  {
    id: 2,
    name: "Jacob Jones",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "1 hr ago",
    isRead: false,
  },
  {
    id: 3,
    name: "Arlene McCoy",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "2 hrs ago",
    isRead: true,
  },
  {
    id: 4,
    name: "Esther Howard",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "1 day ago",
    isRead: true,
  },
  {
    id: 5,
    name: "Devon Lane",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "2 days ago",
    isRead: true,
  },
];

const Page = () => {
  return (
    <div className="">
      <NotificationPage />
    </div>
  );
};

export default Page;

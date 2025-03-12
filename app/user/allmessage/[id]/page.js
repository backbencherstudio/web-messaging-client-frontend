"use client";
import { useGetMessageByIdQuery } from "@/app/store/api/messageApi";
import { format } from "date-fns";
import { useParams } from "next/navigation";

export default function MessageDetail() {
  const { id } = useParams();
  const { data: message, isLoading, error } = useGetMessageByIdQuery(id);

  if (isLoading) {
    return <div className="mt-28 max-w-[1080px] mx-auto">Loading...</div>;
  }

  if (error) {
    return (
      <div className="mt-28 max-w-[1080px] mx-auto">Error loading message</div>
    );
  }

  return (
    <div className="flex justify-center pt-[100px] md:pt-[100px] lg:pt-[120px] bg-cover bg-no-repeat dark:bg-[url('/bg.png')]  pb-[500px]">
      <div className="m-4 border dark:border-[#545460] bg-white dark:bg-[#1E1E1E] text-[#070707] dark:text-[#FDFEFF] rounded-lg shadow-lg max-w-[1080px] w-full px-6 py-6 md:px-10 md:py-8 leading-[130%]">
        {/* Message Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Message</h1>
          <button className="bg-red-100 text-red-600  dark:bg-[#FFF4F70F] font-bold opacity-200  px-4 py-2 rounded-full text-sm hover:bg-red-200">
            Delete
          </button>
        </div>

        {/* Message Content */}
        <p className="text-gray-700 dark:text-gray-300 mt-6">
          {message.data.message_content}
        </p>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600 flex gap-24 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Time Posted: <br />{" "}
            {format(message.data.time_posted, "dd MMMM yyyy")}
          </p>
          <p>
            Views: <br />
            {message.data.views}
          </p>
        </div>
      </div>
    </div>
  );
}

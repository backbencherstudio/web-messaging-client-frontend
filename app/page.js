"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { IoIosSend } from "react-icons/io";
import { SiComma } from "react-icons/si";
import visa from "@/app/assets/visa.jpg";
import stripe from "@/app/assets/stripe.png";
import paypal from "@/app/assets/paypal.jpg";
import CustomTable from "./Components/SharedComponent/CustomTable";
import { messageData } from "./admin/data";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Footer from "./Components/SharedComponent/Footer";
import PaymentModal from "./Components/SharedComponent/PaymentModal";
import { useState } from "react";
import SuccessModal from "./Components/SharedComponent/SuccessModal";
import CookieBanner from "./Components/SharedComponent/Cookies";
import { useGetLeaderboardQuery } from "./store/api/leaderboardApi";
import { useGetAboutUsQuery, useGetAllFaqQuery } from "./store/api/faqApi";
import { useCreateMessageMutation } from "./store/api/messageApi";
import toast from "react-hot-toast";
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { data: leaderboardData } = useGetLeaderboardQuery();
  const { data: faqs } = useGetAllFaqQuery();
  const { data: about } = useGetAboutUsQuery();
  const [createMessage, { isLoading }] = useCreateMessageMutation();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const messageColumns = [
    { label: "Ranking", accessor: "ranking" },
    { label: "Message content", accessor: "message_content" },
    { label: "Posted by", accessor: "posted_by" },
    { label: "Views", accessor: "view_count" },
    { label: "Time Posted", accessor: "time" },
  ];

  const handleSubmit = () => {
    const data = {
      name: name,
      status: message,
    };
    createMessage(data)
      .unwrap()
      .then((res) => {
        setName("");
        setMessage("");
        toast.success("Message submitted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="home">
      <PaymentModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCloseSuccess={() => setOpenSuccess(false)}
        setOpenSuccess={setOpenSuccess}
      />
      <SuccessModal open={openSuccess} onClose={() => setOpenSuccess(false)} />

      <div>
        {/* about section  */}
        <div className="dark:bg-[url('/bg.png')] dark:bg-cover dark:bg-no-repeat ">
          <div className="md:pt-44 pt-24 md:pb-[66px] pb-[26px] max-w-[1080px] mx-auto px-5 2xl:px-0 ">
            <div className="border  rounded-lg dark:bg-custom-gradient">
              <div className="flex rounded-t-lg justify-between items-center bg-[#f7f9ff] px-4 lg:px-16 py-5 dark:bg-[#070707]">
                <h1 className="text-[clamp(1rem,2vw,2rem)] font-semibold dark:text-[#C9CCD8]">
                  Hey there! :)
                </h1>
                <span className="flex">
                  {/* <SiComma size={20} /> */}
                  {/* <SiComma size={20} /> */}
                </span>
              </div>

              <div className="px-4 lg:px-16  lg:py-16 py-8">
                <p className="text-[clamp(24px,2vw,2.2rem)] flex flex-col gap-4 text-gray-700 dark:text-[#C9CCD8]">
                  {/* In today&apos;s world, we are facing numerous pressing challenges,
                  but one of the most significant issues affecting humanity is
                  <span className="text-gray-500">
                    [mention the specific problem, e.g., climate change, poverty,
                    inequality, access to education]
                  </span>
                  . This issue continues to impact millions of lives, and addressing
                  it requires collective effort, innovation, and commitment. */}
                  <span>
                    Seems like you&apos;re first! Got something to say?
                  </span>
                </p>
              </div>
              <div className="flex md:flex-row flex-col justify-between border  bg-[#f7f9ff] dark:bg-[#070707] lg:x-8 lg:py-8 md:px-4 md:py-6 px-3 py-5 m-4 rounded-lg lg:text-lg text-base font-medium gap-4 md:gap-2 lg:gap-0">
                <p className="">
                  <span className="opacity-70">Message #:</span> 32
                </p>
                <p className="">
                  <span className="opacity-70">Current Value:</span> $ 0.50
                </p>
                <p className="">
                  <span className="opacity-70">Last Update:</span> 5:OOPM EST
                  (02/04/2025)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="dark:bg-[url('/shape-2.png')] dark:bg-center bg-cover dark:bg-no-repeat ">
          <div className="max-w-[1080px] mx-auto md:pb-[58px] pb-[26px] px-5 2xl:px-0 ">
            <h1 className="text-[clamp(32px,2vw,42px)] font-medium pt-[26px] lg:pt-[54px]">
              Is your message more valuable? Prove it!
            </h1>
            {/* payment form  */}
            <div className="border rounded-lg md:p-6 p-4 mt-4 dark:bg-custom-gradient">
              <Input
                placeholder="Who are you?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="py-8 px-6  md:placeholder:text-[18px] placeholder:text-[16px]"
              />
              <Textarea
                placeholder="What's your message?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="py-8 px-6 my-6 min-h-[274px] md:placeholder:text-[18px] placeholder:text-[16px] "
              />
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <Button
                  onClick={handleSubmit}
                  disabled={!name || !message}
                  className="w-full py-6 rounded-full text-[18px] cursor-pointer"
                >
                  Submit Free Message
                </Button>
                <Button
                  onClick={() => setShowModal(true)}
                  className="w-full py-6 hover:bg-gray-200 rounded-full bg-[#eff3fe] text-black dark:bg-[#1a1a1a] dark:text-white text-[18px]"
                >
                  Submit Message
                </Button>
              </div>
              <p className="text-[18px] opacity-70 my-8">
                Note: While the message value is low, you can say what you want
                for free! Just keep in mind, others can too
              </p>
              <p className="text-[18px] text-right">Payment Options </p>
              <div className="flex justify-end mt-4">
                <Image
                  src={visa}
                  alt="payment"
                  className="rounded-md mx-1 h-6 w-9"
                />
                <Image
                  src={stripe}
                  alt="payment"
                  className="rounded-md mx-1 h-6 w-9 "
                />
                <Image
                  src={paypal}
                  alt="payment"
                  className="rounded-md mx-1 h-6 w-9"
                />
              </div>
            </div>
          </div>
        </div>
        {/* leader board  */}
        <div className="dark:bg-[url('/shape-3.png')] dark:bg-cover dark:bg-center dark:bg-no-repeat ">
          <div
            id="leaderboard"
            className="max-w-[1080px] mx-auto px-5 2xl:px-0 md:pb-[72px] pb-[26px]"
          >
            <h1 className="text-[clamp(32px,2vw,42px)] font-medium pt-[26px] md:pt-[46px] lg:pt-[62px] md:pb-8 pb-6">
              Leaderboard
            </h1>
            {typeof window !== "undefined" && (
              <CustomTable
                title="Top 100 Most Viewed Messages"
                data={leaderboardData?.data || []}
                columns={messageColumns}
                pagination={true}
              />
            )}
          </div>
        </div>
        {/* faq  */}
        <div className="dark:bg-[url('/shape-4.png')] dark:bg-center dark:bg-cover dark:bg-no-repeat  ">
          <div
            id="faq"
            className="max-w-[1080px] mx-auto px-5 2xl:px-0 md:pb-[64px] pb-[26px]"
          >
            <h1 className="text-[clamp(1rem,2vw,2.7rem)] font-medium  md:pt-[48px] pt-[26px] ">
              Frequently Asked Questions (FAQ)
            </h1>
            <Accordion type="single" collapsible className="mt-8">
              {faqs?.data?.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-lg my-2"
                >
                  <AccordionTrigger className="text-[1.2rem] font-medium bg-gray-100 dark:bg-[#1B1B1C;] p-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[16px] text-[#393C44] dark:text-white dark:bg-[#0B0B0C] p-5 font-normal">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        {/* about us  */}
        <div className="dark:bg-[url('/shape-5.png')] dark:bg-center dark:bg-cover dark:bg-no-repeat backdrop-blur-[90px]">
          <div
            id="about"
            className="max-w-[1080px] mx-auto px-5 2xl:px-0 lg:pb-[77px] md:pb-[47px] pb-[26px]"
          >
            <h1 className="text-[clamp(1rem,2vw,2.7rem)] font-medium  pt-[26px] md:pt-[46px] lg:pt-[57px] ">
              About SayThat
            </h1>
            <p className="text-[clamp(1rem,2vw,1rem)] mt-9 text-[#393C44] dark:text-white">
              {about?.data?.about_us}
            </p>
          </div>
        </div>
        {/* contact us  */}
        <div className="dark:bg-[url('/shape-6.png')] dark:bg-cover dark:bg-bottom dark:bg-no-repeat ">
          <div
            id="contact"
            className="max-w-[1080px] mx-auto px-5 2xl:px-0 pb-[26px] md:pb-[56px]"
          >
            <h1 className="text-[clamp(1rem,2vw,2.7rem)] font-medium  md:pt-[43px] pt-[26px]">
              Contact Us
            </h1>
            <div className="border rounded-lg p-6 mt-8 dark:bg-custom-gradient">
              <Input
                placeholder="Name"
                className="py-8 px-6 placeholder:text-[16px] md:placeholder:text-[18px] dark:bg-[#0B0B0C]"
              />
              <Input
                placeholder="Email"
                className="py-8 px-6 mt-6 placeholder:text-[16px] md:placeholder:text-[18px] dark:bg-[#0B0B0C]"
              />
              <Select>
                <SelectTrigger className="py-8 px-6 mt-6 text-[16px] md:text-[18px] dark:bg-[#0B0B0C]">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    className="text-[16px] md:text-[18px]"
                    value="light"
                  >
                    Light
                  </SelectItem>
                  <SelectItem
                    className="text-[16px] md:text-[18px]"
                    value="dark"
                  >
                    Dark
                  </SelectItem>
                  <SelectItem
                    className="text-[16px] md:text-[18px]"
                    value="system"
                  >
                    System
                  </SelectItem>
                </SelectContent>
              </Select>

              <Textarea
                placeholder="Message"
                className="py-8 px-6 my-6 min-h-[274px] placeholder:text-[16px] md:placeholder:text-[18px] dark:bg-[#0B0B0C]  "
              />
              <Button className="bg-[#F3F6FE] hover:bg-[#070707] hover:text-white border border-[#070707] text-[#070707] py-[24px] px-[64px] rounded-[99px] text-[18px] font-medium">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CookieBanner />
    </div>
  );
}

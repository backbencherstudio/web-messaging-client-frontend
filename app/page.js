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

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const messageColumns = [
    { label: "Ranking", accessor: "pNo" },
    { label: "Message content", accessor: "messageContent" },
    { label: "Posted by", accessor: "postedBy" },
    { label: "Views", accessor: "views" },
    { label: "Time Posted", accessor: "timePosted" },
  ];
  const faqData = [
    {
      question: "How can I submit a message?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      question: "What is the payment process?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..",
    },
    {
      question: "How is the message ranking calculated?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      question: "Is there a limit to free submissions?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];
  return (
    <div id="home"  >
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
          <div className="md:pt-44 pt-24 md:pb-[66px] pb-[26px] max-w-[1080px] mx-auto px-4 lg:px-0 ">
            <div className="border  rounded-lg dark:bg-custom-gradient">
              <div className="flex rounded-t-lg justify-between items-center bg-[#f7f9ff] px-4 lg:px-16 py-5 dark:bg-[#070707]">
                <h1 className="text-[clamp(1rem,2vw,2rem)] font-semibold">
                  Wade Warren
                </h1>
                <span className="flex">
                  <SiComma size={20} />
                  <SiComma size={20} />
                </span>
              </div>

              <div className="px-4 lg:px-16  lg:py-16 py-8">
                <p className="text-[clamp(24px,2vw,2.2rem)]">
                  In today&apos;s world, we are facing numerous pressing challenges,
                  but one of the most significant issues affecting humanity is
                  <span className="text-gray-500">
                    [mention the specific problem, e.g., climate change, poverty,
                    inequality, access to education]
                  </span>
                  . This issue continues to impact millions of lives, and addressing
                  it requires collective effort, innovation, and commitment.
                </p>
              </div>
              <div className="flex md:flex-row flex-col justify-between border  bg-[#f7f9ff] dark:bg-[#070707] lg:x-8 lg:py-8 md:px-4 md:py-6 px-3 py-5 m-4 rounded-lg md:text-lg text-base font-medium gap-4 lg:gap-0">
                {/* <p className="">
              <span className="opacity-70">Messages No :</span> 32
            </p> */}
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

        <div className="dark:bg-[url('/shape-2.png')] dark:bg-cover dark:bg-no-repeat ">
          <div className="max-w-[1080px] mx-auto px-4 lg:px-0 ">
            <h1 className="text-[clamp(1rem,2vw,2.7rem)] font-medium pt-[26px] lg:pt-[54px]">
              Is your message more valuable? Prove it!
            </h1>
            {/* payment form  */}
            <div className="border rounded-lg p-6 mt-4 dark:bg-custom-gradient">
              <Input placeholder="Who are you?" className="py-8 px-6  md:placeholder:text-[18px] placeholder:text-[16px]" />
              <Textarea
                placeholder="What's your message?"
                className="py-8 px-6 my-6 min-h-[274px] md:placeholder:text-[18px] placeholder:text-[16px] "
              />
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <Button className="w-full py-6 rounded-full text-[18px]">
                  Submit Free Message
                </Button>
                <Button
                  onClick={() => setShowModal(true)}
                  className="w-full py-6 hover:bg-gray-200 rounded-full bg-[#eff3fe] text-black dark:bg-[#1a1a1a] dark:text-white text-[18px]"
                >
                  Submit Message
                </Button>
              </div>
              <p className="text-[18px] opacity-70 my-12">
                [ Note : After submitting 50 messages, further submissions will
                require payment at the current value.]
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
        <div id="leaderboard" className="max-w-[1080px] mx-auto px-4 lg:px-0 ">
          <h1 className="text-[clamp(1rem,2vw,2.7rem)] font-medium mt-16 lg:mt-28 mb-8">
            LeaderBoard
          </h1>

          <CustomTable
            title="Top Most views messages"
            data={messageData}
            columns={messageColumns}
          />
        </div>
        {/* faq  */}
        <div className="dark:bg-[url('/bg.png')] dark:bg-cover dark:bg-no-repeat ">
          <div id="faq" className="max-w-[1080px] mx-auto px-4 lg:px-0 ">
            <h1 className="text-[clamp(1rem,2vw,2.7rem)] font-medium mt-16 lg:mt-28">
              Frequently Asked Question (FAQ)
            </h1>
            <Accordion type="single" collapsible className="mt-8">
              {faqData.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-lg my-2"
                >
                  <AccordionTrigger className="text-[1.2rem] font-medium bg-gray-100 dark:bg-[#1a1a1a] p-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[16px] text-[#393C44] dark:text-white p-5 font-normal">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        {/* about us  */}
        <div id="about" className="max-w-[1080px] mx-auto px-4 lg:px-0 ">
          <h1 className="text-[clamp(1rem,2vw,2.7rem)] font-medium mt-16 lg:mt-28">
            About SayThat
          </h1>
          <p className="text-[clamp(1rem,2vw,1rem)] mt-9 text-[#393C44] dark:text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="text-[clamp(1rem,2vw,1rem)] mt-4 text-[#393C44] dark:text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        {/* contact us  */}
        <div id="contact" className="max-w-[1080px] mx-auto px-4 lg:px-0 ">
          <h1 className="text-[clamp(1rem,2vw,2.7rem)] font-medium mt-16 lg:mt-28">
            Contact Us
          </h1>
          <div className="border rounded-lg p-6 mt-8 mb-28">
            <Input placeholder="Name" className="py-8 px-6 placeholder:text-[16px] md:placeholder:text-[18px]" />
            <Input placeholder="Email" className="py-8 px-6 mt-6 placeholder:text-[16px] md:placeholder:text-[18px]" />
            <Select>
              <SelectTrigger className="py-8 px-6 mt-6 text-[16px] md:text-[18px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="text-[16px] md:text-[18px]" value="light">Light</SelectItem>
                <SelectItem className="text-[16px] md:text-[18px]" value="dark">Dark</SelectItem>
                <SelectItem className="text-[16px] md:text-[18px]" value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Message"
              className="py-8 px-6 my-6 min-h-[274px] placeholder:text-[16px] md:placeholder:text-[18px]"
            />
            <Button className="w-[188px] py-6 rounded-full text-[18px]">
              Submit
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

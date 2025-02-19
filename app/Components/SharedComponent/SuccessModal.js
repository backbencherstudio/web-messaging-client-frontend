import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const SuccessModal = ({ open, onClose }) => {
  return (
    <div >
      <Dialog open={open} onOpenChange={onClose} className="" >
        <DialogContent className=" text-lg p-6  pt-[80px] pb-[70px] rounded-lg  md:max-w-[528px] max-w-[90%] ">
          <div className="flex ">
            <div className="flex flex-col items-center justify-center md:w-full  ">
              <img className="max-w-[64px]" src="/congo.png" alt="" />
              <h1 className="text-[#070707] dark:text-[#FDFEFF] leading-normal my-[18px] md:text-[32px] text-2xl  font-medium">Congratulations!</h1>
              <p className="text-[#393C44] dark:text-[#A8AAB4] leading-[160%] text-center text-base  font-normal max-w-[414px]">Your payment has been successfully processed. Your message has been displayed—please check it now.</p>
              <div className="my-[48px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="442" height="2" viewBox="0 0 442 2" fill="none">
                  <path d="M1 1H441" stroke="#C9CCD8" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 5" />
                </svg>
              </div>
              <p className="text-[#393C44] dark:text-[#C9CCD8] leading-[160%] text-center text-base  font-medium" style={{ maxWidth: "34ch" }}>Register now to access your user dashboard and
                manage your message post easily.</p>
              <div className="flex gap-4 justify-center flex-row items-center mt-6">
                <button className="bg-[#070707]  dark:bg-[#F3F6FE] dark:text-[#070707] text-white px-[32px] py-4 rounded-[99px] border-[#070707] text-base font-medium">Register Now</button>
                <button><a href="" className="text-[#4A4C56] font-normal border-[#4A4C56] border-b dark:text-[#D1D7E5] dark:border-[#D1D7E5] ">Maybe Later</a></button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuccessModal;

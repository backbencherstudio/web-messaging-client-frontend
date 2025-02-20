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
import Image from "next/image";
import React from "react";

const SuccessModal = ({ open, onClose }) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="p-4 md:p-6 pt-12 md:pt-[80px] pb-8 md:pb-[70px] rounded-lg md:max-w-[528px] w-[95%] mx-auto">
          <div className="w-full">
            <div className="flex flex-col items-center justify-center w-full">
              <Image
                className="w-12 md:w-16"
                src="/congo.png"
                alt=""
                width={64}
                height={64}
              />
              <DialogTitle className="text-[#070707] dark:text-[#FDFEFF] leading-normal my-3 md:my-[18px] text-xl md:text-[32px] font-medium text-center">
                Congratulations!
              </DialogTitle>
              <p className="text-[#393C44] dark:text-[#A8AAB4] leading-[160%] text-center text-sm md:text-base font-normal max-w-[90%] md:max-w-[414px]">
              Your payment's been processed and your message was posted!
              </p>
              <div className="my-6 md:my-[48px] w-full max-w-[90%] md:max-w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="2"
                  viewBox="0 0 442 2"
                  fill="none"
                >
                  <path
                    d="M1 1H441"
                    stroke="#C9CCD8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="5 5"
                  />
                </svg>
              </div>
              <p className="text-[#393C44] dark:text-[#C9CCD8] leading-[160%] text-center text-sm md:text-base font-medium max-w-[90%] md:max-w-[40ch]">
              Let's see how many views it gets before someone decides theirs is more valuable
              </p>
              <div className="flex flex-col gap-3 md:gap-4 justify-center items-center mt-6">
                <button className="bg-[#070707] dark:bg-[#F3F6FE] dark:text-[#070707] text-white px-4 md:px-[16px] py-3 md:py- rounded-[36px] border-[#070707] text-sm md:text-base font-medium">
                Register now to claim ownership over your message and track its exposure!
                </button>
                <button>
                  <a
                    href=""
                    className="text-[#4A4C56] text-sm md:text-base font-normal border-[#4A4C56] border-b dark:text-[#D1D7E5] dark:border-[#D1D7E5]"
                  >
                    Maybe Later
                  </a>
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuccessModal;

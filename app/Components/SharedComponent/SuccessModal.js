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
        <DialogContent className="p-4 md:p-6 pt-12 md:pt-[60px] pb-8 md:pb-[50px] rounded-lg w-[85%] md:w-[95%] mx-auto">
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
              <p className="text-[#393C44] dark:text-[#A8AAB4] leading-[160%]  text-base font-normal text-center max-w-[24ch] md:max-w-full 
               ">
              Your payment's been processed and your message was posted!
              </p>
              <div className="my-6 md:my-[26px] w-full px-2">
              <div className="border-b border border-dashed border-[#C9CCD8] w-full "></div>

              </div>
              <p className="text-[#393C44] dark:text-[#C9CCD8] leading-[160%]  text-sm md:text-base font-medium  max-w-[29ch] md:max-w-full  ">
              Let's see how many views it gets before someone decides theirs is more valuable. 
              </p>
              <p className="text-[#393C44] dark:text-[#C9CCD8] leading-[160%]  text-sm md:text-base font-medium max-w-[29ch] md:max-w-full   mt-2">
               Register now to claim ownership over your message and track its exposure!
              </p>
              <div className="flex  gap-3 md:gap-4 justify-center items-center mt-6">
                <button className="bg-[#070707] dark:bg-[#F3F6FE] dark:text-[#070707] text-white px-6 md:px-[32px] py-3 md:py-[16px] rounded-[99px] border-[#070707] text-sm md:text-base font-medium">
                Register Now
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

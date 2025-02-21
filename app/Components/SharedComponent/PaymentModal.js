"use client";

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

const PaymentModal = ({ open, onClose, setOpenSuccess }) => {
  const handleSuccess = () => {
    setOpenSuccess(true);
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="text-lg p-4 md:p-6 pt-16 md:pt-[80px] pb-[40px] md:pb-[70px] rounded-lg md:max-w-[1080px] w-[95%] md:w-[90%]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Payment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Your Email"
            className="text-base md:text-lg p-6 md:p-8"
          />
          <Input
            placeholder="Amount ($)"
            className="text-base md:text-lg p-6 md:p-8"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="text-base md:text-lg p-6 md:p-8 flex-1"
            >
              Card
            </Button>
            <Button
              variant="outline"
              className="text-base md:text-lg p-6 md:p-8 flex-1"
            >
              EPS
            </Button>
            <Button
              variant="outline"
              className="text-base md:text-lg p-6 md:p-8 flex-1"
            >
              Giropay
            </Button>
          </div>
          <Input
            placeholder="Card number"
            className="text-base md:text-lg p-6 md:p-8"
          />
          <div className="flex flex-col md:flex-row gap-2">
            <Input
              placeholder="MM / YY"
              className="text-base md:text-lg p-6 md:p-8"
            />
            <Input
              placeholder="CVC"
              className="text-base md:text-lg p-6 md:p-8"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Select>
              <SelectTrigger className="text-base md:text-lg p-6 md:p-8">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent className="text-base md:text-lg">
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Postal code"
              className="text-base md:text-lg p-6 md:p-8"
            />
          </div>
          <div className="flex items-start md:items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 md:h-5 md:w-5 mt-1 md:mt-0"
            />
            <label htmlFor="terms" className="text-sm md:text-base">
              By agreeing to this, you accept the terms.
            </label>
          </div>
          <Button
            onClick={handleSuccess}
            className="w-full md:w-[234px] py-4 md:py-6 px-8 md:px-12 text-base md:text-lg rounded-full"
          >
            Payment & Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;

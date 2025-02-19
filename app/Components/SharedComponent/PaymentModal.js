"use client"

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
    <div >
      <div>
        <Dialog open={open} onOpenChange={onClose} >
          <DialogContent className="lg:max-w-[1080px] text-lg mx-5 md:mx-4 lg:mx-0 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl">Payment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Your Email" className="text-lg p-8" />
              <Input placeholder="Amount ($)" className="text-lg p-8" />
              <div className="flex gap-2">
                <Button variant="outline" className="text-lg p-8">
                  Card
                </Button>
                <Button variant="outline" className="text-lg p-8">
                  EPS
                </Button>
                <Button variant="outline" className="text-lg p-8">
                  Giropay
                </Button>
              </div>
              <Input placeholder="Card number" className="text-lg p-8" />
              <div className="flex gap-2">
                <Input placeholder="MM / YY" className="text-lg p-8" />
                <Input placeholder="CVC" className="text-lg p-8" />
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="text-lg p-8">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent className="text-lg">
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Postal code" className="text-lg p-8" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="terms" className="h-5 w-5" />
                <label htmlFor="terms" className="text-base">
                  By agreeing to this, you accept the terms. This payment is
                  non-refundable.
                </label>
              </div>
              <Button onClick={handleModal} className="w-[234px] py-6 px-12 text-lg rounded-full">
                Payment & Submit
              </Button>
            </div>
            <Input placeholder="Card number" className="text-lg p-8" />
            <div className="flex gap-2">
              <Input placeholder="MM / YY" className="text-lg p-8" />
              <Input placeholder="CVC" className="text-lg p-8" />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="text-lg p-8">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent className="text-lg">
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Postal code" className="text-lg p-8" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" className="h-5 w-5" />
              <label htmlFor="terms" className="text-base">
                By agreeing to this, you accept the terms. This payment is
                non-refundable.
              </label>
            </div>
            <Button
              onClick={handleSuccess}
              className="w-[234px] py-6 px-12 text-lg rounded-full"
            >
              Payment & Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentModal;

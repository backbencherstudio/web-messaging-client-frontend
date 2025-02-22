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
import { useState } from "react";

const PaymentModal = ({ open, onClose, setOpenSuccess }) => {   
  const [termsOpen, setTermsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleSuccess = () => {
    setOpenSuccess(true);
    onClose();
  };
  return (
    <>
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
              checked={isChecked}
              className="h-4 w-4 md:h-5 md:w-5 mt-1 md:mt-0"
              onChange={(e) => {
                if (!isChecked) {
                  setTermsOpen(true);
                }
                setIsChecked(e.target.checked);
              }}
            />
            <label htmlFor="terms" className="text-sm md:text-base">
              By agreeing to this, you accept the <span className="text-blue-500 cursor-pointer underline" >terms</span>.
            </label>
          </div>

          {/* Terms and Condition pop up box */}

          <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
          <DialogContent className="max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Terms and Conditions</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-4">
                <section>
                  <h3 className="text-lg font-semibold mb-2">1. Introduction</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    These Terms and Conditions govern your use of our service and website. By accessing or using our service, you agree to be bound by these terms.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">2. Definitions</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    "Service" refers to the website, platform, and all related services.
                    "User" refers to any individual or entity using our Service.
                    "Content" refers to all materials, information, and data available through our Service.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">3. User Accounts</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Users are responsible for maintaining the confidentiality of their account credentials.
                    You must immediately notify us of any unauthorized use of your account.
                    We reserve the right to terminate accounts that violate our terms.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">4. Privacy Policy</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our Privacy Policy describes how we collect, use, and protect your personal information.
                    By using our Service, you consent to our data practices as described in our Privacy Policy.
                    We implement various security measures to protect your personal information.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">5. Payment Terms</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    All payments are processed securely through our payment providers.
                    Fees are non-refundable unless otherwise specified.
                    We reserve the right to modify our pricing with appropriate notice.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">6. Intellectual Property</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    All content, features, and functionality are owned by us and protected by international copyright laws.
                    Users may not copy, modify, or distribute our content without permission.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">7. Limitation of Liability</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
                    Our liability is limited to the amount paid for our services.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">8. Changes to Terms</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We reserve the right to modify these terms at any time.
                    Continued use of the Service after changes constitutes acceptance of new terms.
                    Users will be notified of significant changes.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">9. Contact Information</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    For questions about these Terms, please contact us at support@example.com
                  </p>
                </section>
              </div>
              <div className="flex justify-end mt-6 pt-4 border-t">
                <Button onClick={() => setTermsOpen(false)}>Close</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Payment Button */}  
          <Button
            onClick={handleSuccess}
            className="w-full md:w-[234px] py-4 md:py-6 px-8 md:px-12 text-base md:text-lg rounded-full"
            disabled={!isChecked}
          >
            Payment & Submit
          </Button>
        </div>
      </DialogContent>
      </Dialog>
      
    </>
  );
};

export default PaymentModal;

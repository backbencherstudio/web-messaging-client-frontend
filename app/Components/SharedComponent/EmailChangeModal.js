"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const EmailChangeModal = ({ isOpen, onClose, onSubmit, currentEmail }) => {
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(newEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    if (newEmail === currentEmail) {
      setError("New email must be different from current email");
      return;
    }

    onSubmit(newEmail);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] md:w-[450px] rounded-lg dark:bg-[#1E1E1E] dark:text-[#FDFEFF]">
        <DialogTitle className="text-xl md:text-2xl font-medium mb-4">
          Change Email Address
        </DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Current Email
            </label>
            <Input
              type="email"
              value={currentEmail}
              disabled
              className="bg-gray-100 dark:bg-[#2A2A2A] cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">New Email</label>
            <Input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email address"
              className="dark:bg-[#2A2A2A] dark:border-[#545460]"
              required
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Continue
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="w-full bg-transparent text-black dark:text-white border border-black dark:border-[#545460] hover:bg-gray-100 dark:hover:bg-[#2A2A2A]"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailChangeModal;
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useResendOtpMutation } from "@/app/store/api/authApi";
import toast from "react-hot-toast";

const OtpVerificationModal = ({ isOpen, onClose, onSubmit, email }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  useEffect(() => {
    let interval;
    if (isOpen) {
      setTimer(60);
      setCanResend(false);
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
      setOtp("");
      setTimer(60);
      setCanResend(false);
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }
    onSubmit(otp);
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("Email is required for resending OTP");
      return;
    }

    try {
      const response = await resendOtp(email).unwrap();
      if (response.success) {
        toast.success(response.message);
        setTimer(60);
        setCanResend(false);
        setOtp("");
        // Restart the timer
        const newInterval = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(newInterval);
              setCanResend(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (err) {
      toast.error(
        err?.data?.message?.message?.[0] || "Failed to resend verification code"
      );
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]+$/.test(value)) {
      setOtp(value);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[80%] md:w-[50%] rounded-lg">
        <div className="w-full text-center p-6">
          <DialogTitle className="text-[#070707] dark:text-[#FDFEFF] leading-normal my-3 md:my-[18px] text-xl md:text-[32px] font-medium text-center">
            Enter Verification Code
          </DialogTitle>
          <p className="text-[#393C44] dark:text-[#A8AAB4] leading-[160%] text-base font-normal text-center mb-6">
            Please enter the verification code sent to your email
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <input
                type="text"
                value={otp}
                onChange={handleInputChange}
                placeholder="Enter 6-digit code"
                className="border border-[#DFE1E7] dark:border-[#393C44] rounded-[8px] md:p-6 px-6 py-5 placeholder:text-[#878991] dark:bg-[#0B0B0C] dark:text-[#878991] dark:placeholder:text-[#878991] w-full text-center text-lg tracking-wider"
                maxLength={6}
                autoFocus
              />

              <div className="text-sm text-[#393C44] dark:text-[#A8AAB4] mt-2">
                {timer > 0 ? (
                  <p>Resend code in {formatTime(timer)}</p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isResending}
                    className="text-[#070707] dark:text-[#F3F6FE] hover:underline disabled:opacity-50"
                  >
                    {isResending ? "Resending..." : "Resend verification code"}
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full bg-[#070707] dark:bg-[#F3F6FE] dark:text-[#070707] text-white font-medium py-6"
              >
                Verify
              </Button>
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="w-full border-[#070707] dark:border-[#F3F6FE] text-[#070707] dark:text-[#F3F6FE] font-medium py-6"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtpVerificationModal;

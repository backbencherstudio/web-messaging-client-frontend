"use client";

import { useCreatePaymentMutation } from "@/app/store/api/paymentApi";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useGetProfileQuery } from "@/app/store/api/authApi";
import { useDispatch } from "react-redux";
import { baseApi } from "@/app/store/api/baseApi";
import { useSocket } from "@/lib/hooks/useSocket";

// Initialize Stripe (put your publishable key here)
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// Stripe element style (value-based model; no count dependency)
const getStripeElementStyle = (isDisabled, isDark) => ({
  style: {
    base: {
      fontSize: "16px",
      color: isDisabled ? "#9CA3AF" : isDark ? "white" : "#1F2937",
      "::placeholder": {
        color: isDisabled ? "#9CA3AF" : isDark ? "white" : "#1F2937",
      },
      backgroundColor: isDisabled
        ? isDark
          ? ""
          : "#F3F4F6"
        : isDark
        ? ""
        : "#FFFFFF",
    },
    invalid: {
      color: "#EF4444",
      iconColor: "#EF4444",
    },
  },
  disabled: isDisabled,
});

const PaymentForm = ({ onSuccess, onClose, name, message, initialAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(
    initialAmount?.toFixed ? initialAmount.toFixed(2) : initialAmount ?? ""
  );
  const [minimumBid, setMinimumBid] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const { data: profile } = useGetProfileQuery();
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  const [email, setEmail] = useState("");

  const [isDark, setIsDark] = useState(false);
  const [isEditingAmount, setIsEditingAmount] = useState(false);

  const stripeElementStyle = getStripeElementStyle(false, isDark);

  // ✅ NEW: Socket hook
  const { on, off, isConnected } = useSocket();

  useEffect(() => {
    // Set theme based on localStorage or default to light
    const themes = localStorage.getItem("theme");
    if (themes === "dark") {
      setIsDark(true);
    }
  }, [isDark]);

  // Fetch initial minimum bid from API
  const fetchMinimumBid = useCallback(async () => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"
        }/post-status/recent-status`
      );
      const data = await response.json();

      if (data.success && data.minimumBid) {
        setMinimumBid(data.minimumBid);
        // Only set the input if we don't already have an initial amount and the field is empty (first load)
        if (!initialAmount && amount === "") {
          setAmount(data.minimumBid.toFixed(2));
        }
        setIsInitialLoad(false);
      }
    } catch (error) {
      console.error("Error fetching minimum bid:", error);
    }
  }, [initialAmount]);

  // Handle minimum bid updates from socket
  const handleMinimumBidUpdate = useCallback(
    (data) => {
      console.log("Received minimum amount update:", data);

      if (!isInitialLoad && data && typeof data === "object") {
        const newMinimumBid = data.minimumBid || data.minimum_bid || data;

        if (typeof newMinimumBid === "number" && newMinimumBid !== minimumBid) {
          toast.success(
            `Minimum amount updated to $${newMinimumBid.toFixed(2)}`
          );
          setMinimumBid(newMinimumBid);
          // Only bump the amount if user isn't editing or their typed amount is now below the new minimum
          const typed = parseFloat(amount);
          const shouldBump = isNaN(typed) || typed < newMinimumBid;
          if (!isEditingAmount || shouldBump) {
            setAmount(newMinimumBid.toFixed(2));
          }
        }
      }
    },
    [minimumBid, isInitialLoad, isEditingAmount, amount]
  );

  // ✅ UPDATED: Use global socket service
  useEffect(() => {
    const handleBidUpdate = (data) => {
      handleMinimumBidUpdate(data);
    };

    on("payment:bid-updated", handleBidUpdate);

    return () => {
      off("payment:bid-updated", handleBidUpdate);
    };
  }, [on, off, handleMinimumBidUpdate]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Require a valid email for payment (anonymous users must provide one)
    const effectiveEmail = profile?.data?.email || email;
    if (!effectiveEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(effectiveEmail)) {
      toast.error(
        "Please enter a valid email address to proceed with payment."
      );
      return;
    }

    // Validate minimum bid (paid is always available)
    if (parseFloat(amount) < minimumBid) {
      toast.error(`Amount must be at least $${minimumBid.toFixed(2)}`);
      return;
    }

    setLoading(true);

    try {
      // First create payment intent with your API
      const paymentResponse = await createPayment({
        name: name,
        status: message,
        bidAmount: parseFloat(amount),
        email: effectiveEmail,
      }).unwrap();

      if (!paymentResponse.success) {
        throw new Error(paymentResponse.message);
      }

      const { clientSecret, anonymousUserId } = paymentResponse.data || {};

      // Confirm the payment (always paid path)
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              email: effectiveEmail,
            },
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        try {
          // If user is anonymous and backend provided an anonymousUserId, persist for later claim
          const hasToken = Boolean(localStorage.getItem("token"));
          if (!hasToken && anonymousUserId) {
            const claim = {
              anonymousUserId,
              createdAt: new Date().toISOString(),
            };
            localStorage.setItem("pendingClaim", JSON.stringify(claim));
          }
        } catch (_) {}
        setTimeout(() => {
          dispatch(
            baseApi.util.invalidateTags([
              "PostStatus",
              "Payment",
              "Messages",
              "Leaderboard",
              "User",
            ])
          );

          dispatch(
            baseApi.endpoints.getLastMessage.initiate(undefined, {
              subscribe: false,
              forceRefetch: true,
            })
          );

          toast.success("Payment successful!");
          onSuccess();
          onClose();
        }, 500);
      }
    } catch (error) {
      console.error("Payment failed:", error);

      // Map backend error hints to helpful UI actions
      const backend = error?.data || {};
      const errorMessage =
        backend?.message?.message?.[0] ||
        error?.message?.message?.[0] ||
        backend?.message ||
        error?.message ||
        "Payment failed";

      // If bid was too low, offer the suggested/minimum bid
      if (typeof backend?.suggestedBid === "number") {
        const suggested = backend.suggestedBid;
        setAmount(suggested.toFixed ? suggested.toFixed(2) : String(suggested));
        toast.error(errorMessage);
        toast((t) => (
          <span>
            Suggested amount applied: ${""}
            {suggested.toFixed
              ? suggested.toFixed(2)
              : Number(suggested).toFixed(2)}
          </span>
        ));
        return;
      }

      // If a payment lock is active, inform user about remaining time
      if (
        backend?.lockInfo?.timeMessage ||
        typeof backend?.lockInfo?.remainingSeconds === "number"
      ) {
        const msg =
          backend?.lockInfo?.timeMessage ||
          `${backend?.lockInfo?.remainingSeconds}s`;
        toast.error(`${errorMessage} Please wait ${msg} and try again.`);
        return;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMinimumBid();
  }, [fetchMinimumBid]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        disabled={profile?.data?.email ? true : false}
        value={profile?.data?.email}
        placeholder="Enter your email"
        className="text-base md:text-lg p-6 bg-gray-200 dark:bg-transparent"
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="relative">
        <Input
          type="number"
          placeholder="Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onFocus={() => setIsEditingAmount(true)}
          onBlur={(e) => {
            setIsEditingAmount(false);
            const v = parseFloat(e.target.value);
            if (
              isNaN(v) ||
              (typeof minimumBid === "number" && v < minimumBid)
            ) {
              if (typeof minimumBid === "number") {
                setAmount(minimumBid.toFixed(2));
              }
            } else {
              setAmount(v.toFixed(2));
            }
          }}
          className={`text-base md:text-lg p-6 ${
            minimumBid && parseFloat(amount) < minimumBid
              ? "border-red-500 focus-visible:ring-red-500"
              : ""
          }`}
          required
        />
        {minimumBid && (
          <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
            Minimum amount: ${minimumBid.toFixed(2)}
            {isConnected && (
              <span className="ml-2 text-green-500 text-xs">
                (Live updates active)
              </span>
            )}
          </div>
        )}
      </div>

      <div className="border rounded-lg p-4 bg-white dark:bg-transparent">
        <CardNumberElement options={stripeElementStyle} />
      </div>

      <div className="flex gap-2">
        <div
          className={`border rounded-lg p-4 bg-white dark:bg-transparent flex-1`}
        >
          <CardExpiryElement options={stripeElementStyle} />
        </div>
        <div
          className={`border rounded-lg p-4 bg-white dark:bg-transparent flex-1`}
        >
          <CardCvcElement options={stripeElementStyle} className="" />
        </div>
      </div>

      <Button
        type="submit"
        disabled={
          !stripe || loading || !amount || parseFloat(amount) < minimumBid
        }
        className="w-full py-4 md:py-6 px-8 md:px-12 text-base md:text-lg rounded-full dark:bg-nav-dark-gradient dark:text-white"
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

const PaymentModal = ({
  isOpen,
  onClose,
  onSuccess,
  name,
  message,
  initialAmount,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="text-lg p-4 px-10 md:pt-[80px] pb-[40px] md:pb-[70px] rounded-lg md:max-w-[600px] w-[95%] md:w-[90%]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Payment Details</DialogTitle>
        </DialogHeader>

        <Elements stripe={stripePromise}>
          <PaymentForm
            onSuccess={onSuccess}
            onClose={onClose}
            name={name}
            message={message}
            initialAmount={initialAmount}
          />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;

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
import { useGetLastMessageQuery } from "@/app/store/api/leaderboardApi";
import { useDispatch } from "react-redux";
import { baseApi } from "@/app/store/api/baseApi";
import { useSocket } from "@/lib/hooks/useSocket";

// Initialize Stripe (put your publishable key here)
const stripePromise = loadStripe(
  "pk_test_51Nokq8C8szXM8fPRu5jOPBoutxbXYDbnV7IpDIyNOG1HcLiI8XYA9xPbooHLoho7uAplF3wO5MtPfc3VadQcALN900Td6TrGBL"
);

// First, create a dynamic style object based on the postCount
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

const PaymentForm = ({ onSuccess, onClose, name, message }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [minimumBid, setMinimumBid] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const { data: profile } = useGetProfileQuery();
  const { data: lastMessage } = useGetLastMessageQuery();
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  const [email, setEmail] = useState("");

  const [isDark, setIsDark] = useState(false);

  const stripeElementStyle = getStripeElementStyle(
    lastMessage?.postCount < 50,
    isDark
  );

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
        setAmount(data.minimumBid.toFixed(2));
        setIsInitialLoad(false);
      }
    } catch (error) {
      console.error("Error fetching minimum bid:", error);
    }
  }, []);

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
          setAmount(newMinimumBid.toFixed(2));
        }
      }
    },
    [minimumBid, isInitialLoad]
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

    // Validate minimum bid
    if (lastMessage?.postCount >= 50 && parseFloat(amount) < minimumBid) {
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
        email: profile?.data?.email || email,
      }).unwrap();

      if (!paymentResponse.success) {
        throw new Error(paymentResponse.message);
      }

      const { clientSecret } = paymentResponse.data;

      // Confirm the payment
      if (lastMessage?.postCount >= 50) {
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardNumberElement),
              billing_details: {
                email: profile?.data?.email,
              },
            },
          }
        );

        if (error) {
          throw new Error(error.message);
        } else if (paymentIntent.status === "succeeded") {
          setTimeout(() => {
            dispatch(
              baseApi.util.invalidateTags([
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
      } else {
        toast.success("Your Message is posted Free.");

        setTimeout(() => {
          dispatch(
            baseApi.util.invalidateTags([
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

          onSuccess();
          onClose();
        }, 500);
      }
    } catch (error) {
      console.error("Payment failed:", error);

      const errorMessage =
        error?.data?.message?.message?.[0] ||
        error?.message?.message?.[0] ||
        error?.message ||
        "Payment failed";

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
          disabled={lastMessage?.postCount < 50}
          type="number"
          placeholder="Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`text-base md:text-lg p-6 ${
            minimumBid &&
            parseFloat(amount) < minimumBid &&
            lastMessage?.postCount >= 50
              ? "border-red-500 focus-visible:ring-red-500"
              : ""
          }`}
          required
        />
        {minimumBid && lastMessage?.postCount >= 50 && (
          <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
            Minimum amount: ${minimumBid.toFixed(2)}
            {/* ✅ UPDATED: Use global socket connection status */}
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
          className={`border rounded-lg p-4 bg-white dark:bg-transparent flex-1 ${
            lastMessage?.postCount < 50 ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          <CardExpiryElement
            options={stripeElementStyle}
            disabled={lastMessage?.postCount < 50}
            onChange={(e) => {
              if (lastMessage?.postCount < 50) {
                toast.error("You need at least 50 posts to make a payment");
              }
            }}
          />
        </div>
        <div
          className={`border rounded-lg p-4 bg-white dark:bg-transparent flex-1 ${
            lastMessage?.postCount < 50 ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          <CardCvcElement
            options={stripeElementStyle}
            disabled={lastMessage?.postCount < 50}
            className=""
            onChange={(e) => {
              if (lastMessage?.postCount < 50) {
                toast.error("You need at least 50 posts to make a payment");
              }
            }}
          />
        </div>
      </div>

      {lastMessage?.postCount < 50 && (
        <p className="text-sm text-red-500 mt-2">
          At least 50 posts to make a payment. Current posts:{" "}
          {lastMessage?.postCount}
        </p>
      )}

      <Button
        type="submit"
        disabled={
          !stripe ||
          loading ||
          (lastMessage?.postCount >= 50 &&
            (!amount || parseFloat(amount) < minimumBid))
        }
        className="w-full py-4 md:py-6 px-8 md:px-12 text-base md:text-lg rounded-full dark:bg-nav-dark-gradient dark:text-white"
      >
        {loading
          ? "Processing..."
          : lastMessage?.postCount < 50
          ? "Pay Now (Free)"
          : "Pay Now"}
      </Button>
    </form>
  );
};

const PaymentModal = ({ isOpen, onClose, onSuccess, name, message }) => {
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
          />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;

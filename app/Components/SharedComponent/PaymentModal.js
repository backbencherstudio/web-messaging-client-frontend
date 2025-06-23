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
import io from "socket.io-client";
// Add these imports at the top of your file
import { useDispatch } from "react-redux";
import { baseApi } from "@/app/store/api/baseApi";

// Initialize Stripe (put your publishable key here)
const stripePromise = loadStripe(
  "pk_test_51Nokq8C8szXM8fPRu5jOPBoutxbXYDbnV7IpDIyNOG1HcLiI8XYA9xPbooHLoho7uAplF3wO5MtPfc3VadQcALN900Td6TrGBL"
);

// Socket connection URL
const SOCKET_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
  "http://localhost:4000";

// First, create a dynamic style object based on the postCount
const getStripeElementStyle = (isDisabled, isDark) => ({
  style: {
    base: {
      fontSize: "16px",
      color: isDisabled ? "#9CA3AF" : isDark ? "white" : "#1F2937",
      "::placeholder": {
        color: isDisabled ? "#9CA3AF" : isDark ? "white" : "#1F2937",
      },
      backgroundColor: isDisabled ? (isDark ? "" : "#F3F4F6" )  : isDark ? "" : "#FFFFFF",
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
  const [email,setEmail] = useState("")

  const [isDark, setIsDark] = useState(false);

  const stripeElementStyle = getStripeElementStyle(
    lastMessage?.postCount < 50,
    isDark
  );

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
      console.log("Received minimum amount update:", data); // Add logging to see the actual data structure

      // Check if data exists and has the expected structure
      if (!isInitialLoad && data && typeof data === "object") {
        // Extract minimumBid from the data object - adjust this based on your actual data structure
        const newMinimumBid = data.minimumBid || data.minimum_bid || data;

        if (typeof newMinimumBid === "number" && newMinimumBid !== minimumBid) {
          // Use toast.success instead of toast.info which doesn't exist in react-hot-toast
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

  // Setup socket connection with authentication
  useEffect(() => {
    let socket;

    const connectSocket = () => {
      // Get authentication token from localStorage
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      // if (!token) {
      //   console.error("No authentication token found");
      //   return;
      // }

      // Initialize socket with auth token
      socket = io(SOCKET_URL, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        auth: {
          token: token,
        },
      });

      socket.on("connect", () => {
        console.log("Socket connected with authentication");
        setSocketConnected(true);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
        setSocketConnected(false);
      });

      // Add more detailed logging for the minimum-bid-updated event
      socket.on("minimum-bid-updated", (data) => {
        console.log("Received minimum-bid-updated event with data:", data);
        handleMinimumBidUpdate(data);
      });

      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        setSocketConnected(false);
      });
    };

    // Fetch initial data and connect to socket
    fetchMinimumBid();
    connectSocket();

    // Cleanup function
    return () => {
      if (socket) {
        socket.off("minimum-bid-updated");
        socket.disconnect();
      }
    };
  }, [fetchMinimumBid, handleMinimumBidUpdate]);

  const dispatch = useDispatch(); // Add this line to get the dispatch function

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
        bidAmount: parseFloat(amount), // Convert to number
        email: profile?.data?.email || email, // Use email from profile or input
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
          // Add a small delay before invalidating tags to ensure backend processing is complete
          setTimeout(() => {
            // Use the same tags for both paid and free posts for consistency
            dispatch(
              baseApi.util.invalidateTags([
                "Payment",
                "Messages",
                "Leaderboard",
                "User",
              ])
            );

            // Force refetch the last message query
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

        // Use the same tags for consistency with a small delay
        setTimeout(() => {
          dispatch(
            baseApi.util.invalidateTags([
              "Payment",
              "Messages",
              "Leaderboard",
              "User",
            ])
          );

          // Force refetch the last message query
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

      // Update error handling to show the nested message
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        disabled = {profile?.data?.email ? true : false}
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
            {socketConnected && (
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
        className="w-full py-4 md:py-6 px-8 md:px-12 text-base md:text-lg rounded-full  dark:bg-nav-dark-gradient  dark:text-white "
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

const PaymentModal = ({ open, onClose, setOpenSuccess, name, message }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="text-lg p-4  px-10 md:pt-[80px] pb-[40px] md:pb-[70px] rounded-lg md:max-w-[600px] w-[95%] md:w-[90%] ">
        <DialogHeader>
          <DialogTitle className="text-2xl">Payment Details</DialogTitle>
        </DialogHeader>

        <Elements stripe={stripePromise}>
          <PaymentForm
            onSuccess={() => setOpenSuccess(true)}
            onClose={onClose}
            name={name}
            message={message}
            // email={email}
          />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;

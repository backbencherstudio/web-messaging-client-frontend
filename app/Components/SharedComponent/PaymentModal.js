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
import { useState } from "react";
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

// Initialize Stripe (put your publishable key here)
const stripePromise = loadStripe(
  "pk_test_51Nokq8C8szXM8fPRu5jOPBoutxbXYDbnV7IpDIyNOG1HcLiI8XYA9xPbooHLoho7uAplF3wO5MtPfc3VadQcALN900Td6TrGBL"
);

// First, create a dynamic style object based on the postCount
const getStripeElementStyle = (isDisabled) => ({
  style: {
    base: {
      fontSize: "16px",
      color: isDisabled ? "#9CA3AF" : "#1F2937",
      "::placeholder": {
        color: isDisabled ? "#9CA3AF" : "#6B7280",
      },
      backgroundColor: isDisabled ? "#F3F4F6" : "#ffffff",
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
  const { data: profile } = useGetProfileQuery();
  const { data: lastMessage } = useGetLastMessageQuery();
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  console.log(profile);

  const stripeElementStyle = getStripeElementStyle(lastMessage?.postCount < 50);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      console.log(name, message, amount);

      // First create payment intent with your API
      const paymentResponse = await createPayment({
        name: name,
        status: message,
        bidAmount: parseFloat(amount), // Convert to cents
      }).unwrap();

      if (!paymentResponse.success) {
        throw new Error(paymentResponse.message);
      }

      const { clientSecret } = paymentResponse.data;

      // Confirm the payment
      {
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
            return;
          } else {
            if (paymentIntent.status === "succeeded") {
              toast.success("Payment successful!");
              onSuccess();
              onClose();
              window.location.reload();
            }
          }
        } else {
          toast.success("Your Message is posted Free.");
          onSuccess();
          onClose();
        }
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error(error.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        disabled
        value={profile?.data?.email}
        className="text-base md:text-lg p-6 bg-gray-200"
      />

      <Input
        disabled={lastMessage?.postCount < 50}
        type="number"
        placeholder="Amount ($)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="text-base md:text-lg p-6"
        required
      />

      <div className="border rounded-lg p-4 bg-white">
        <CardNumberElement options={stripeElementStyle} />
      </div>

      <div className="flex gap-2">
        <div
          className={`border rounded-lg p-4 bg-white flex-1 ${
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
          className={`border rounded-lg p-4 bg-white flex-1 ${
            lastMessage?.postCount < 50 ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          <CardCvcElement
            options={stripeElementStyle}
            disabled={lastMessage?.postCount < 50}
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
        disabled={!stripe || loading}
        className="w-full py-4 md:py-6 px-8 md:px-12 text-base md:text-lg rounded-full"
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
      <DialogContent className="text-lg p-4 px-10 md:pt-[80px] pb-[40px] md:pb-[70px] rounded-lg md:max-w-[600px] w-[95%] md:w-[90%]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Payment Details</DialogTitle>
        </DialogHeader>

        <Elements stripe={stripePromise}>
          <PaymentForm
            onSuccess={() => setOpenSuccess(true)}
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

// src/components/payment/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const [state, setState] = useState("loading"); // loading | ok | error

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bookingId = params.get("bookingId");
    const token = params.get("Token") || params.get("token"); // depending on Saferpay

    if (!bookingId || !token) {
      setState("error");
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/booking/saferpay-assert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId, token }),
        });

        const data = await res.json();
        if (!res.ok || !data.ok) {
          throw new Error(data.error || "assert_failed");
        }
        setState("ok");
      } catch (e) {
        console.error("assert error", e);
        setState("error");
      }
    })();
  }, []);

  if (state === "loading") return <p>Finalising your payment...</p>;
  if (state === "error") return <p>We could not confirm your payment. Please contact reception.</p>;

  return (
    <div>
      <h2>Thank you!</h2>
      <p>Your payment has been confirmed and your booking is now guaranteed.</p>
    </div>
  );
};

export default PaymentSuccess;

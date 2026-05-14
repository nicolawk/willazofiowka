import React, { useEffect, useState, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import "../../cssfiles/booking/BookingForm.css";
import BookingCalendar from "./BookingCalendar";

// FIXED PRICES (PLN per night) – make sure they match server ROOM_RATES
const ROOM_RATES = {
  family5: 400,  // 400 PLN / night
  tatra3: 550,
  deluxe1: 480,
  deluxe4: 520,
  family2: 400,
};

const BookingForm = () => {
  const { t, i18n } = useTranslation("booking");

  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [today, setToday] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [apartmentId, setApartmentId] = useState("");
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const [includeBreakfast, setIncludeBreakfast] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card"); // "card" | "crypto"

  // Guests as controlled inputs (needed for price)
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Baby crib
  const [cribEnabled, setCribEnabled] = useState(false);
  const [cribCount, setCribCount] = useState(1); // max 5

  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  const rooms = [
    { id: "family5", nameKey: "rooms.family5" },
    { id: "tatra3", nameKey: "rooms.tatra3" },
    { id: "deluxe1", nameKey: "rooms.deluxe1" },
    { id: "deluxe4", nameKey: "rooms.deluxe4" },
    { id: "family2", nameKey: "rooms.family2" },
  ];

  useEffect(() => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    setToday(
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    );
  }, []);

  useEffect(() => {
    if (isPrivacyOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus();
      const onKey = (e) => {
        if (e.key === "Escape") setIsPrivacyOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [isPrivacyOpen]);

  // If children go to 0, hide + reset crib options
  useEffect(() => {
    if (children <= 0) {
      setCribEnabled(false);
      setCribCount(1);
    }
  }, [children]);

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      setIsPrivacyOpen(false);
    }
  };

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const a = new Date(checkIn);
    const b = new Date(checkOut);
    return Math.max(0, Math.round((b - a) / (1000 * 60 * 60 * 24)));
  }, [checkIn, checkOut]);

  // Room amount: fixed price × nights
  const roomAmount = useMemo(() => {
    if (!apartmentId || !nights) return 0;
    const nightly = ROOM_RATES[apartmentId] || 0;
    return nightly * nights; // PLN
  }, [apartmentId, nights]);

  // Breakfast: 50 PLN × (adults + children) × nights
  const breakfastAmount = useMemo(() => {
    if (!includeBreakfast) return 0;
    if (!nights) return 0;
    const persons = (Number(adults) || 0) + (Number(children) || 0);
    if (!persons) return 0;
    return 50 * persons * nights;
  }, [includeBreakfast, nights, adults, children]);

  // Baby crib: 50 PLN × cribCount (per stay)
  const cribAmount = useMemo(() => {
    if (!cribEnabled) return 0;
    const count = Number(cribCount) || 0;
    if (!count) return 0;
    return 50 * count;
  }, [cribEnabled, cribCount]);

  // Total estimate (PLN)
  const totalAmount = roomAmount + breakfastAmount + cribAmount;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", message: t("statusSending") });

    const form = new FormData(e.currentTarget);
    if (form.get("website")) return; // honeypot

    if (!form.get("apartmentId")) {
      setStatus({ state: "error", message: t("errorApartment") });
      return;
    }
    if (nights < 1) {
      setStatus({ state: "error", message: t("errorDates") });
      return;
    }
    if (form.get("consent") !== "on") {
      setStatus({ state: "error", message: t("errorConsent") });
      return;
    }

    const payload = {
      apartmentId: form.get("apartmentId"),
      checkIn: form.get("checkIn"),
      checkOut: form.get("checkOut"),
      nights,
      adults: Number(form.get("adults")),
      children: Number(form.get("children")),
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      email: form.get("email"),
      phone: form.get("phone"),
      requests: form.get("requests"),
      consent: true,
      includeBreakfast,
      paymentMethod,
      lang: i18n.language,
      cribEnabled,
      cribCount: cribEnabled ? cribCount : 0,
    };

    try {
      const res = await fetch("/api/booking/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.paymentUrl) {
        const serverMsg = data?.error || `HTTP ${res.status}`;
        throw new Error(serverMsg);
      }

      // redirect to Saferpay / crypto checkout
      window.location.href = data.paymentUrl;
    } catch (err) {
      console.error("Booking checkout error:", err);
      setStatus({
        state: "error",
        message: t("statusError"),
      });
    }
  }

   return (
    <section className="booking-form-wrap">
      <div className="booking-form-card">
        <h2 className="bf-title">{t("temporaryTitle")}</h2>

        <p className="bf-subtext">
          {t("temporaryTechnicalIssues")}
        </p>
      </div>
      {false && (
        <>
          <div className="booking-form-card">
            <h2 className="bf-title">{t("title")}</h2>
            <p className="bf-subtext">{t("subtitle")}</p>

            {/* Paste your existing full <form>...</form> here */}
          </div>

          {/* Paste your existing Privacy Policy Modal block here */}
        </>
      )}
    </section>
  );
};

export default BookingForm;

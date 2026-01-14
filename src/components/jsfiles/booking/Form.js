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
        <h2 className="bf-title">{t("title")}</h2>
        <p className="bf-subtext">{t("subtitle")}</p>

        <form className="bf-grid" onSubmit={handleSubmit} noValidate>
          {/* Apartment */}
          <div className="bf-field">
            <label htmlFor="apartmentId">{t("apartment")}</label>
            <div className="bf-select-wrap">
              <select
                id="apartmentId"
                name="apartmentId"
                required
                value={apartmentId}
                onChange={(e) => setApartmentId(e.target.value)}
              >
                <option value="">{t("selectApartment")}</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {t(r.nameKey)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dates via booking calendar */}
          <div className="bf-field bf-field--full">
            <label>
              {t("stayDates") || `${t("checkIn")} / ${t("checkOut")}`}
            </label>

            <input type="hidden" name="checkIn" value={checkIn} />
            <input type="hidden" name="checkOut" value={checkOut} />

            <BookingCalendar
              initialCheckIn={checkIn || today}
              initialCheckOut={checkOut || today}
              onChange={({ checkIn, checkOut }) => {
                setCheckIn(checkIn);
                setCheckOut(checkOut);
              }}
            />

            {nights > 0 && (
              <small className="bf-hint">
                {t("nights", { count: nights })}
              </small>
            )}
          </div>

          {/* Guests */}
          <div className="bf-field">
            <label htmlFor="adults">{t("adults")}</label>
            <input
              type="number"
              id="adults"
              name="adults"
              min="1"
              max="6"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value) || 1)}
              required
            />
          </div>

          <div className="bf-field">
            <label htmlFor="children">{t("children")}</label>
            <input
              type="number"
              id="children"
              name="children"
              min="0"
              max="6"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value) || 0)}
            />
          </div>

          {/* Breakfast */}
          <div className="bf-field bf-field--full">
            <label className="bf-checkbox">
              <input
                type="checkbox"
                name="breakfast"
                checked={includeBreakfast}
                onChange={(e) => setIncludeBreakfast(e.target.checked)}
              />
              {t("breakfastLabel")}{" "}
              <span className="bf-hint-inline">
                {breakfastAmount > 0
                  ? t("breakfastAmount", { amount: breakfastAmount })
                  : t("breakfastHint")}
              </span>
            </label>
          </div>

          {/* Baby crib – ONLY if there are children */}
          {children > 0 && (
            <div className="bf-field bf-field--full bf-crib-row">
              <label className="bf-checkbox">
                <input
                  type="checkbox"
                  name="crib"
                  checked={cribEnabled}
                  onChange={(e) => setCribEnabled(e.target.checked)}
                />
                {t("cribLabel")}
              </label>

              {cribEnabled && (
                <div className="bf-crib-controls">
                  <label htmlFor="cribCount" className="bf-crib-count-label">
                    {t("cribCount")}
                  </label>
                  <input
                    type="number"
                    id="cribCount"
                    name="cribCount"
                    min="1"
                    max="5"
                    value={cribCount}
                    onChange={(e) =>
                      setCribCount(
                        Math.min(5, Math.max(1, Number(e.target.value) || 1))
                      )
                    }
                  />
                  <span className="bf-hint-inline">
                    {cribAmount > 0
                      ? t("cribAmount", { amount: cribAmount })
                      : t("cribHint")}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Payment method */}
          <div className="bf-field bf-field--full">
            <label htmlFor="paymentMethod">{t("paymentMethod")}</label>

            <div className="bf-select-wrap">
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="card">{t("payCardSaferpay")}</option>
                <option value="crypto">{t("payCrypto")}</option>
              </select>
            </div>
          </div>

          {/* Contact */}
          <div className="bf-field">
            <label htmlFor="firstName">{t("firstName")}</label>
            <input type="text" id="firstName" name="firstName" required />
          </div>

          <div className="bf-field">
            <label htmlFor="lastName">{t("lastName")}</label>
            <input type="text" id="lastName" name="lastName" required />
          </div>

          <div className="bf-field">
            <label htmlFor="email">{t("email")}</label>
            <input
              type="email"
              id="email"
              name="email"
              inputMode="email"
              required
            />
          </div>

          <div className="bf-field">
            <label htmlFor="phone">{t("phone")}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              inputMode="tel"
              pattern="^[+()0-9\\s-]{7,}$"
              placeholder="+48 123 456 789"
              required
            />
          </div>

          {/* Requests */}
          <div className="bf-field bf-field--full">
            <label htmlFor="requests">{t("requests")}</label>
            <textarea
              id="requests"
              name="requests"
              rows="4"
              placeholder={t("requestsPlaceholder")}
            />
          </div>

          {/* 💰 Price summary (live total) */}
          <div className="bf-field bf-field--full bf-price-summary">
            {!apartmentId || !nights ? (
              <p className="bf-price-hint">{t("priceHint")}</p>
            ) : (
              <>
                <p>
                  {t("priceNights", { count: nights })}{" "}
                  <strong>{roomAmount.toFixed(2)} PLN</strong>
                </p>
                {includeBreakfast && breakfastAmount > 0 && (
                  <p>
                    {t("priceBreakfast")}{" "}
                    <strong>{breakfastAmount.toFixed(2)} PLN</strong>
                  </p>
                )}
                {cribAmount > 0 && (
                  <p>
                    {t("cribLabel")}{" "}
                    <strong>{cribAmount.toFixed(2)} PLN</strong>
                  </p>
                )}
                <p className="bf-price-total">
                  {t("priceTotal")}{" "}
                  <strong>{totalAmount.toFixed(2)} PLN</strong>
                </p>
              </>
            )}
          </div>

          {/* Honeypot + Consent */}
          <input
            type="text"
            name="website"
            className="hp-field"
            tabIndex="-1"
            autoComplete="off"
          />
          <div className="bf-consent bf-field--full">
            <label className="bf-checkbox">
              <input type="checkbox" name="consent" /> {t("consentText")}{" "}
              <button
                type="button"
                className="bf-linklike"
                onClick={() => setIsPrivacyOpen(true)}
                aria-haspopup="dialog"
                aria-controls="privacy-modal"
              >
                {t("privacyPolicy")}
              </button>
              .
            </label>
          </div>

          {/* Submit */}
          <div className="bf-actions bf-field--full">
            <button
              className="bf-submit"
              type="submit"
              disabled={status.state === "loading"}
            >
              {status.state === "loading" ? t("payNow") : t("payNow")}
            </button>
          </div>
        </form>

        {status.state !== "idle" && (
          <div className={`bf-status bf-${status.state}`}>
            {status.message}
          </div>
        )}
      </div>

      {/* Privacy Policy Modal */}
      {isPrivacyOpen && (
        <div
          id="privacy-modal"
          className="bf-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-title"
          onMouseDown={handleBackdropClick}
          ref={modalRef}
        >
          <div
            className="bf-modal"
            role="document"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <header className="bf-modal-header">
              <h3 id="privacy-title">{t("modalTitle")}</h3>
              <button
                ref={closeBtnRef}
                type="button"
                className="bf-modal-close"
                aria-label={t("modalClose")}
                onClick={() => setIsPrivacyOpen(false)}
              >
                ×
              </button>
            </header>

            <div className="bf-modal-body">
              <p>{t("policyP1")}</p>
              <p>{t("policyP2")}</p>
              <p>{t("policyP3")}</p>
            </div>

            <footer className="bf-modal-footer">
              <button
                type="button"
                className="bf-btn"
                onClick={() => setIsPrivacyOpen(false)}
              >
                {t("modalClose")}
              </button>
            </footer>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookingForm;

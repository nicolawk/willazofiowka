import React from "react";
import "../../cssfiles/booking/BookingForm.css";
import { useTranslation } from "react-i18next";

const BookingCalendar = ({
  initialCheckIn,
  initialCheckOut,
  bookingUrl = "https://book.willazofiowka.pl",
}) => {
  const { t } = useTranslation("booking");

  const handleBookingRedirect = () => {
    const url = new URL(bookingUrl);

    if (initialCheckIn) {
      url.searchParams.set("checkIn", initialCheckIn);
    }

    if (initialCheckOut) {
      url.searchParams.set("checkOut", initialCheckOut);
    }

    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="booking-form-wrap">
      <div className="bf-booking-cta">
        <div className="bf-booking-cta-inner">
          <p className="bf-booking-eyebrow">
            {t("cta.eyebrow")}
          </p>

          <h2 className="bf-booking-title">
            {t("cta.title")}
          </h2>

          <p className="bf-booking-text">
            {t("cta.text")}
          </p>

          <button
            type="button"
            className="bf-booking-button"
            onClick={handleBookingRedirect}
          >
            {t("cta.button")}
          </button>

          <p className="bf-booking-note">
            {t("cta.note")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookingCalendar;
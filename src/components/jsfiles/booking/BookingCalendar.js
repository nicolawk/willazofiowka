import React from "react";
import "../../cssfiles/booking/BookingForm.css";

const BookingCalendar = ({
  initialCheckIn,
  initialCheckOut,
  bookingUrl = "https://book.willazofiowka.pl",
}) => {
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
    <section className="bf-booking-cta">
      <div className="bf-booking-cta-inner">
        <p className="bf-booking-eyebrow">Rezerwacja online</p>

        <h2 className="bf-booking-title">
          Zarezerwuj swój pobyt w Willi Zofiówka
        </h2>

        <p className="bf-booking-text">
          Sprawdź dostępność pokoi, wybierz termin i dokończ rezerwację
          bezpośrednio w naszym systemie rezerwacyjnym.
        </p>

        <button
          type="button"
          className="bf-booking-button"
          onClick={handleBookingRedirect}
        >
          Zarezerwuj teraz
        </button>

        <p className="bf-booking-note">
          Zostaniesz przeniesiony do bezpiecznej strony rezerwacji.
        </p>
      </div>
    </section>
  );
};

export default BookingCalendar;
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
    <div className="bf-calendar">
      <button
        type="button"
        className="bf-booking-button"
        onClick={handleBookingRedirect}
      >
        Book Now
      </button>
    </div>
  );
};

export default BookingCalendar;
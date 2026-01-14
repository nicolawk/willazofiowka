import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";

// calendar styles (library)
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../../cssfiles/booking/BookingForm.css";

const BookingCalendar = ({ initialCheckIn, initialCheckOut, onChange }) => {
  // convert incoming YYYY-MM-DD strings to Date objects
  const parseDate = (str) => {
    if (!str) return null;
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const [range, setRange] = useState([
    {
      startDate: initialCheckIn ? parseDate(initialCheckIn) : new Date(),
      endDate: initialCheckOut
        ? parseDate(initialCheckOut)
        : addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  // whenever user selects dates on calendar
  const handleChange = (item) => {
    const selection = item.selection;
    setRange([selection]);

    const start = selection.startDate;
    const end = selection.endDate;

    // format back to YYYY-MM-DD for your form
    const format = (d) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
        d.getDate()
      ).padStart(2, "0")}`;

    if (onChange) {
      onChange({
        checkIn: format(start),
        checkOut: format(end),
      });
    }
  };

  // if parent changes the initial values (e.g. reset form)
  useEffect(() => {
    setRange((prev) => [
      {
        ...prev[0],
        startDate: initialCheckIn ? parseDate(initialCheckIn) : new Date(),
        endDate: initialCheckOut
          ? parseDate(initialCheckOut)
          : addDays(new Date(), 1),
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCheckIn, initialCheckOut]);

  return (
    <div className="bf-calendar">
      <DateRange
        ranges={range}
        onChange={handleChange}
        moveRangeOnFirstSelection={false}
        minDate={new Date()}
        months={2}
        direction="horizontal"
        showDateDisplay={false}
      />
    </div>
  );
};

export default BookingCalendar;

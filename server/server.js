// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";
import axios from "axios";
import { ethers } from "ethers";
import ical from "ical-generator";

import reviewsRouter from "./routes/reviews.js";
import db from "./db.js";
import cron from "node-cron";
import { syncBookingComFeeds } from "./syncBookingCom.js";


dotenv.config();

/* =========================
   APP SETUP
========================= */

const app = express();
const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0";

app.use(cors({ origin: "*", methods: ["GET","POST","DELETE","OPTIONS"] }));
app.use(express.json({ limit: "200kb" }));
app.use("/api", reviewsRouter);

app.use((req, _res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});

app.get("/health", (_req, res) => res.send("ok"));

/* =========================
   EMAIL (GMAIL)
========================= */

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/* =========================
   HELPERS
========================= */

function ymd(d) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`;
}

function nightsBetween(checkIn, checkOut) {
  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  const out = [];
  for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
    out.push(ymd(d));
  }
  return out;
}

function hasBlockOverlap(apartmentId, checkIn, checkOut) {
  return !!db.prepare(`
    SELECT 1 FROM blocks
    WHERE apartment_id=?
      AND NOT (? <= start_date OR ? >= end_date)
    LIMIT 1
  `).get(apartmentId, checkOut, checkIn);
}

async function roomTotalMinor(apartmentId, checkIn, checkOut) {
  const base = db
    .prepare(`SELECT price_minor FROM base_rates WHERE apartment_id=?`)
    .get(apartmentId)?.price_minor ?? 40000;

  const nights = nightsBetween(checkIn, checkOut);
  let total = 0;

  const rateStmt = db.prepare(`
    SELECT price_minor FROM rates
    WHERE apartment_id=?
      AND start_date <= ?
      AND end_date > ?
    ORDER BY id DESC
    LIMIT 1
  `);

  for (const night of nights) {
    total += rateStmt.get(apartmentId, night, night)?.price_minor ?? base;
  }
  return total;
}

/* =========================
   EMAIL CONTENT
========================= */

function sendEmails(booking) {
  const total = (booking.totalAmountMinor / 100).toFixed(2);

  const guestText = `
Hello ${booking.firstName},

Your booking at Willa Zofiówka is confirmed.

Apartment: ${booking.apartmentId}
Dates: ${booking.checkIn} – ${booking.checkOut}
Guests: ${booking.adults} adults, ${booking.children} children
Total: ${total} PLN

Thank you!
`;

  const adminText = `
NEW PAID BOOKING

Apartment: ${booking.apartmentId}
Dates: ${booking.checkIn} – ${booking.checkOut}
Guest: ${booking.firstName} ${booking.lastName}
Email: ${booking.email}
Phone: ${booking.phone}
Total: ${total} PLN
`;

  return Promise.all([
    transporter.sendMail({
      from: `"Willa Zofiówka" <${process.env.GMAIL_USER}>`,
      to: booking.email,
      subject: "Booking confirmed – Willa Zofiówka",
      text: guestText,
    }),
    transporter.sendMail({
      from: `"Willa Zofiówka" <${process.env.GMAIL_USER}>`,
      to: process.env.RECEPTION_EMAIL,
      subject: "New paid booking",
      text: adminText,
    }),
  ]);
}

/* =========================
   QUOTE
========================= */

app.post("/api/booking/quote", async (req, res) => {
  const { apartmentId, checkIn, checkOut } = req.body || {};
  if (!apartmentId || !checkIn || !checkOut)
    return res.status(400).json({ error: "missing_fields" });

  if (hasBlockOverlap(apartmentId, checkIn, checkOut))
    return res.status(409).json({ error: "dates_blocked" });

  const nights = nightsBetween(checkIn, checkOut).length;
  const room = await roomTotalMinor(apartmentId, checkIn, checkOut);

  res.json({
    ok: true,
    nights,
    roomTotalMinor: room,
    totalMinor: room,
  });
});
function requireAdmin(req, res, next) {
  const token = req.headers["x-admin-token"];
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: "unauthorized" });
  }
  next();
}

app.post("/api/admin/feeds/bookingcom", requireAdmin, (req, res) => {
  const { apartmentId, url } = req.body || {};
  if (!apartmentId || !url) {
    return res.status(400).json({ ok: false, error: "missing_fields" });
  }

  db.prepare(`
    INSERT INTO calendar_feeds (apartment_id, bookingcom_ics_url, last_sync)
    VALUES (?, ?, NULL)
    ON CONFLICT(apartment_id) DO UPDATE SET bookingcom_ics_url=excluded.bookingcom_ics_url
  `).run(apartmentId, url);

  res.json({ ok: true });
});

/* =========================
   CHECKOUT
========================= */

app.post("/api/booking/checkout", async (req, res) => {
  const {
    apartmentId, checkIn, checkOut,
    firstName, lastName, email, phone,
    adults, children
  } = req.body || {};

  if (!apartmentId || !checkIn || !checkOut || !firstName || !email)
    return res.status(400).json({ error: "missing_fields" });

  if (hasBlockOverlap(apartmentId, checkIn, checkOut))
    return res.status(409).json({ error: "dates_blocked" });

  const totalMinor = await roomTotalMinor(apartmentId, checkIn, checkOut);
  const id = `bok_${Date.now()}`;

  const booking = {
    id, apartmentId, checkIn, checkOut,
    firstName, lastName, email, phone,
    adults, children,
    totalAmountMinor: totalMinor,
    status: "paid", // ← direct paid for simplicity
    createdAt: new Date().toISOString()
  };

  db.prepare(`
    INSERT INTO bookings (
      id, apartment_id, check_in, check_out, status,
      total_amount_minor, created_at,
      first_name, last_name, email, phone, adults, children
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id, apartmentId, checkIn, checkOut, "paid",
    totalMinor, booking.createdAt,
    firstName, lastName, email, phone, adults, children
  );

  db.prepare(`
    INSERT INTO blocks (apartment_id, start_date, end_date, source, note)
    VALUES (?, ?, ?, 'website', ?)
  `).run(apartmentId, checkIn, checkOut, `Website booking ${id}`);

  await sendEmails(booking);

  res.json({ ok: true, bookingId: id });
});

/* =========================
   ICAL EXPORT (FOR BOOKING.COM)
========================= */

app.get("/api/ical/:apartmentId.ics", (req, res) => {
  if (req.query.token !== process.env.ICAL_TOKEN)
    return res.status(401).send("Unauthorized");

  const blocks = db.prepare(`
    SELECT start_date, end_date, source
    FROM blocks
    WHERE apartment_id=?
  `).all(req.params.apartmentId);

  const cal = ical({
    name: `Willa Zofiówka – ${req.params.apartmentId}`,
    timezone: "Europe/Warsaw",
  });

  blocks.forEach(b =>
    cal.createEvent({
      start: new Date(`${b.start_date}T00:00:00`),
      end: new Date(`${b.end_date}T00:00:00`),
      summary: "Booked",
    })
  );

  res.setHeader("Content-Type", "text/calendar; charset=utf-8");
  res.send(cal.toString());
});

cron.schedule("*/15 * * * *", () => {
  syncBookingComFeeds();
});

/* =========================
   START SERVER
========================= */

app.listen(PORT, HOST, () => {
  console.log(`✅ Booking API running on http://${HOST}:${PORT}`);
});

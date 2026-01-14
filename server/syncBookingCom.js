import ical from "node-ical";
import db from "./db.js";

function ymd(d) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export async function syncBookingComFeeds() {
  const feeds = db.prepare(`
    SELECT apartment_id, bookingcom_ics_url
    FROM calendar_feeds
    WHERE bookingcom_ics_url IS NOT NULL AND bookingcom_ics_url != ''
  `).all();

  for (const f of feeds) {
    try {
      const data = await ical.async.fromURL(f.bookingcom_ics_url);
      const events = Object.values(data).filter((x) => x?.type === "VEVENT");

      // ✅ Critical: delete old bookingcom blocks first
      // This makes cancellations automatically free after next sync
      db.prepare(`DELETE FROM blocks WHERE apartment_id=? AND source='bookingcom'`)
        .run(f.apartment_id);

      for (const ev of events) {
        const start = new Date(ev.start);
        const end = new Date(ev.end);

        const startDate = ymd(start);
        const endDate = ymd(end); // end is usually exclusive in iCal

        if (startDate >= endDate) continue;

        db.prepare(`
          INSERT INTO blocks (apartment_id, start_date, end_date, source, note, external_uid)
          VALUES (?, ?, ?, 'bookingcom', ?, ?)
        `).run(
          f.apartment_id,
          startDate,
          endDate,
          ev.summary || "Booking.com",
          ev.uid || null
        );
      }

      db.prepare(`UPDATE calendar_feeds SET last_sync=? WHERE apartment_id=?`)
        .run(new Date().toISOString(), f.apartment_id);

      console.log(`✅ Synced Booking.com for ${f.apartment_id} (${events.length} events)`);
    } catch (e) {
      console.error(`❌ Sync failed for ${f.apartment_id}:`, e.message || e);
    }
  }
}

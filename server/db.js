import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "zofiowka.sqlite");
const db = new Database(dbPath);

db.exec(`
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  apartment_id TEXT NOT NULL,
  check_in TEXT NOT NULL,
  check_out TEXT NOT NULL,
  status TEXT NOT NULL,
  total_amount_minor INTEGER NOT NULL,
  created_at TEXT NOT NULL,

  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  adults INTEGER,
  children INTEGER,
  requests TEXT
);

CREATE TABLE IF NOT EXISTS blocks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  apartment_id TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  source TEXT NOT NULL,   -- website | bookingcom
  note TEXT,
  external_uid TEXT
);

CREATE TABLE IF NOT EXISTS rates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  apartment_id TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  price_minor INTEGER NOT NULL,
  note TEXT
);

CREATE TABLE IF NOT EXISTS base_rates (
  apartment_id TEXT PRIMARY KEY,
  price_minor INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS calendar_feeds (
  apartment_id TEXT PRIMARY KEY,
  bookingcom_ics_url TEXT,
  last_sync TEXT
);
`);

export default db;

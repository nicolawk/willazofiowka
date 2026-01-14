/* routes/reviews.js
   Google Reviews API with Cloud Translate (+ lite fallback), packaged as an Express Router.
*/
import { Router } from "express";
// If Node < 18, uncomment next line:
// import fetch from "node-fetch";

import gtranslateLite from "@vitalets/google-translate-api"; // fallback translator
import { v2 as GoogleTranslate } from "@google-cloud/translate"; // official GCP

const router = Router();

const _reviewsCache = {};
const REVIEWS_CACHE_MS = 1000 * 60 * 30; // 30 minutes

// Try to init Google Cloud client (reads GOOGLE_APPLICATION_CREDENTIALS)
let gcloudTranslate = null;
try {
  gcloudTranslate = new GoogleTranslate.Translate();
  // console.log("Google Cloud Translate client initialized");
} catch {
  gcloudTranslate = null;
  // console.warn("Google Cloud credentials not found — using fallback translator");
}

// util: translate text to target lang, prefer GCP then fallback
async function translateText(originalText, targetLang) {
  if (!originalText || targetLang === "en") return originalText;

  if (gcloudTranslate) {
    try {
      const [translated] = await gcloudTranslate.translate(originalText, targetLang);
      return translated;
    } catch (err) {
      console.warn(`GCP translate failed (${targetLang}):`, err?.message || err);
      // fall through to lite
    }
  }

  try {
    const { text } = await gtranslateLite(originalText, { to: targetLang });
    return text;
  } catch (err) {
    console.warn(`Lite translate failed (${targetLang}):`, err?.message || err);
    return originalText;
  }
}

router.get("/reviews", async (req, res) => {
  try {
    const placeId = req.query.placeId;
    const lang = (req.query.lang || "en").slice(0, 2).toLowerCase(); // en/pl/ar

    if (!placeId) return res.status(400).json({ error: "Missing placeId" });
    if (!process.env.GOOGLE_PLACES_API_KEY) {
      return res.status(500).json({ error: "GOOGLE_PLACES_API_KEY not set" });
    }

    // cache per place+lang
    const cacheKey = `place:${placeId}:lang:${lang}`;
    const now = Date.now();
    const cached = _reviewsCache[cacheKey];
    if (cached && now - cached.ts < REVIEWS_CACHE_MS) {
      return res.json(cached.payload);
    }

    // Ask Places with the target language (localizes relative_time_description)
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${encodeURIComponent(placeId)}` +
      `&fields=name,url,rating,user_ratings_total,reviews` +
      `&reviews_sort=newest` +
      `&language=${encodeURIComponent(lang)}` +
      `&key=${process.env.GOOGLE_PLACES_API_KEY}`;

    const r = await fetch(url);
    const json = await r.json();

    if (json.status !== "OK" || !json.result) {
      return res.status(502).json({ error: "Places API error", details: json });
    }

    const reviewsRaw = json.result.reviews || [];
    // Keep 4★+ with non-empty text
    const filtered = reviewsRaw.filter((rv) => rv.rating >= 4 && rv.text?.trim());

    // Map to a clean shape
    let mapped = filtered.map((rv) => ({
      text: rv.text.trim(),
      link: rv.author_url || json.result.url, // fallback to place URL
      rating: rv.rating,
      author: rv.author_name,
      when: rv.relative_time_description, // already localized by &language=
    }));

    // Translate to requested language if not English
    if (lang !== "en" && mapped.length > 0) {
      mapped = await Promise.all(
        mapped.map(async (rv) => ({
          ...rv,
          text: await translateText(rv.text, lang),
        }))
      );
    }

    // shuffle for variety
    mapped.sort(() => Math.random() - 0.5);

    const totalReviews = json.result.user_ratings_total || mapped.length;

    const payload = {
      name: json.result.name,
      reviews: mapped,
      totalFive: mapped.filter((r) => r.rating === 5).length,
      user_ratings_total: totalReviews,
      lang,
      dir: ["ar", "he", "fa", "ur"].includes(lang) ? "rtl" : "ltr",
    };

    _reviewsCache[cacheKey] = { ts: now, payload };
    res.json(payload);
  } catch (err) {
    console.error("Reviews endpoint error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

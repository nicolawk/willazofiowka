import { useEffect, useMemo, useRef, useState } from "react";
import "../../cssfiles/mainpage/Feedback.css";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const PLACE_ID = process.env.REACT_APP_GOOGLE_PLACE_ID || "ChIJV4vjBwHzFUcR0EcOSVq4vs4";
const API_BASE = process.env.NODE_ENV === "development" ? "http://localhost:4000" : "";
const AUTO_MS = 6000;

const Feedback = () => {
  const { t } = useTranslation("mainpage");
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalFromApi, setTotalFromApi] = useState(null);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  // helper: fetch reviews for a specific lang
  const fetchForLang = async (lang2) => {
    const url = `${API_BASE}/api/reviews?placeId=${encodeURIComponent(PLACE_ID)}&lang=${encodeURIComponent(lang2)}`;
    const r = await fetch(url);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const lang = (i18n.resolvedLanguage || i18n.language || "en").slice(0, 2);

        // 1) try current language
        let data = await fetchForLang(lang);
        let list = Array.isArray(data?.reviews) ? data.reviews.filter(rv => rv?.text?.trim()) : [];

        // 2) if empty, retry with EN so we always show something
        if (!list.length && lang !== "en") {
          const fallback = await fetchForLang("en");
          data = fallback;
          list = Array.isArray(fallback?.reviews) ? fallback.reviews.filter(rv => rv?.text?.trim()) : [];
        }

        if (!cancelled) {
          setReviews(list);
          setCurrentIndex(list.length ? 0 : 0);

          // prefer user_ratings_total from whichever payload we used
          const total =
            typeof data?.user_ratings_total === "number" ? data.user_ratings_total : list.length;
          setTotalFromApi(total);
        }
      } catch (err) {
        // failed hard → show empty state (placeholder)
        if (!cancelled) {
          setReviews([]);
          setCurrentIndex(0);
          setTotalFromApi(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [i18n.language, i18n.resolvedLanguage]);

  // Auto-rotate
  useEffect(() => {
    clearInterval(timerRef.current);
    if (reviews.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((i) => (i + 1) % reviews.length);
      }, AUTO_MS);
    }
    return () => clearInterval(timerRef.current);
  }, [reviews.length]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (!reviews.length) return;
      if (e.key === "ArrowRight") setCurrentIndex((i) => (i + 1) % reviews.length);
      if (e.key === "ArrowLeft") setCurrentIndex((i) => (i - 1 + reviews.length) % reviews.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reviews.length]);

  const totalDisplayed = reviews.length;
  const current = useMemo(
    () => (totalDisplayed ? reviews[(currentIndex + totalDisplayed) % totalDisplayed] : null),
    [currentIndex, totalDisplayed, reviews]
  );

  const next = () => totalDisplayed && setCurrentIndex((i) => (i + 1) % totalDisplayed);
  const prev = () => totalDisplayed && setCurrentIndex((i) => (i - 1 + totalDisplayed) % totalDisplayed);

  const isRTL = ["ar", "he", "fa", "ur"].includes((i18n.language || "en").slice(0, 2));
  const counterText = totalDisplayed ? `${currentIndex + 1}/${totalFromApi ?? totalDisplayed}` : `0/0`;

  return (
    <div id="reviews" className="fb-container">
      <h1 className="fb-text">{t("reviews.title")}</h1>

      <div className="fb-slider-container">
        <div
          className="fb-slide"
          dir={isRTL ? "rtl" : "ltr"}
          onClick={() => current?.link && window.open(current.link, "_blank")}
          style={{ cursor: current?.link ? "pointer" : "default" }}
          aria-live="polite"
        >
          <p className="fb-description">
            {loading
              ? t("reviews.loading", "Loading reviews…")
              : current
              ? isRTL ? `«${current.text}»` : `“${current.text}”`
              : t("reviews.placeholder")}
          </p>

          {!loading && current?.author && (
            <p style={{ marginTop: "0.75rem", fontStyle: "italic", fontSize: "0.95rem" }}>
              — {current.author}{current.when ? `, ${current.when}` : ""}
            </p>
          )}
        </div>

        <div className="fb-nav" aria-label={t("reviews.aria.nav")}>
          <button className="fb-btn" onClick={prev} aria-label={t("reviews.nav.prev")} disabled={!reviews.length}>❮</button>
          <div className="fb-dots" aria-hidden="true">
            {reviews.map((_, i) => (
              <span
                key={i}
                className={`fb-dot ${i === currentIndex ? "is-active" : ""}`}
                onClick={() => setCurrentIndex(i)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
          <button className="fb-btn" onClick={next} aria-label={t("reviews.nav.next")} disabled={!reviews.length}>❯</button>
        </div>

        <div style={{ marginTop: "0.25rem", fontSize: "0.95rem", color: "rgba(75,14,31,0.8)" }}>
          {counterText}
        </div>
      </div>

      <div className="fb-cta">
        <h1 className="fb-text">{t("reviews.cta.title")}</h1>
        <a href="/booking" className="fb-book-btn">{t("reviews.cta.book")}</a>
      </div>
    </div>
  );
};

export default Feedback;

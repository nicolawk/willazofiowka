import React, { useEffect, useMemo, useState, useCallback } from "react";
import "../../cssfiles/offer/Room.css";

import room1 from "../../../assets/images/room1.jpg";
import room2 from "../../../assets/images/room2.jpg";
import room3 from "../../../assets/images/room3.jpg";
import room4 from "../../../assets/images/room4.jpg";
import room5 from "../../../assets/images/room5.jpg";

import tatra1 from "../../../assets/images/tatra1.jpg";
import tatra2 from "../../../assets/images/tatra2.jpg";
import tatra3 from "../../../assets/images/tatra3.jpg";

/* --- FAMILY ROOM photos f1..f25 --- */
import f1 from "../../../assets/images/f1.jpg";
import f2 from "../../../assets/images/f2.jpg";
import f3 from "../../../assets/images/f3.jpg";
import f4 from "../../../assets/images/f4.jpg";
import f5 from "../../../assets/images/f5.jpg";
import f6 from "../../../assets/images/f6.jpg";
import f7 from "../../../assets/images/f7.jpg";
import f8 from "../../../assets/images/f8.jpg";
import f9 from "../../../assets/images/f9.jpg";
import f10 from "../../../assets/images/f10.jpg";
import f11 from "../../../assets/images/f11.jpg";
import f12 from "../../../assets/images/f12.jpg";
import f13 from "../../../assets/images/f13.jpg";
import f14 from "../../../assets/images/f14.jpg";
import f15 from "../../../assets/images/f15.jpg";
import f16 from "../../../assets/images/f16.jpg";
import f17 from "../../../assets/images/f17.jpg";
import f18 from "../../../assets/images/f18.jpg";
import f19 from "../../../assets/images/f19.jpg";
import f20 from "../../../assets/images/f20.jpg";
import f21 from "../../../assets/images/f21.jpg";
import f22 from "../../../assets/images/f22.jpg";
import f23 from "../../../assets/images/f23.jpg";
import f24 from "../../../assets/images/f24.jpg";
import f25 from "../../../assets/images/f25.jpg";

import t1 from "../../../assets/images/t1.jpg";
import t2 from "../../../assets/images/t2.jpg";
import t3 from "../../../assets/images/t3.jpg";
import t4 from "../../../assets/images/t4.jpg";
import t5 from "../../../assets/images/t5.jpg";
import t6 from "../../../assets/images/t6.jpg";
import t7 from "../../../assets/images/t7.jpg";
import t8 from "../../../assets/images/t8.jpg";
import t9 from "../../../assets/images/t9.jpg";
import t10 from "../../../assets/images/t10.jpg";
import t11 from "../../../assets/images/t11.jpg";
import t12 from "../../../assets/images/t12.jpg";
import t13 from "../../../assets/images/t13.jpg";
import t14 from "../../../assets/images/t14.jpg";
import t15 from "../../../assets/images/t15.jpg";
import t16 from "../../../assets/images/t16.jpg";
import t17 from "../../../assets/images/t17.jpg";
import t18 from "../../../assets/images/t18.jpg";
import t19 from "../../../assets/images/t19.jpg";
import t20 from "../../../assets/images/t20.jpg";
import t21 from "../../../assets/images/t21.jpg";
import t22 from "../../../assets/images/t22.jpg";

import q1 from "../../../assets/images/q1.jpg";
import q2 from "../../../assets/images/q2.jpg";
import q3 from "../../../assets/images/q3.jpg";
import q4 from "../../../assets/images/q4.jpg";
import q5 from "../../../assets/images/q5.jpg";
import q6 from "../../../assets/images/q6.jpg";
import q7 from "../../../assets/images/q7.jpg";
import q8 from "../../../assets/images/q8.jpg";
import q9 from "../../../assets/images/q9.jpg";
import q10 from "../../../assets/images/q10.jpg";
import q11 from "../../../assets/images/q11.jpg";
import q12 from "../../../assets/images/q12.jpg";
import q13 from "../../../assets/images/q13.jpg";
import q14 from "../../../assets/images/q14.jpg";
import q15 from "../../../assets/images/q15.jpg";
import q16 from "../../../assets/images/q16.jpg";
import q17 from "../../../assets/images/q17.jpg";
import q18 from "../../../assets/images/q18.jpg";
import q19 from "../../../assets/images/q19.jpg";
import q20 from "../../../assets/images/q20.jpg";
import q21 from "../../../assets/images/q21.jpg";
import q22 from "../../../assets/images/q22.jpg";
import q23 from "../../../assets/images/q23.jpg";
import q24 from "../../../assets/images/q24.jpg";
import q25 from "../../../assets/images/q25.jpg";
import q26 from "../../../assets/images/q26.jpg";

import r1 from "../../../assets/images/r1.jpg";
import r2 from "../../../assets/images/r2.jpg";
import r3 from "../../../assets/images/r3.jpg";
import r4 from "../../../assets/images/r4.jpg";
import r5 from "../../../assets/images/r5.jpg";
import r6 from "../../../assets/images/r6.jpg";
import r7 from "../../../assets/images/r7.jpg";
import r8 from "../../../assets/images/r8.jpg";
import r9 from "../../../assets/images/r9.jpg";
import r10 from "../../../assets/images/r10.jpg";
import r11 from "../../../assets/images/r11.jpg";

import d1 from "../../../assets/images/d1.jpg";
import d2 from "../../../assets/images/d2.jpg";
import d3 from "../../../assets/images/d3.jpg";
import d4 from "../../../assets/images/d4.jpg";
import d5 from "../../../assets/images/d5.jpg";
import d6 from "../../../assets/images/d6.jpg";
import d7 from "../../../assets/images/d7.jpg";
import d8 from "../../../assets/images/d8.jpg";
import d9 from "../../../assets/images/d9.jpg";
import d10 from "../../../assets/images/d10.jpg";
import d11 from "../../../assets/images/d11.jpg";
import d12 from "../../../assets/images/d12.jpg";
import d13 from "../../../assets/images/d13.jpg";
import d14 from "../../../assets/images/d14.jpg";
import d15 from "../../../assets/images/d15.jpg";
import d16 from "../../../assets/images/d16.jpg";
import d17 from "../../../assets/images/d17.jpg";
import d18 from "../../../assets/images/d18.jpg";
import d19 from "../../../assets/images/d19.jpg";
import d20 from "../../../assets/images/d20.jpg";
import d21 from "../../../assets/images/d21.jpg";

import { FaRulerCombined, FaBed, FaBath, FaDollarSign, FaCouch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const BOOKING_URL = "https://your-booking-website.com";

/** Rooms: only IDs and images here; text comes from i18n */
const rooms = [
  {
    id: "familyA",
    image: room5,
    images: [
      room5, f1, f2, f3, f4, f5,
      f6, f7, f8, f9, f10, f11, f12, f13, f14, f15,
      f16, f17, f18, f19, f20, f21, f22, f23, f24, f25
    ]
  },
  {
    id: "tatraSuite",
    image: room4,
    images: [
      room4,
      tatra1, tatra2, tatra3,
      t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11,
      t12, t13, t14, t15, t16, t17, t18, t19, t20, t21, t22
    ]
  },
  {
    id: "deluxeGF",
    image: room2,
    images: [
      room2,
      q1, q2, q3, q4, q5, q6,
      q7, q8, q9, q10, q11, q12, q13, q14, q15,
      q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26
    ]
  },
  {
    id: "deluxeMF",
    image: room3,
    images: [room3, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11]
  },
  {
    id: "familyB",
    image: room1,
    images: [
      room1,
      d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11,
      d12, d13, d14, d15, d16, d17, d18, d19, d20, d21
    ]
  }
];

/* Build a circular window of N items starting at index */
const getCircularWindow = (arr, start, size = 6) => {
  const n = Array.isArray(arr) ? arr.length : 0;
  const out = [];
  if (!n) return out;
  const count = Math.min(size, n);
  for (let k = 0; k < count; k += 1) {
    const realIndex = (start + k) % n;
    out.push({ src: arr[realIndex], realIndex });
  }
  return out;
};

/* ===========================
   Gallery Modal
   =========================== */
const GalleryModal = ({ images, startIndex = 0, onClose }) => {
  const { t } = useTranslation("offer");
  const [index, setIndex] = useState(startIndex);
  const [slideClass, setSlideClass] = useState("");
  const total = images?.length || 0;

  const goNext = useCallback(() => {
    setSlideClass("slide-next");
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setSlideClass("slide-prev");
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!slideClass) return;
    const tmo = setTimeout(() => setSlideClass(""), 180);
    return () => clearTimeout(tmo);
  }, [slideClass]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose && onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [goNext, goPrev, onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!images || !images.length) return null;

  const thumbs = getCircularWindow(images, index, 6);

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose && onClose();
    }
  };

  return (
    <div
      className="gallery-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={t("rooms.gallery.ariaLabel")}
      onClick={handleBackdropClick}
      dir={i18n.dir()}
    >
      <button
        className="gallery-close"
        aria-label={t("rooms.gallery.close")}
        onClick={onClose}
      >
        ×
      </button>

      <div className="gallery-stage">
        <button
          className="gallery-nav gallery-prev"
          aria-label={t("rooms.gallery.prev")}
          onClick={goPrev}
        >
          &lsaquo;
        </button>

        <img
          src={images[index]}
          alt={t("rooms.gallery.imageAlt", { index: index + 1, total })}
          className="gallery-image"
          loading="eager"
          decoding="async"
        />

        <div className="gallery-counter">
          {index + 1} / {total}
        </div>

        <button
          className="gallery-nav gallery-next"
          aria-label={t("rooms.gallery.next")}
          onClick={goNext}
        >
          &rsaquo;
        </button>
      </div>

      <div className="gallery-thumbs" aria-label={t("rooms.gallery.thumbs")}>
        <div className={`gallery-thumbs-inner ${slideClass}`}>
          {thumbs.map(({ src, realIndex }) => (
            <button
              key={realIndex}
              className={`gallery-thumb ${realIndex === index ? "is-active" : ""}`}
              onClick={() => setIndex(realIndex)}
              aria-label={t("rooms.gallery.goto", { n: realIndex + 1 })}
            >
              <img src={src} alt={t("rooms.gallery.thumbAlt", { n: realIndex + 1 })} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ===========================
   Room Card
   =========================== */
const RoomCard = ({ room, onOpenGallery }) => {
  const { t } = useTranslation("offer");
  const id = room.id;

  return (
    <article className="room-card" dir={i18n.dir()}>
      <div className="room-media">
        <button
          className="room-image-btn"
          onClick={() => onOpenGallery(room)}
          aria-label={t("rooms.card.openGallery", { title: t(`rooms.${id}.title`) })}
          title={t("rooms.card.openGalleryTitle")}
        >
          <img
            src={room.image}
            alt={t(`rooms.${id}.title`)}
            className="room-image"
            loading="lazy"
            decoding="async"
          />
        </button>

        <span className="room-price">
          <FaDollarSign aria-hidden="true" /> {t(`rooms.${id}.price`)}
        </span>
      </div>

      <header className="room-head">
        <h3 className="room-title">{t(`rooms.${id}.title`)}</h3>
        <p className="room-location">{t(`rooms.${id}.location`)}</p>
      </header>

      <div className="room-info">
        <div><FaRulerCombined /> {t(`rooms.${id}.size`)}</div>
        <div title={t("rooms.meta.beds")}><FaBed /> {t(`rooms.${id}.beds`)}</div>
        {t(`rooms.${id}.sofabeds`, "") !== "" && (
          <div title={t("rooms.meta.sofabeds")}><FaCouch /> {t(`rooms.${id}.sofabeds`)}</div>
        )}
        <div title={t("rooms.meta.baths")}><FaBath /> {t(`rooms.${id}.baths`)}</div>
      </div>

      <div className="room-action">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="book-now-btn"
        >
          {t("rooms.actions.bookNow")}
        </a>
      </div>
    </article>
  );
};

const RoomTab = () => {
  const [openRoom, setOpenRoom] = useState(null);
  const images = useMemo(
    () => (openRoom?.images ? openRoom.images : []),
    [openRoom]
  );

  return (
    <section className="room-gallery-wrapper" dir={i18n.dir()}>
      <div className="room-grid">
        {/* Row 1: first 3 cards */}
        <div className="rooms-row" data-row="1">
          {rooms.slice(0, 3).map((r) => (
            <RoomCard
              key={`row1-${r.id}`}
              room={r}
              onOpenGallery={(room) => setOpenRoom(room)}
            />
          ))}
        </div>

        {/* Row 2: remaining cards (2) */}
        <div className="rooms-row rooms-row--last" data-row="2">
          {rooms.slice(3).map((r) => (
            <RoomCard
              key={`row2-${r.id}`}
              room={r}
              onOpenGallery={(room) => setOpenRoom(room)}
            />
          ))}
        </div>
      </div>

      {openRoom && (
        <GalleryModal
          images={images}
          startIndex={0}
          onClose={() => setOpenRoom(null)}
        />
      )}
    </section>
  );
};

export default RoomTab;

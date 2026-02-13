// Header.jsx
import React, { useState, useEffect } from "react";
import "../../cssfiles/mainpage/Header.css";
// ❌ remove local video import (Cloudflare build fails)
// import villaVid from "../../../assets/images/bg-video2.mov";

import Hls from "hls.js"; // ✅ add this dependency for .m3u8 support
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const ALL_LANGS = ["en", "pl", "ar"];

// ✅ Put your real URLs here (Cloudflare Stream or CDN)
const HERO_VIDEO_HLS = ""; // e.g. "https://customer-xxxx.cloudflarestream.com/<id>/manifest/video.m3u8"
const HERO_VIDEO_MP4 = ""; // e.g. "https://cdn.yourdomain.com/videos/hero.mp4"
const HERO_POSTER = "";    // e.g. "https://cdn.yourdomain.com/posters/hero.jpg"

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const [openLang, setOpenLang] = useState(false);

  const { t } = useTranslation(["navbar", "home", "common"]);
  const showSidebar = () => setSidebar((s) => !s);

  // Close sidebar on scroll (your existing logic)
  useEffect(() => {
    let id;
    const handleScroll = () => {
      if (sidebar) {
        clearTimeout(id);
        id = setTimeout(() => setSidebar(false), 15);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(id);
    };
  }, [sidebar]);

  const switchLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
    setOpenLang(false);
  };

  useEffect(() => {
    const lng = i18n.resolvedLanguage || "en";
    document.documentElement.lang = lng;
    document.documentElement.dir = i18n.dir(lng);
  }, []);

  const currentLang = (i18n.language || "en").slice(0, 2);
  const otherLangs = ALL_LANGS.filter((lng) => lng !== currentLang);

  // ✅ HLS support (for Cloudflare Stream .m3u8)
  useEffect(() => {
    const video = document.getElementById("heroVideo");
    if (!video) return;

    // If HLS URL not set, do nothing (MP4 will handle)
    if (!HERO_VIDEO_HLS) return;

    // Safari supports HLS natively
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HERO_VIDEO_HLS;
      return;
    }

    // Other browsers need hls.js
    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(HERO_VIDEO_HLS);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
  }, []);

  return (
    <div className="header-container" data-dir={i18n.dir()}>
      <div className="video-container">
        <video
          id="heroVideo"
          autoPlay
          loop
          muted
          playsInline
          className="bg-video"
          poster={HERO_POSTER || undefined}
          preload="metadata"
        >
          {/* ✅ MP4 fallback (works everywhere) */}
          {HERO_VIDEO_MP4 ? (
            <source src={HERO_VIDEO_MP4} type="video/mp4" />
          ) : null}
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="navbar">
        <div className="menu">
          <button className="menu-bars" aria-label="menu" onClick={showSidebar}>
            <FaIcons.FaBars />
          </button>
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <button
                className="menu-bars"
                aria-label="close"
                onClick={() => setSidebar(false)}
              >
                <AiIcons.AiOutlineClose />
              </button>
            </li>

            <li className="nav-text" onClick={() => setSidebar(false)}>
              <Link to="/offer">{t("navbar:offer")}</Link>
            </li>

            <li className="nav-text" onClick={() => setSidebar(false)}>
              <Link to="/booking">{t("navbar:booking")}</Link>
            </li>

            <li className="nav-text" onClick={() => setSidebar(false)}>
              <Link to="/locations">{t("navbar:locations")}</Link>
            </li>

            <li className="nav-text" onClick={() => setSidebar(false)}>
              <Link to="/aboutus">{t("navbar:about")}</Link>
            </li>

            <li className="nav-text" onClick={() => setSidebar(false)}>
              <HashLink smooth to="/#reviews">{t("navbar:reviews")}</HashLink>
            </li>
          </ul>
        </nav>

        <h1 className="title">{t("home:brand")}</h1>

        <div className="lang-dropdown" data-open={openLang ? "true" : "false"}>
          <button
            className="lang"
            aria-haspopup="true"
            aria-expanded={openLang}
            onClick={() => setOpenLang((v) => !v)}
          >
            {t(`common:lang.${currentLang}`, currentLang.toUpperCase())}
          </button>

          <div className="lang-options" role="menu">
            {otherLangs.map((lng) => (
              <button
                key={lng}
                className="lang-option"
                onClick={() => switchLang(lng)}
                role="menuitem"
              >
                {t(`common:lang.${lng}`, lng.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="header-content">
        <h2 className="header-text">{t("home:hero.title")}</h2>
        <p className="sub-head-text">{t("home:hero.subtitle")}</p>
        <a href="/booking" className="book-now">
          {t("home:hero.book")}
        </a>
      </div>
    </div>
  );
};

export default Header;

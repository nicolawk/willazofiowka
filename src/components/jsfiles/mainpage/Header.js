// Header.jsx
import React, { useEffect, useMemo, useState } from "react";
import "../../cssfiles/mainpage/Header.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const ALL_LANGS = ["en", "pl", "ar"];

// ✅ R2 direct links (custom domain)
const SUMMER_VIDEO_MP4 = "https://media.willazofiowka.pl/summer.mp4";
const WINTER_VIDEO_MP4 = "https://media.willazofiowka.pl/winter.mp4";

// optional poster (can be empty)
const HERO_POSTER = ""; // e.g. "https://media.willazofiowka.pl/hero-poster.jpg"

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const { t } = useTranslation(["navbar", "home", "common"]);

  const showSidebar = () => setSidebar((s) => !s);

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

  // ✅ choose video by season:
  // Spring (Mar-May) + Summer (Jun-Aug) => summer.mp4
  // Fall (Sep-Nov) + Winter (Dec-Feb) => winter.mp4
  const heroVideoSrc = useMemo(() => {
    const m = new Date().getMonth() + 1; // 1..12
    const isSpringOrSummer = m >= 3 && m <= 8;
    return isSpringOrSummer ? SUMMER_VIDEO_MP4 : WINTER_VIDEO_MP4;
  }, []);

  const currentLang = (i18n.language || "en").slice(0, 2);
  const otherLangs = ALL_LANGS.filter((lng) => lng !== currentLang);

  return (
    <div className="header-container" data-dir={i18n.dir()}>
      <div className="video-container">
        <video
          key={heroVideoSrc}     // ✅ forces reload if src changes
          autoPlay
          loop
          muted
          playsInline
          className="bg-video"
          poster={HERO_POSTER || undefined}
          preload="metadata"
        >
          <source src={heroVideoSrc} type="video/mp4" />
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
              <button className="menu-bars" aria-label="close" onClick={() => setSidebar(false)}>
                <AiIcons.AiOutlineClose />
              </button>
            </li>

            <li className="nav-text" onClick={() => setSidebar(false)}><Link to="/offer">{t("navbar:offer")}</Link></li>
            <li className="nav-text" onClick={() => setSidebar(false)}><Link to="/booking">{t("navbar:booking")}</Link></li>
            <li className="nav-text" onClick={() => setSidebar(false)}><Link to="/locations">{t("navbar:locations")}</Link></li>
            <li className="nav-text" onClick={() => setSidebar(false)}><Link to="/aboutus">{t("navbar:about")}</Link></li>
            <li className="nav-text" onClick={() => setSidebar(false)}><HashLink smooth to="/#reviews">{t("navbar:reviews")}</HashLink></li>
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
        <a href="/booking" className="book-now">{t("home:hero.book")}</a>
      </div>
    </div>
  );
};

export default Header;

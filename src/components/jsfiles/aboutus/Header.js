import React, { useState, useEffect } from "react";
import "../../cssfiles/aboutus/Header.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const ALL_LANGS = ["en", "pl", "ar"];

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const { t } = useTranslation(["navbar", "about", "common","booking",]);

  const showSidebar = () => setSidebar((s) => !s);

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      if (sidebar) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setSidebar(false), 15);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [sidebar]);

  // keep <html> lang/dir in sync on mount
  useEffect(() => {
    const lng = i18n.resolvedLanguage || "en";
    document.documentElement.lang = lng;
    document.documentElement.dir = i18n.dir(lng);
  }, []);

  const switchLang = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = i18n.dir(lng);
    localStorage.setItem("i18nextLng", lng);
    setOpenLang(false);
  };

  const currentLang = (i18n.language || "en").slice(0, 2);
  const otherLangs = ALL_LANGS.filter((lng) => lng !== currentLang);

  return (
    <div className="header-container" data-dir={i18n.dir()}>
      {/* Background image */}
      <div className="image-background" />

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

    <li className="nav-text" onClick={() => setSidebar(false)}>
      <Link to="/">{t("navbar:home")}</Link>
    </li>
  </ul>
</nav>


        <h1 className="title">{t("about:brand", "Willa Zofiówka")}</h1>

        {/* Language dropdown: always render options for CSS hover; click toggles for mobile */}
        <div
          className="lang-dropdown"
          data-open={openLang ? "true" : "false"}
        >
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
                role="menuitem"
                onClick={() => switchLang(lng)}
              >
                {t(`common:lang.${lng}`, lng.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="header-content">
        <h2 className="header-text2">{t("about:headerTitle", "ABOUT US")}</h2>
      </div>
    </div>
  );
};

export default Header;

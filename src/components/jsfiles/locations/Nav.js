import React, { useEffect, useState } from "react";
import "../../cssfiles/mainpage/Nav.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const HEADER_OFFSET = 120;

function scrollToIdWithOffset(id) {
  const el = document.getElementById(id);
  if (!el) return false;
  const y = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
  window.scrollTo({ top: y, behavior: "smooth" });
  return true;
}

const Nav = () => {
  const { t } = useTranslation("mainpage");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to reviews if #reviews in URL
  useEffect(() => {
    if (location.hash !== "#reviews") return;
    let tries = 0;
    const tryScroll = () => {
      if (scrollToIdWithOffset("reviews")) return;
      if (tries++ < 30) requestAnimationFrame(tryScroll);
    };
    tryScroll();
  }, [location.pathname, location.hash]);

  const handleReviewsClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: "#reviews" });
    } else {
      if (!scrollToIdWithOffset("reviews")) {
        let tries = 0;
        const tryScroll = () => {
          if (scrollToIdWithOffset("reviews")) return;
          if (tries++ < 30) requestAnimationFrame(tryScroll);
        };
        tryScroll();
      }
    }
  };

  return (
    <div
      className={`navigation ${isVisible ? "nav-visible" : ""}`}
      dir={i18n.dir()}
    >
      <ul className="nav-items">
        <li className="n-item n-left">
          <Link to="/offer" onClick={() => window.scrollTo(0, 0)}>
            {t("nav.offer")}
          </Link>
        </li>
        <li className="n-item">
          <Link to="/booking" onClick={() => window.scrollTo(0, 0)}>
            {t("nav.booking")}
          </Link>
        </li>
        <li className="n-item">
          <Link to="/locations" onClick={() => window.scrollTo(0, 0)}>
            {t("nav.locations")}
          </Link>
        </li>
        <li className="n-item">
          <Link to="/aboutus" onClick={() => window.scrollTo(0, 0)}>
            {t("nav.about")}
          </Link>
        </li>
        <li className="n-item n-right">
          <Link to="/#reviews" onClick={handleReviewsClick}>
            {t("nav.reviews")}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;

import React from "react";
import { useTranslation } from "react-i18next";
import "../../cssfiles/booking/Intro.css";

const Intro = () => {
  const { t } = useTranslation("booking");

  return (
    <section className="booking-intro">
      <div className="booking-overlay"></div>
      <div className="booking-content">
        <p className="booking-subtitle">{t("introSubtitle")}</p>
        <h1 className="booking-title">{t("introTitle")}</h1>
        <p className="booking-text">
          {t("introText")}
        </p>
        <div className="booking-buttons">
          <a href="/offer" className="discover-btn">
            {t("introButton")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Intro;

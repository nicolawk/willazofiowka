import React from "react";
import { useTranslation } from "react-i18next";
import "../../cssfiles/locations/Intro.css";

const Intro = () => {
  const { t } = useTranslation("locations");

  return (
    <section className="locations-intro">
      <h1 className="locations-title">{t("introTitle")}</h1>
      <p className="locations-description">
        {t("introDescription")}
      </p>
    </section>
  );
};

export default Intro;

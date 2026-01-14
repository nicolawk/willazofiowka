import React from "react";
import "../../cssfiles/mainpage/Maps.css";
import Mapa from "../../../assets/images/2.png";
import villaZofiowkaLogo from "../../../assets/images/logotrans.png";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const Maps = () => {
  const { t } = useTranslation("mainpage");

  return (
    <div className="map-container" dir={i18n.dir()}>
      <img src={Mapa} alt={t("maps.altMap")} className="map-image" />
      <div className="villa-box">
        <img
          src={villaZofiowkaLogo}
          alt={t("maps.altLogo")}
          className="villa-logo-top"
        />
        <div className="villa-info">
          <h1 className="enquiry">{t("maps.enquiries")}</h1>
          <p>
            <a href="tel:+48534778477" className="info-link">+48 534 778 477</a>
          </p>
          <p>
            <a href="mailto:zakopanezofiowka@gmail.com" className="info-link">
              zakopanezofiowka@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Maps;

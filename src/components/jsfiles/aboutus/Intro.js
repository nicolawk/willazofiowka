import React from "react";
import "../../cssfiles/aboutus/Intro.css";
import zakopaneVillaImg from "../../../assets/images/charm.jpg"; 
import cozyImage from "../../../assets/images/cozy.jpg"; 
import { useTranslation } from "react-i18next";

const ZakopaneIntro = () => {
  const { t } = useTranslation("about");

  return (
    <div className="zakopane-intro-wrapper">
      <section className="zakopane-section">
        <div className="zakopane-section-content">
          <div className="zakopane-text">
            <div>
              <h2 className="zakopane-heading">{t("zakopaneH1")}</h2>
              <p className="zakopane-description">{t("zakopaneP1")}</p>
            </div>
          </div>

          <div className="zakopane-image">
            <img src={zakopaneVillaImg} alt="Willa Zofiówka Zakopane" />
          </div>
        </div>
      </section>

      <section className="zakopane-section reverse">
        <div className="zakopane-section-content">
          <div className="zakopane-image">
            <img src={cozyImage} alt="Cozy Zakopane" />
          </div>

          <div className="zakopane-text">
            <div>
              <h2 className="zakopane-heading">{t("zakopaneH2")}</h2>
              <p className="zakopane-description">{t("zakopaneP2")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZakopaneIntro;

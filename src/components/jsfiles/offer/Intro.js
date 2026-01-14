import "../../cssfiles/offer/Intro.css";
import offerImage from "../../../assets/images/offer-image.jpg";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const OfferIntro = () => {
  const { t } = useTranslation("offer");

  return (
    <section className="offer-section" dir={i18n.dir()}>
      <div className="offer-content">
        <p className="offer-subtitle">{t("intro.subtitle")}</p>
        <h1 className="offer-title">{t("intro.title")}</h1>
        <p className="offer-description">{t("intro.p1")}</p>
        <p className="offer-description">{t("intro.p2")}</p>
        <p className="offer-description">{t("intro.p3")}</p>
      </div>
      <div className="offer-image-wrapper">
        <img
          src={offerImage}
          alt={t("intro.alt")}
          className="offer-image"
        />
      </div>
    </section>
  );
};

export default OfferIntro;

import "../../cssfiles/mainpage/Ad.css";
import villaImg from "../../../assets/images/room.jpg";
import { useTranslation } from "react-i18next";

const Ad = () => {
  const { t } = useTranslation("mainpage");

  return (
    <div className="ad-container">
      <div className="ad-text">
        <h1 className="intro-heading">{t("ad.heading")}</h1>
        <a href="/offer" className="explore-link">{t("ad.explore")}</a>
      </div>
      <div className="ad-image-wrapper">
        <img src={villaImg} alt={t("ad.alt")} className="villa-img" />
      </div>
    </div>
  );
};

export default Ad;

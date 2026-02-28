import "../../cssfiles/mainpage/Intro.css";
import villaImg from "../../../assets/images/view.webp";
import { useTranslation } from "react-i18next";

const Intro = () => {
  const { t } = useTranslation("mainpage");

  return (
    <div className="intro-container">
<h1 className="intro-heading">{t("intro.title")}</h1>
      <p className="all-txt">{t("intro.text")}</p>
      <img src={villaImg} alt={t("intro.alt")} className="villa-img" />
    </div>
  );
};

export default Intro;

import "../../cssfiles/mainpage/More.css";
import villaImg from "../../../assets/images/img2.jpg";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const More = () => {
  const { t } = useTranslation("mainpage");

  return (
    <div className="more-container" dir={i18n.dir()}>
      <h1 className="more-heading">{t("more.title")}</h1>
      <div className="more-content">
        <p className="all-txt">{t("more.text")}</p>
        <div className="img-wrapper">
          <img src={villaImg} alt={t("more.alt")} className="villa-img" />
        </div>
      </div>
    </div>
  );
};

export default More;

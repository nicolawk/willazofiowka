import "../../cssfiles/aboutus/Changing.css";
import zofiowkaRoom from "../../../assets/images/change.jpg";
import { useTranslation } from "react-i18next";

const Strengths = () => {
  const { t } = useTranslation("about");

  return (
    <section className="changing-section">
      <div className="changing-content">
        <div className="changing-text">

          <p className="changing-subtitle">
            {t("changingSubtitle")}
          </p>

          <h2 className="changing-heading">
            {t("changingHeading")}
          </h2>

          <p className="changing-paragraph">
            {t("changingP1")}
          </p>

          <p className="changing-paragraph">
            {t("changingP2")}
          </p>
        </div>

        <div className="changing-image">
          <img src={zofiowkaRoom} alt="Updated Willa Zofiówka interior" />
        </div>
      </div>
    </section>
  );
};

export default Strengths;

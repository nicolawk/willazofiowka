import "../../cssfiles/aboutus/Strength.css";
import mountainView from "../../../assets/images/zakopane.jpg"; 
import highlanderRoom from "../../../assets/images/room.jpg";
import familyFriendly from "../../../assets/images/am1.jpg";
import { useTranslation } from "react-i18next";

const OurStrengths = () => {
  const { t } = useTranslation("about");

  const strengthsData = [
    {
      image: mountainView,
      title: t("strength1Title"),
      description: t("strength1Desc"),
      link: "/offer"
    },
    {
      image: highlanderRoom,
      title: t("strength2Title"),
      description: t("strength2Desc"),
      link: "/offer"
    },
    {
      image: familyFriendly,
      title: t("strength3Title"),
      description: t("strength3Desc"),
      link: "/offer"
    }
  ];

  return (
    <section className="our-strengths-section">

      <h2 className="our-strengths-heading">
        {t("strengthsHeading")}
      </h2>

      <div className="strengths-cards">
        {strengthsData.map((strength, index) => (
          <div className="strength-card" key={index}>
            <img src={strength.image} alt={strength.title} className="strength-image" />
            <h3 className="strength-title">{strength.title}</h3>
            <p className="strength-description">{strength.description}</p>
            <a href={strength.link} className="strength-link">
              {t("strengthSeeMore")}
            </a>
          </div>
        ))}
      </div>

    </section>
  );
};

export default OurStrengths;

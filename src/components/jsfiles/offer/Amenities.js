import { useState, useCallback } from "react";
import "../../cssfiles/mainpage/Amenities.css";
import am1 from "../../../assets/images/zabawy.jpg";
import am2 from "../../../assets/images/sauna.jpg";
import am3 from "../../../assets/images/am3.jpg";
import am4 from "../../../assets/images/am4.jpg";
import am5 from "../../../assets/images/am5.jpg";
import am6 from "../../../assets/images/am6.jpg";
import am7 from "../../../assets/images/am7.jpg";
import am8 from "../../../assets/images/am8.jpg";
import am9 from "../../../assets/images/am9.jpg";
import am10 from "../../../assets/images/am10.jpg";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const imgs = [am1, am2, am3, am4, am5, am6, am7, am8, am9, am10];

const Amenities = () => {
  const { t } = useTranslation("offer"); // 👈 use the offer namespace
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % imgs.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + imgs.length) % imgs.length);
  }, []);

  return (
    <div className="photo-slider" dir={i18n.dir()}>
      {imgs.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={t(`amenities.items.${index}.alt`, { number: index + 1 })}
          loading="lazy"
          className={`slide ${index === currentIndex ? "active" : ""}`}
        />
      ))}

      <button
        className="nav-button prev"
        onClick={prevSlide}
        aria-label={t("amenities.nav.prev", "Previous")}
      >
        ‹
      </button>
      <button
        className="nav-button next"
        onClick={nextSlide}
        aria-label={t("amenities.nav.next", "Next")}
      >
        ›
      </button>

      <p className="all-txt">{t(`amenities.items.${currentIndex}.text`)}</p>
    </div>
  );
};

export default Amenities;

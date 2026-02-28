import { useEffect, useState, useCallback } from "react";
import "../../cssfiles/mainpage/Amenities.css";
import am1 from "../../../assets/images/am1.jpg";
import am2 from "../../../assets/images/ogrod.jpg";
import am3 from "../../../assets/images/am3.jpg";
import am4 from "../../../assets/images/am4.jpg";
import { useTranslation } from "react-i18next";

const Amenities = () => {
  const { t } = useTranslation("mainpage");
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: am1, text: t("amenities.playroom") },
    { src: am2, text: t("amenities.sauna") },
    { src: am3, text: t("amenities.jacuzzi") },
    { src: am4, text: t("amenities.lounge") },
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000); // auto-slide every 7s
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="photo-slider">
      {images.map((item, index) => (
        <img
          key={index}
          src={item.src}
          alt={t(`amenities.alt${index + 1}`)}
          loading="lazy"
          className={`slide ${index === currentIndex ? "active" : ""}`}
        />
      ))}

      <button className="nav-button prev" onClick={prevSlide}>‹</button>
      <button className="nav-button next" onClick={nextSlide}>›</button>

      <div className="dots-container">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      <p className="all-txt">{images[currentIndex].text}</p>
    </div>
  );
};

export default Amenities;

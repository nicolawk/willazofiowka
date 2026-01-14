import { useEffect, useState, useCallback } from "react";
import "../../cssfiles/mainpage/PhotoSlider.css";
import img1 from "../../../assets/images/slider1lato.jpg";
import img2 from "../../../assets/images/slider2lato.jpg";
import img3 from "../../../assets/images/slider3lato.jpg";
import img4 from "../../../assets/images/slider4.jpg";
import img5 from "../../../assets/images/slider5lato.jpg";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const images = [img1, img2, img3, img4, img5];

const PhotoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation("mainpage");

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="photo-slider" dir={i18n.dir()}>
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={t("slider.alt", { number: index + 1 })}
          loading="lazy"
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{
            transition: "transform 1s ease-in-out",
          }}
        />
      ))}
      <p className="all-txt">{t("slider.text")}</p>
    </div>
  );
};

export default PhotoSlider;

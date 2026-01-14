import React from "react";
import { useTranslation } from "react-i18next";
import "../../cssfiles/locations/Locations.css";

import imgZako from "../../../assets/images/zakopane.jpg";
import londyn from "../../../assets/images/londyn.jpg";
import marbella from "../../../assets/images/marbs.jpg";
import icon4 from "../../../assets/images/i4.png";

const Locations = () => {
  const { t } = useTranslation("locations");

  const locations = [
    {
      name: t("londonName"),
      description: t("londonDescription"),
      image: londyn,
      link: "https://pa-ldn.com",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39726.993862474066!2d-0.14158851283705465!3d51.50735126188847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b3314e19e09%3A0x84a057fe9a44cf37!2sLondon!5e0!3m2!1sen!2suk!4v1685312345678!5m2!1sen!2suk",
  },
    {
      name: t("marbellaName"),
      description: t("marbellaDescription"),
      image: marbella,
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3188.0285171547087!2d-4.80634868469031!3d36.50218628001256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72eddd3ea8ed9b%3A0x68ad50e4b4a490ef!2sLos%20Altos%20de%20los%20Monteros%2C%20Marbella!5e0!3m2!1sen!2ses!4v1685312345679!5m2!1sen!2ses",
  },
    {
      name: t("zakopaneName"),
      description: t("zakopaneDescription"),
      image: imgZako,
      instagram: "https://www.instagram.com/willazofiowka/",
      link: "https://willazofiowka.com",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2571.607376567256!2d19.949404315722713!3d49.29836647933317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165ff9e40b9d1b%3A0x40b0d2b24e13c6!2sJ%C3%B3zefa%20Ignacego%20Kraszewskiego%2C%2034-500%20Zakopane%2C%20Poland!5e0!3m2!1sen!2spl!4v1685282586747!5m2!1sen!2spl",
  },
];

  return (
     <div className="locations-container">
      {locations.map((loc, index) => (
        <div
          className={`location-block ${index % 2 !== 0 ? "reverse" : ""}`}
          key={index}
        >
          <div className="location-text">
            <h2>{loc.name}</h2>
            <p>{loc.description}</p>

            <div className="links-wrapper">
              {loc.link && (
                <a
                  href={loc.link}
                  className="location-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("findUs")}
                </a>
              )}

              {loc.instagram && (
                <a
                  href={loc.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-link insta-link"
                  aria-label={t("visitInstagram")}
                >
                  <img src={icon4} alt="" className="insta-icon-img" />
                  {t("visitInstagram")}
                </a>
              )}
            </div>

            <iframe
              src={loc.map}
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: "8px", marginTop: "1rem" }}
              allowFullScreen=""
              loading="lazy"
              title={t("mapTitle", { city: loc.name })}
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="location-image">
            <img src={loc.image} alt={loc.name} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Locations;
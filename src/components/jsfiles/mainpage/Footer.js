import "../../cssfiles/mainpage/Footer.css";
import logo from "../../../assets/images/logotrans.png";
import icon1 from "../../../assets/images/i1.png";
import icon2 from "../../../assets/images/i2.png";
import icon3 from "../../../assets/images/i3.png";
import icon4 from "../../../assets/images/i4.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation("mainpage");

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section brand">
          <img src={logo} alt="Willa Zofiówka logo" className="footer-logo" />
          <p className="footer-description">{t("footer.description")}</p>
        </div>

        <div className="footer-section links">
          <h3 className="footer-title">{t("footer.explore.title")}</h3>
          <ul>
            {/* ✅ Internal navigation: use Link instead of <a href="#"> */}
            <li>
              <Link to="/booking">{t("footer.explore.book")}</Link>
            </li>
            <li>
              <Link to="/locations">{t("footer.explore.locations")}</Link>
            </li>

            {/* ✅ Real link stays as <a> */}
            <li>
              <a href="tel:+48534778575">{t("footer.explore.contact")}</a>
            </li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3 className="footer-title">{t("footer.visit.title")}</h3>

          <div className="contact-item">
            <img src={icon1} alt="Address icon" className="icon" />
            <span>
              {t("footer.visit.addressLine1")}
              <br />
              {t("footer.visit.addressLine2")}
            </span>
          </div>

          <iframe
            title="Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2571.607376567256!2d19.949404315722713!3d49.29836647933317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165ff9e40b9d1b%3A0x40b0d2b24e13c6!2sJ%C3%B3zefa%20Ignacego%20Kraszewskiego%2C%2034-500%20Zakopane!5e0!3m2!1sen!2spl!4v1685282586747!5m2!1sen!2spl"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="contact-item">
            <img src={icon2} alt="Email icon" className="icon" />
            <a href="mailto:zakopanezofiowka@gmail.com">
              zakopanezofiowka@gmail.com
            </a>
          </div>

          <div className="contact-item">
            <img src={icon3} alt="Phone icon" className="icon" />
            <a href="tel:+48534778477">+48 534 778 477</a>
          </div>

          <div className="contact-item">
            <img src={icon4} alt="Instagram icon" className="icon" />
            <a
              href="https://www.instagram.com/willazofiowka/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @willazofiowka
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2025 Polka Apartments. {t("footer.bottom.text")}{" "}
          <a
            href="https://www.instagram.com/nicolawojcikowska/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("footer.bottom.author")}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
 /*LOL */
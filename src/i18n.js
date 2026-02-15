import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // ✅ Force default language to Polish on first visit
    fallbackLng: "pl",
    supportedLngs: ["pl", "en", "ar"],

    ns: ["common", "navbar", "home", "mainpage", "about", "offer"],
    defaultNS: "common",

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    detection: {
      // ✅ First visit: always pl (unless user already chose language)
      order: ["localStorage", "querystring", "navigator"],
      lookupQuerystring: "lng",
      caches: ["localStorage"],
    },

    returnNull: false,
    interpolation: { escapeValue: false },
  });

export default i18n;

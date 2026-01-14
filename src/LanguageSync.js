// LanguageSync.jsx
import { useEffect } from "react";
import i18n from "./i18n";

export default function LanguageSync() {
  useEffect(() => {
    const saved = localStorage.getItem("i18nextLng");
    const want = saved || i18n.resolvedLanguage || "en";
    if (i18n.language !== want) i18n.changeLanguage(want);
  }, []);
  return null;
}

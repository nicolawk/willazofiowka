import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./i18n";           // init side-effect
import i18n from "./i18n"; // concrete instance
import { I18nextProvider } from "react-i18next";

const root = ReactDOM.createRoot(document.getElementById("root"));

function setHtmlLangDir() {
  const lng = i18n.resolvedLanguage || "en";
  document.documentElement.lang = lng;
  document.documentElement.dir = i18n.dir(lng); // "rtl" for ar, "ltr" else
}

// In case i18n initializes async, update html attrs once ready
if (i18n.isInitialized) setHtmlLangDir();
else i18n.on("initialized", setHtmlLangDir);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div />}>
        <App />
      </Suspense>
    </I18nextProvider>
  </React.StrictMode>
);

reportWebVitals();

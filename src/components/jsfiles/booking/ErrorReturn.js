   return (
    <section className="booking-form-wrap">
      <div className="booking-form-card">
  <h2 className="bf-title">
    {t("temporaryTitle", {
      defaultValue: "Booking temporarily unavailable",
    })}
  </h2>

  <p className="bf-subtext">
    {t("temporaryTechnicalIssues", {
      defaultValue:
        "We are still working on the website and are currently experiencing some technical issues. If you are interested in making a reservation, please contact +48 534 778 477 or anita@polkaapartments.com.",
    })}
  </p>
</div>


      {false && (
        <>
          <div className="booking-form-card">
            <h2 className="bf-title">{t("title")}</h2>
            <p className="bf-subtext">{t("subtitle")}</p>

            {/* Paste your existing full <form>...</form> here */}
          </div>

          {/* Paste your existing Privacy Policy Modal block here */}
        </>
      )}
    </section>
  );
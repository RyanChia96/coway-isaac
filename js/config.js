/* =========================================================
   SITE CONFIG — edit this file to update agent details & promo.
   Every value in [BRACKETS] is a placeholder to replace.
   ========================================================= */
window.SITE = {
  brand: "[Brand Name]",                    // e.g. "CleanHome by Ryan"
  agentName: "[Agent Full Name]",
  agentId: "[Agent ID]",
  ssm: "[SSM No.]",
  address: "[Business address, City, State]",
  phoneDisplay: "+60 1X-XXX XXXX",
  phoneE164: "60100000000",                 // digits only, no + (used for wa.me and tel:)
  hours: "Daily, 9:00am – 9:00pm",
  verifyUrl: "https://vr.coway.com.my/",    // Coway's own agent verification page — confirm URL with agent

  promo: {
    month: "November 2026",
    headlinePrice: "RM20",
    promoMonths: "[X]",                     // e.g. "up to 7"
    endDate: "30 November 2026",
  },

  /* ---------- Conversion tracking: pick ONE of the two ways ----------
     A) Google Ads tag only (simplest): fill googleAds below, leave gtmId "".
        The site fires the conversions itself.
     B) Google Tag Manager: fill gtmId, leave googleAds.id "".
        Set up the conversions in GTM from the dataLayer events (see README).
     Never fill both, or every conversion is counted twice. */
  gtmId: "",                                // e.g. "GTM-ABC1234"
  googleAds: {
    id: "",                                 // e.g. "AW-123456789" (Google Ads > Goals > Conversions > tag setup)
    whatsappLabel: "",                      // conversion label for "WhatsApp click", e.g. "AbCdEfGhIjKlMn"
    formLabel: "",                          // conversion label for "Quote form sent"
  },

  legalUpdated: "15 November 2026",
};

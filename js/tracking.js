/* =========================================================
   Tracking: Google Consent Mode v2 + conversions.
   - Consent defaults to denied until the visitor accepts
     (Google Ads then models conversions from cookieless pings).
   - Way A: SITE.googleAds.id set  -> loads the Google Ads tag (gtag.js)
     and window.trackConversion() fires the conversions directly.
   - Way B: SITE.gtmId set         -> loads Google Tag Manager; build the
     conversions in GTM from these dataLayer events (main.js pushes them):
       whatsapp_click    { location, product }
       lead_form_submit  { product }
   ========================================================= */
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }

(function () {
  var S = window.SITE || {};
  var stored = null;
  try { stored = localStorage.getItem("consent"); } catch (e) {}
  var granted = stored === "granted";

  gtag("consent", "default", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
    wait_for_update: 500,
  });
  // keep the ad click id in links when cookies are declined, so conversions still match
  gtag("set", "url_passthrough", true);
  gtag("set", "ads_data_redaction", !granted);

  var ads = (S.googleAds && S.googleAds.id) || "";
  var gtm = S.gtmId || "";

  function load(src) {
    var j = document.createElement("script"); j.async = true; j.src = src;
    var f = document.getElementsByTagName("script")[0]; f.parentNode.insertBefore(j, f);
  }

  if (gtm) {
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    load("https://www.googletagmanager.com/gtm.js?id=" + gtm);
  } else if (ads) {
    load("https://www.googletagmanager.com/gtag/js?id=" + ads);
    gtag("js", new Date());
    gtag("config", ads);
  }

  // Fires a Google Ads conversion in way A; does nothing in way B (GTM handles it) or with no IDs set.
  var sent = {};
  window.trackConversion = function (kind) {
    if (gtm || !ads) return;
    var label = kind === "form" ? S.googleAds.formLabel : S.googleAds.whatsappLabel;
    if (!label) return;
    // count a visitor's WhatsApp click once per page view, so repeat taps do not inflate the numbers
    if (kind === "whatsapp" && sent.whatsapp) return;
    sent[kind] = true;
    gtag("event", "conversion", { send_to: ads + "/" + label, transport_type: "beacon" });
  };
})();

window.setConsent = function (granted) {
  var v = granted ? "granted" : "denied";
  try { localStorage.setItem("consent", v); } catch (e) {}
  gtag("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
  gtag("set", "ads_data_redaction", !granted);
};

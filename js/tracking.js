/* =========================================================
   Tracking: Google Consent Mode v2 + Google Tag Manager.
   - Consent defaults to denied until the visitor accepts.
   - GTM loads only when SITE.gtmId is set in config.js.
   - main.js pushes dataLayer events:
       whatsapp_click  { location, product }
       call_click      { location }
       quiz_submit / lead_form_submit
     In GTM, create Custom Event triggers on these names and
     attach Google Ads conversion tags + GA4 event tags.
   ========================================================= */
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }

(function () {
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

  var id = window.SITE && window.SITE.gtmId;
  if (id) {
    (function (w, d, s, l, i) {
      w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s);
      j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", id);
  }
})();

window.setConsent = function (granted) {
  var v = granted ? "granted" : "denied";
  try { localStorage.setItem("consent", v); } catch (e) {}
  gtag("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
};

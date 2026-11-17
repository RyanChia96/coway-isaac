/* Fills config values on the Privacy, Terms and Credits pages.
   A value still in [brackets] in config.js keeps the page's own wording,
   and an element marked data-hide-unset is hidden until its value is filled in. */
(function () {
  var S = window.SITE || {};
  var get = function (p) { return p.split(".").reduce(function (o, k) { return o ? o[k] : ""; }, S); };
  var isSet = function (v) { return v && String(v).indexOf("[") === -1 && !/X{2,}/.test(String(v)); };
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var v = get(el.getAttribute("data-cfg"));
    if (isSet(v)) el.textContent = v;
    else if (el.hasAttribute("data-hide-unset")) el.hidden = true;
  });
  document.querySelectorAll("[data-hide-unset]:not([data-cfg])").forEach(function (el) {
    var keys = el.getAttribute("data-hide-unset").split(",");
    if (keys.some(function (k) { return !isSet(get(k.trim())); })) el.hidden = true;
  });
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.href = "https://wa.me/" + S.phoneE164 + "?text=" + encodeURIComponent(el.getAttribute("data-wa"));
    el.target = "_blank"; el.rel = "noopener";
  });
  var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
})();

/* Fills config placeholders on the legal pages. */
(function () {
  var S = window.SITE || {};
  var get = function (p) { return p.split(".").reduce(function (o, k) { return o ? o[k] : ""; }, S); };
  document.querySelectorAll("[data-cfg]").forEach(function (el) { el.textContent = get(el.getAttribute("data-cfg")); });
  document.querySelectorAll("[data-tel]").forEach(function (el) { el.href = "tel:+" + S.phoneE164; });
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.href = "https://wa.me/" + S.phoneE164 + "?text=" + encodeURIComponent(el.getAttribute("data-wa"));
    el.target = "_blank"; el.rel = "noopener";
  });
})();

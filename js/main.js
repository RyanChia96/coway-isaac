(function () {
  "use strict";
  var S = window.SITE || {};
  var CATS = window.CATEGORIES || [];
  var PRODUCTS = window.PRODUCTS || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var get = function (path) { return path.split(".").reduce(function (o, k) { return o ? o[k] : ""; }, S); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var isSet = function (v) { return v && String(v).indexOf("[") === -1; };
  var catName = function (id) { var c = CATS.find(function (x) { return x.id === id; }); return c ? c.name : ""; };
  var imgTag = function (p, attrs) { return '<img src="assets/img/' + (p.img || "p-" + p.id + ".svg") + '" alt="Coway ' + esc(p.name) + '"' + attrs + '>'; };
  var WA = '<svg class="ico" aria-hidden="true"><use href="#i-wa"/></svg>';

  /* ---------- WhatsApp links + tracking ---------- */
  function waUrl(msg) { return "https://wa.me/" + S.phoneE164 + "?text=" + encodeURIComponent(msg); }
  function track(event, data) { window.dataLayer && window.dataLayer.push(Object.assign({ event: event }, data || {})); }
  function bindWa(el) { el.href = waUrl(el.getAttribute("data-wa")); el.target = "_blank"; el.rel = "noopener"; }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-wa]");
    if (!a) return;
    track("whatsapp_click", { location: a.getAttribute("data-track") || "unknown", product: a.getAttribute("data-product") || "" });
    window.trackConversion && window.trackConversion("whatsapp");
  });

  /* ---------- Config values (placeholders in [brackets] keep the page's own words) ---------- */
  $$("[data-cfg]").forEach(function (el) { var v = get(el.getAttribute("data-cfg")); if (isSet(v)) el.textContent = v; });
  $$("[data-cfg-href]").forEach(function (el) { var v = get(el.getAttribute("data-cfg-href")); if (isSet(v)) el.href = v; });
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  /* ---------- Catalogue: tabs, cards, modal ---------- */
  function priceHtml(p) {
    if (!p.price) return '<div class="oc-price"><span class="oc-price__ask">Ask for the latest price</span></div>';
    if (p.promo) return '<div class="oc-price"><span class="oc-price__now oc-price__now--promo">RM' + p.promo + '<small>/mo*</small></span><span class="oc-price__was">RM' + p.price + '</span></div>';
    return '<div class="oc-price"><span class="oc-price__now">RM' + p.price + '<small>/mo</small></span></div>';
  }
  function msgFor(p) { return "Hi, I'm interested in the Coway " + p.name + ". Can you share the latest promotion?"; }
  function features(p) { return p.features.filter(function (f) { return f.indexOf("~X") === -1; }); }
  function cardHtml(p) {
    var tag = p.tag ? '<span class="oc-card__tag' + (p.promo ? " oc-card__tag--promo" : "") + '">' + esc(p.tag) + "</span>" : "";
    return '<article class="oc-card">' +
      '<button class="oc-card__img" type="button" data-open="' + p.id + '" aria-label="See ' + esc(p.name) + ' details">' + tag +
      imgTag(p, ' loading="lazy" width="450" height="740"') + '</button>' +
      '<div class="oc-card__body"><span class="oc-card__cat">' + esc(catName(p.cat)) + '</span><h3>' + esc(p.name) + '</h3>' +
      '<ul>' + features(p).map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + '</ul>' +
      priceHtml(p) +
      '<a class="btn btn--secondary" data-wa="' + esc(msgFor(p)) + '" data-product="' + p.id + '" data-track="product-card">' + WA + 'Check promo</a>' +
      '</div></article>';
  }

  var grid = $("#product-grid"), tabsEl = $("#tabs"), current = "all";
  function renderProducts() {
    var list = current === "all" ? PRODUCTS : PRODUCTS.filter(function (p) { return p.cat === current; });
    grid.innerHTML = list.map(cardHtml).join("");
    $$("[data-wa]", grid).forEach(bindWa);
  }
  function setFilter(id) {
    current = id;
    $$(".oc-tab", tabsEl).forEach(function (t) { t.setAttribute("aria-selected", t.dataset.cat === id ? "true" : "false"); });
    renderProducts();
  }
  if (grid && tabsEl) {
    var used = CATS.filter(function (c) { return PRODUCTS.some(function (p) { return p.cat === c.id; }); });
    tabsEl.innerHTML = [{ id: "all", short: "All products" }].concat(used).map(function (c) {
      return '<button class="oc-tab" type="button" role="tab" data-cat="' + c.id + '" aria-selected="' + (c.id === "all") + '">' + esc(c.short) + "</button>";
    }).join("");
    tabsEl.addEventListener("click", function (e) { var t = e.target.closest(".oc-tab"); if (t) setFilter(t.dataset.cat); });
    renderProducts();
  }
  // Links that jump to the catalogue with one category picked
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-filter-link]");
    if (a && grid) setFilter(a.getAttribute("data-filter-link"));
  });

  var modal = $("#product-modal");
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-open]");
    if (!b || !modal) return;
    var p = PRODUCTS.find(function (x) { return x.id === b.dataset.open; });
    if (!p) return;
    $("#modal-body").innerHTML =
      '<div class="oc-modal__img">' + imgTag(p, '') + '</div>' +
      '<div class="oc-modal__info"><span class="oc-card__cat">' + esc(catName(p.cat)) + '</span><h3>' + esc(p.name) + '</h3>' + priceHtml(p) +
      '<ul class="oc-modal__incl">' +
      features(p).concat(["Free delivery and installation by Coway", "Regular servicing and filter changes"]).map(function (f) {
        return '<li><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg>' + esc(f) + "</li>";
      }).join("") + "</ul>" +
      '<a class="btn btn--primary" data-wa="' + esc(msgFor(p)) + '" data-product="' + p.id + '" data-track="product-modal">' + WA + 'Check promo on WhatsApp</a>' +
      (p.promo ? '<p class="oc-fine">*Introductory rate for approved applications. The normal rate applies after the promotion. <a href="terms.html">Terms apply</a>.</p>' : "") +
      "</div>";
    $$("[data-wa]", modal).forEach(bindWa);
    modal.showModal();
  });
  if (modal) modal.addEventListener("click", function (e) { if (e.target === modal || e.target.hasAttribute("data-close")) modal.close(); });

  /* ---------- Full price list: one list in three equal columns ---------- */
  var KIND = { water: "Water", outdoor: "Water", air: "Air", appl: "Appliance", home: "Home care", sleep: "Sleep" };
  function price(p) {
    if (!p.price) return "On request";
    if (p.promo) return '<span class="t-promo">RM' + p.promo + '</span> then RM' + p.price;
    return "RM" + p.price;
  }
  var pricesEl = $("[data-prices]");
  if (pricesEl) {
    var per = Math.ceil(PRODUCTS.length / 3), cols = [];
    for (var i = 0; i < PRODUCTS.length; i += per) cols.push(PRODUCTS.slice(i, i + per));
    pricesEl.innerHTML = cols.map(function (col) {
      return '<ul class="rows span-4">' + col.map(function (p) {
        return '<li><span class="rows__name">' + esc(p.name) + '<span class="rows__kind">' + esc(KIND[p.cat] || "") + '</span></span><span class="rows__value">' + price(p) + '</span></li>';
      }).join("") + '</ul>';
    }).join("");
  }

  /* ---------- Quote form → WhatsApp ---------- */
  var lead = $("#lead-form"), sel = $("#lead-product");
  if (sel) PRODUCTS.forEach(function (p) { var o = document.createElement("option"); o.value = p.name; o.textContent = p.name; sel.appendChild(o); });
  if (lead) lead.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!lead.checkValidity()) return;   // system.js shows the reason under each field
    var fd = new FormData(lead);
    var msg = "Hi, I'd like this month's Coway price.\nName: " + fd.get("name") + "\nPhone: " + fd.get("phone") +
      (fd.get("product") ? "\nInterested in: " + fd.get("product") : "") + (fd.get("area") ? "\nArea: " + fd.get("area") : "");
    track("lead_form_submit", { product: fd.get("product") || "" });
    window.trackConversion && window.trackConversion("form");
    window.open(waUrl(msg), "_blank", "noopener");
  });

  $$("[data-wa]").forEach(bindWa);

  /* ---------- Consent ---------- */
  var consent = $("#consent");
  var stored = null;
  try { stored = localStorage.getItem("consent"); } catch (e) {}
  if (consent && !stored) consent.hidden = false;
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-consent]");
    if (b) { window.setConsent && window.setConsent(b.dataset.consent === "grant"); consent.hidden = true; }
    var o = e.target.closest("[data-consent-open]");
    if (o && consent) { e.preventDefault(); consent.hidden = false; }
  });
})();

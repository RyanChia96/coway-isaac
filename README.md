# Coway Health Planner — Landing Site

Static site (HTML/CSS/JS, no build step). Built for Google Ads landing pages: fast, mobile-first, WhatsApp-first conversions.

## Run locally
```bash
python -m http.server 5173
```
Open http://localhost:5173

## Replace placeholders
| What | Where |
|---|---|
| Agent name, ID, SSM, address, phone, hours, brand name | `js/config.js` |
| This month's promo (month, price, promo months, end date) | `js/config.js` → `promo` |
| Products, prices, tags, features | `js/products.js` (**all prices are placeholders — confirm with the agent**) |
| Product photos | `assets/img/products/<id>.webp` (WebP, white background); the file name is the `img` field in `js/products.js` |
| Domain | `index.html` → `<link rel="canonical">` |
| Conversion tracking IDs | `js/config.js` → `googleAds` or `gtmId` (below) |

## Conversion tracking
Two conversions matter for the ads:
- **WhatsApp click** — any "Check promotion on WhatsApp" / "Check promo" button (counted once per page view).
- **Quote form sent** — the "Ask for this month's price" form (it then opens WhatsApp with the details).

Consent Mode v2 is built in: tags start in "denied" until the visitor accepts the cookie notice, and Google Ads models the rest. Pick **one** way:

**A) Google Ads tag only (simplest).** In Google Ads › Goals › Conversions, create two *Website* conversions ("WhatsApp click", "Quote form sent"), choose *Use Google tag manually*, and copy the `AW-…` ID and each conversion label into `js/config.js`:
```js
googleAds: { id: "AW-123456789", whatsappLabel: "AbC…", formLabel: "XyZ…" },
```
The site fires both conversions itself.

**B) Google Tag Manager.** Put the container ID in `gtmId` and leave `googleAds.id` empty. `main.js` pushes these `dataLayer` events:
- `whatsapp_click` — `location` (nav, hero, product-card, product-modal, faq, actionbar), `product`
- `lead_form_submit` — `product`

In GTM, add a Custom Event trigger for each and attach a Google Ads Conversion Tracking tag (plus a Conversion Linker tag on all pages).

Never fill both, or every conversion is counted twice. Test with Google Tag Assistant (tagassistant.google.com) before the ads go live.

## Pages
- `index.html` — main landing page
- `privacy.html` — Privacy Policy (PDPA 2010)
- `terms.html` — Rental & Promotion Terms

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
| Images | `assets/img/` — replace each `.svg` with a real photo of the same name. If you use `.webp`/`.jpg`, update the extension in `index.html` (hero, spotlight, gallery, agent) and `js/main.js` (categories `.svg`, products `p-*.svg`). |
| Domain | `index.html` → `<link rel="canonical">` |
| Google Tag Manager | `js/config.js` → `gtmId` |

Recommended image sizes: hero 1200×1400, product shots 900×900 (square, plain background), categories 900×1100, gallery any ratio. Export as WebP, under ~150 KB each.

## Conversion tracking (set up in GTM)
`main.js` pushes these `dataLayer` events:
- `whatsapp_click` — `location` (header, hero, product-card, product-modal, quiz, lead-form, mobile-bar, …), `product`
- `call_click` — `location`
- `quiz_submit`, `lead_form_submit`

In GTM: create a Custom Event trigger for `whatsapp_click` and `call_click`, then attach a Google Ads Conversion tag and a GA4 event tag. Consent Mode v2 is already wired (defaults to denied until the visitor accepts the cookie banner).

## Pages
- `index.html` — main landing page
- `privacy.html` — Privacy Policy (PDPA 2010)
- `terms.html` — Rental & Promotion Terms

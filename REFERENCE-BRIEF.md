# Coway Agent Website — Reference Brief (Google Ads)

Reviewed 15 Nov 2026: cwysales.com, cowaynow.my, coway-sales.com.
All three are single-agent "Coway Authorized Health Planner" sites on WordPress, English only, with WhatsApp as the main way to convert.

## What each site does well / badly

| | cwysales.com | coway-sales.com | cowaynow.my |
|---|---|---|---|
| Layout | One long page, category anchors, modals for legal | One long page, sticky nav, product popup | Multi-page (category pages + product pages) |
| Pricing shown | Only "from RM20/month*" | One product (POE-23A RM20 vs RM108 normal) | **Full price list per model** (best for ads relevance) |
| Lead capture | "Bundle builder" (pets, household size, purpose, contact pref) → prefilled WhatsApp | WhatsApp only (privacy policy mentions name+phone form) | WhatsApp only (wa.link) |
| Trust | Agent ID + Coway verify link, SSM, address, FAQ, customer photos | Agent ID, SSM, "1,000+ households" (**unverified placeholder left on live site**) | Coway R&D stats, awards (no source) |
| Legal | Privacy, Rental & Promo Terms, "not official Coway site" disclaimer | Privacy (PDPA 2010), T&C, disclaimer (inconsistent "Dealer" vs "Health Planner") | **None** — risky for Google Ads |
| Weakness | No per-product prices; duplicated images | Mostly empty category sections | No privacy policy, inconsistent promo dates, no agent details |

## Patterns to copy

1. **Hero = this month's promo** ("November 2026 Promotion — from RM20/month*") + one WhatsApp CTA. Footnote under the price.
2. **Benefit strip**: free delivery & installation by Coway, regular servicing, no deposit, nationwide.
3. **Product cards with real monthly prices** (cowaynow style), each with its own prefilled WhatsApp message ("Hi, I'm interested in Coway Storm 2 …").
4. **Needs quiz / bundle builder** (cwysales style) → prefilled WhatsApp. Good for qualifying leads.
5. **Agent identity block**: name, Agent ID, link to Coway's verification page, SSM no., address.
6. **FAQ** (pricing after promo, who installs, how to verify agent, delivery time).
7. **Sticky mobile bottom bar**: WhatsApp + Call.
8. **Legal**: Privacy Policy (PDPA 2010), Rental & Promotion Terms, "independent agent, not the official Coway website" disclaimer in footer.

## Google Ads requirements (what the references miss)

- **Misrepresentation policy**: must not look like the official Coway site. Clear "Independent Authorized Health Planner" label in header + footer; no "official" wording; consistent title everywhere.
- **Visible privacy policy** and business identity (name, SSM, contact). cowaynow.my has neither.
- **Promo claims must have terms nearby** (asterisk + footnote + T&C page). Don't publish unverified stats ("1,000+ households").
- **Conversion tracking**: GA4 + Google Ads tag (via GTM), fire a conversion on every WhatsApp/tel click, plus Consent Mode v2.
- **Landing-page experience / Quality Score**: fast load (static site, compressed WebP images, no page builder bloat), mobile-first, message match between ad keyword and page (separate landing pages per category: water purifier, air purifier, etc.).
- Optional real form (name, phone, product, area) as a second conversion type, since some users won't open WhatsApp.

## Proposed build

- Static site (Astro or plain HTML/CSS/JS) → hosts on Netlify/Vercel/Cloudflare Pages for free, scores ~95+ on PageSpeed. WordPress is fine too but slower.
- Pages: `/` (all products), `/water-purifier`, `/air-purifier`, `/mattress`, `/home-appliances`, `/privacy`, `/terms`.
- Product data in one JSON file so prices/promos update monthly in one place.
- GTM container with WhatsApp-click and call-click events.

## Info needed from the agent

- Name, Agent ID, SSM number, business address
- WhatsApp / phone number
- Current month's promo and product list with prices
- Logo / photos (customer installs, self photo) — real photos beat stock
- Domain name, Google Ads / GTM IDs

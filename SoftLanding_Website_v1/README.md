# SoftLanding 安落 — site

A static bilingual site for SoftLanding, the information secretary for busy lives.

## Run

```bash
cd softlanding-site
python3 -m http.server 4173
# open http://127.0.0.1:4173/
```

No build, framework, or backend. `index.html` + `styles.css` + `app.js`.

## Language

The EN / 中文 switch in the header changes every `data-i18n` string, the page title and the meta description, and remembers the choice in `localStorage`. `?lang=zh` and `?lang=en` also work for screenshots and links.

## Files

- `index.html` — one-page site
- `styles.css` — layout and identity
- `app.js` — bilingual switch, mobile menu
- `privacy.html`, `terms.html` — pilot notices (EN + 中文 on the page)
- `favicon.svg`
- `system.css`, `ui/cards.css`, `motion/motion.css`, `layout/layout.css`, `icons/icon.css` — base kit

## Before launch

- Replace `hello@softlanding.example` with the real inbox (it is a `.example` placeholder by design).
- Replace the “Nanshan, Shenzhen” district line with the real district if needed.
- The product UI is a designed preview: figures are illustrative, not customer data.
- Confirm the pilot price and the “first 50 seats” claim before publishing.
- The demo loads Google Fonts; for a privacy-first production launch, self-host Instrument Sans, DM Mono and the Chinese fonts.
- CTAs are `mailto:` links; replace with a real waitlist form when the backend exists.

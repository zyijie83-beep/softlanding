# SoftLanding 安落 — website

A single-page, bilingual (English / 中文) site for **SoftLanding 安落**, an AI-assisted, human-delivered after-loss concierge. Static HTML/CSS/JS, no build step, Netlify-ready.

## Files

```
index.html          main site
styles.css          design system, layout, responsive rules
script.js           language, menu, reveal, accordion, Netlify form
thank-you.html      native form fallback / success page
privacy.html        plain-language privacy note
404.html            custom 404
netlify.toml        publish dir + security headers
robots.txt          crawl rules (replace the domain)
sitemap.xml         sitemap (replace the domain)
DEPLOY.md           step-by-step Netlify deployment guide (Chinese)
preview-hero.png    hero preview
```

## Open locally

```bash
cd closewell
python3 -m http.server 8765
```

Then open <http://127.0.0.1:8765>.

> The Netlify form only works on the deployed site. Locally it will show the error state; that is expected.

## Language

- Default: browser language, remembered in `localStorage`.
- Force: `?lang=en` or `?lang=zh`.
- Toggle: header and footer; updates title, meta, placeholders and form options.

## Netlify form

`index.html` contains a static form named `contact` with:

- `data-netlify="true"`
- `netlify-honeypot="bot-field"`
- hidden `form-name`
- `action="/thank-you.html"` fallback

`script.js` submits it with `fetch("/", ...)` and shows the inline success state. After deploy:

1. Netlify dashboard → **Forms** → confirm `contact` exists.
2. **Form notifications** → **Email notification** → set your real address.
3. Free plan: ~100 submissions/month.

See [DEPLOY.md](DEPLOY.md) for the full walkthrough.

## Deploy

Fastest: drag the **`closewell` folder** onto <https://app.netlify.com/drop>.

Long term: push the contents of this folder to GitHub, then Netlify → Add new site → Import an existing project → publish directory `.`.

## Customize

- **Brand**: search `SoftLanding` and `安落`.
- **Colours / type**: CSS variables at the top of `styles.css`.
- **Email**: replace `care@softlanding.co` in `index.html`, `privacy.html`, `thank-you.html`, `404.html`.
- **Domain**: replace `https://softlanding.co` in `robots.txt` and `sitemap.xml`.
- **Privacy**: update `privacy.html` if your data practices change.

## Notes

- No external fonts or libraries; system serif/sans stacks (Iowan Old Style / Songti SC / PingFang SC).
- The footer calls SoftLanding a concept service. Remove that sentence when it becomes a real business.
- Check the trademark and the `softlanding.co` domain before launch; both are placeholders.
- If you target mainland China, Netlify works without ICP filing but may be slow; a mainland host would need ICP filing and real-name registration.

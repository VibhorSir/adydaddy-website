# AdyDaddy Website

Static marketing website for **AdyDaddy**, a performance marketing agency.

A standalone multi-page site with no build step, no dependencies. Open `index.html` directly, or serve the folder from any static host.

## Structure

- `index.html` — Home
- `services.html` — Services (7 disciplines)
- `portfolio.html` — Results
- `about.html` — About
- `contact.html` — Contact
- `assets/css/styles.css` — all styling
- `assets/js/main.js` — interactions
- `assets/img/` — logo, client + stack logos, generated imagery
- `assets/fonts/` — self-hosted Satoshi variable font

## Brand

- Type: Satoshi (self-hosted), Roboto fallback
- Palette: brand red `#E63946`, ink `#0A0A0A`, warm paper `#FAFAF7`
- Logo: red "AD" monogram + "AdyDaddy" wordmark
- No em dashes or en dashes anywhere in copy

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Drop the folder onto any static host: Netlify, Vercel, GitHub Pages, Cloudflare Pages, or AWS Amplify. No build step required.

## Contact form

The form currently uses a `mailto:` fallback. To capture submissions in production, wire it to Web3Forms, Formspree, or a Google Sheets Apps Script webhook (edit the submit handler in `assets/js/main.js`).

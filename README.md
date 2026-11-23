# AdyDaddy Website

Static marketing website for **AdyDaddy**, a performance marketing agency.

A standalone multi-page site with no build step, no dependencies. Open `index.html` directly, or serve the folder from any static host.

## Structure

- `index.html` Home (cinematic intro, the journey of one rupee)
- `services.html` Services (7 disciplines, live "control room")
- `industries.html` Industries (route per industry)
- `portfolio.html` Results (receipts and proof wall)
- `leak-check.html` Ad spend leak calculator
- `about.html` About (founder story)
- `contact.html` Contact (Web3Forms enquiry form)
- `landing.html` Ads landing page (noindex)
- `blog.html` and `blog-*.html` Blog (13 articles, linked from footer only)
- `privacy.html`, `terms.html` Legal
- `course.html`, `refund.html` Redirect to home (course discontinued)
- `img/` Founder photo, result screenshots, favicons, share image
- `js/` Self-hosted three.js r128 and Lenis
- `llms.txt`, `llms-full.txt`, `sitemap.xml`, `robots.txt` Search and AI discovery
- `assets/` Legacy files from the previous design, kept for old references

## Brand

- Type: Space Grotesk (300/500/700) and Inter
- Palette: black `#111111`, orange `#FF5A1F`, cream `#F5F2EC`, greys `#4A4743` and `#BDB8AF`
- Logo: faceted north star with a hidden A, wordmark "ady" light + "daddy" bold
- No em dashes or en dashes anywhere in copy

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Drop the folder onto any static host: Netlify, Vercel, GitHub Pages, Cloudflare Pages, or AWS Amplify. No build step required.

## Forms

All forms (contact, landing, leak calculator) post to Web3Forms and fire a GA4 `generate_lead` event. GA4 property: G-Z9T2VV0LWQ.

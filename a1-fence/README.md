# A1 Professional Fence LLC — Demo Site

Clone of the A1 asphalt website template, rebranded for fencing.

## Deploy on Render

1. Create GitHub repo `a1-fence` (or use this folder from `a1-asphalt-voxtalk-3/deploy/a1-fence`)
2. **Build command:** `npm install`
3. **Start command:** `node server/server.js`
4. Drop Joe's real logo at `public/images/a1-fence-logo.png` (replace the SVG placeholder)

## Voice AI

Site iframe points to: `https://a1-asphalt-voxtalk-3.onrender.com/fence/`

Redeploy **a1-asphalt-voxtalk-3** after pulling latest `main` so `/fence/` and `/fence/session` are live.

## Phone / web

- **888-223-3797**
- **A1FencePro.com**

## Regenerate pages

```bash
python3 scripts/build-site.py
```

## Pages

- `index.html` — homepage
- `wood-fences.html`, `vinyl-fences.html`, `chain-link-fences.html`
- `gates.html`, `residential-fences.html`, `commercial-fences.html`
- `about.html`

Stock photos load from Unsplash/Pexels URLs in CSS (no download required for demo).

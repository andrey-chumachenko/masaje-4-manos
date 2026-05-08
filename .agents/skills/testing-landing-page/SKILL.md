# Testing: Masaje 4 Manos Landing Page

## Stack
- Vite 8 + React 19 + TypeScript + Tailwind CSS v4
- Static site deployed to Cloudflare Pages
- Auto-deploy from `main` branch

## Local Dev Setup
```bash
npm install
npm run dev  # starts on localhost:5173 (or next available port)
```

## Key Commands
- `npm run lint` — ESLint check
- `npm run build` — TypeScript + Vite production build
- `npm run dev` — Vite dev server with HMR

## Site Sections & Navigation
The site is a single-page app with hash-based navigation:
- `/#inicio` — Hero section with slideshow (6 photos, 5s interval)
- `/#nosotras` — About section
- `/#servicios` — Services with pricing (4 services, 80€–350€)
- `/#peleamiento` — Body wrap treatment section
- `/#certificado` — Gift certificate (Bono Regalo) section
- `/#galeria` — Infinite carousel gallery
- `/#contacto` — Contact form + WhatsApp/Instagram links

Use the nav bar links or append hash to URL to navigate directly.

## i18n Testing
- Two languages: ES (Spanish) and UA (Ukrainian)
- Toggle via "UA"/"ES" button in the header
- All section content is translated; verify both languages when testing text changes
- Ukrainian labels are shorter in nav to prevent overflow (e.g., "Сертифікат" instead of "Подарунковий сертифікат")

## CSS/Styling Testing Tips
- Use browser console to check computed styles: `window.getComputedStyle(element).propertyName`
- Tailwind v4 uses `@theme` in `src/index.css` for custom values
- `object-contain` with `border-radius` might not visually round image content — the radius applies to the element box, not the visible image. Use `object-cover` or remove `object-contain` for visible rounding.
- When comparing before/after for styling fixes, use the live site (masaje4manos.es) as "before" and local dev as "after"

## Deployment
- Production: https://masaje4manos.es/ (Cloudflare Pages, auto-deploys from `main`)
- Staging: https://masaje-4-manos.pages.dev/ (same, updated on every push to `main`)
- Changes typically appear within 2-3 minutes after push to `main`
- DNS for masaje4manos.es might not resolve from all locations; use staging URL as fallback

## WhatsApp & Instagram
- WhatsApp: https://wa.me/34627796083
- Instagram: https://www.instagram.com/masaje.a.4manos

## Devin Secrets Needed
None — this is a static frontend with no authentication required.

# Development & Testing

## Stack
- Vite + React 19 + TypeScript
- Tailwind CSS v4 (uses `@theme` in `src/index.css`)
- Static frontend — no backend/API

## Local Dev
```bash
npm install
npm run dev          # Starts Vite dev server on localhost:5173
```

## Lint & Build
```bash
npm run lint         # ESLint
npm run build        # TypeScript check + Vite production build → dist/
```
Always run both before committing.

## Deployment
Static site deployed to devinapps.com:
```bash
npm run build
# Then deploy the dist/ folder as a frontend
```

## Project Structure
- `src/sections/` — page sections (Hero, SobreNosotras, Servicios, Pelenamiento, CertificadoRegalo, Galeria, Contacto)
- `src/components/` — shared components (Header, Footer)
- `public/images/` — all photo assets
- `public/logo-*.svg` — logo color variants (white, gold, cream)
- `public/favicon.svg` — SVG favicon

## Testing
- No test framework configured — testing is done via browser (visual/E2E)
- Start dev server, open localhost:5173 in browser
- Key areas to test: hero slideshow rotation & dot navigation, SVG logo rendering across header/footer/hero, favicon, certificate image visibility
- Use screen recording for GUI testing evidence

## Key Constants
- WhatsApp: `https://wa.me/34627796083`
- Instagram: `https://www.instagram.com/masaje.a.4manos`
- Hero slideshow interval: 5000ms (configurable in `HERO_SLIDES` array in `src/sections/Hero.tsx`)

# Testing: Masaje a 4 Manos Website

## Overview
Static frontend website (Vite + React 19 + TypeScript + Tailwind CSS v4) for a 4-hand massage salon. Deployed to devinapps.com as a static site — no backend.

## Deployment
- **Live URL:** https://dist-awwlepiz.devinapps.com
- **Deploy command:** `deploy` tool with `command="frontend"` and `dir` pointing to the `dist/` folder after `npm run build`
- Build: `npm run build` produces static files in `dist/`

## Key Testing Areas

### Navigation (7 sections)
The site uses anchor-based navigation. The header has 7 nav links:
- Inicio (`#inicio`)
- Nosotras (`#nosotras`)
- Servicios (`#servicios`)
- Peleamiento (`#pelenamiento`) — NOTE: the section ID is `pelenamiento` (with extra 'n'), not `peleamiento`
- Bono Regalo (`#certificado`)
- Galeria (`#galeria`)
- Contacto (`#contacto`)

**Known gotcha:** The Peleamiento nav label maps to `#pelenamiento` (not `.toLowerCase()` of the label). This mismatch has caused bugs before — always verify this link specifically.

### WhatsApp Integration
- Phone: +34 627 796 083
- All CTA buttons should have `href` containing `wa.me/34627796083`
- Contact form submits by opening WhatsApp with pre-filled message: `https://wa.me/34627796083?text=...`
- Test by filling form fields and clicking submit — verify new tab URL contains the phone number and encoded form data

### Images (17 total)
All images are in `/public/images/`:
- `hero.jpg` — Hero background
- `nosotras.jpg` — About section portrait
- `servicio-destacado.jpg` — Featured service
- `peleamiento-01.jpg` through `peleamiento-04.jpg` — Body wrap section
- `certificado-regalo.jpg` — Gift certificate
- `galeria-01.jpg` through `galeria-08.jpg` — Gallery grid
- `logo-small.png` — Header/footer logo

Verify zero broken image icons by scrolling through the entire page.

### Mobile Responsive Testing
- Resize browser to 375px width using `xdotool getactivewindow windowsize 375 700`
- Verify hamburger menu appears (replaces horizontal nav)
- Verify hamburger menu contains all 7 nav items
- Gallery should collapse to 2-column grid
- Gift certificate section should stack vertically
- Restore with `xdotool getactivewindow windowsize 1024 768`

### Footer Navigation
- Footer has its own nav links — test separately from header nav
- Footer includes Instagram link to `instagram.com/masaje.a.4manos`
- Copyright should show current year

## Testing Tips
- The site is a single-page app with smooth scroll — clicking nav links doesn't trigger page reload
- WhatsApp form submission opens a new tab — close the WhatsApp tab after verification
- Use `xdotool` for window resizing since `wmctrl` may not be installed
- For recording, maximize browser first with: `wmctrl -r :ACTIVE: -b add,maximized_vert,maximized_horz` (install wmctrl if needed, or use xdotool)

## Devin Secrets Needed
None — this is a static site with no authentication or API keys required.

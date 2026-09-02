# Masaje relajante a 4 Manos — Sitio Web

Sitio web landing page para sesiones de masaje relajante a cuatro manos. Dos especialistas, una experiencia corporal centrada en el bienestar general.

> *Doble tecnica, doble relajacion.*

## Secciones

- **Hero** — pantalla completa con branding y CTAs
- **Sobre Nosotras** — historia y filosofia de las especialistas
- **Servicios** — sesiones de masaje relajante y cuidado corporal a 4 manos
- **Peleamiento Corporal** — nuevo servicio de envoltura corporal con descripcion completa
- **Galeria** — grid de imagenes con acceso a WhatsApp
- **Contacto** — WhatsApp, ubicacion, formulario de contacto
- **Footer** — navegacion y redes sociales

## Tech stack

- [Vite](https://vite.dev/) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first `@theme` config)
- Google Fonts: Playfair Display + Lato

## Develop

```bash
npm install
npm run dev      # local dev server
npm run lint     # eslint
npm run build    # tsc -b && vite build
npm run preview  # serve the production build locally
```

## Generative photo prompts

See [`PROMPTS_PELENAMIENTO.md`](./PROMPTS_PELENAMIENTO.md) for ready-to-use prompts (Midjourney/DALL-E/Flux) for the Peleamiento Corporal service photo session.

## Deploy

Static site — deploy the `dist/` folder to any hosting (GitHub Pages, Netlify, Vercel, etc.).

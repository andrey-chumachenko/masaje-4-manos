# Masaje a 4 Manos — Sitio Web

Sitio web landing page para un salon de masaje a cuatro manos. Dos terapeutas, una experiencia unica de relajacion profunda.

> *Doble tecnica, doble relajacion.*

## Secciones

- **Hero** — pantalla completa con branding y CTAs
- **Sobre Nosotras** — historia y filosofia de las terapeutas
- **Servicios** — Masaje Relajante, Descontracturante y Holistico a 4 manos
- **Peleamiento Corporal** — nuevo servicio de envoltura corporal con descripcion completa
- **Galeria** — grid de imagenes con link a Instagram
- **Contacto** — Instagram, ubicacion, formulario de contacto
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

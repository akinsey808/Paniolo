# Paniolo — Landing Page

> *We herd your coding agents to write good code, efficiently.*

Pre-product landing page for **Paniolo**, an agentic harness engineering CLI built on peer-reviewed research from ICLR 2026.

---

## Structure

```
paniolo/
├── index.html          # Homepage: hero, features, stats, research, Substack, contact
├── pages/
│   └── about.html      # About: team story, founder profiles, values
├── css/
│   └── style.css       # Full design system (CSS custom properties, all components)
├── js/
│   ├── main.ts         # TypeScript source
│   └── main.js         # Compiled JS (browser-ready)
├── assets/             # Drop team photos here (see comments in about.html)
├── tsconfig.json
└── package.json
```

## Setup

```bash
npm install
npm run build:ts   # compile TypeScript
npm run dev        # serve locally on :3000
```

## Adding the Team Photo

In `pages/about.html`, find the `team-photo-placeholder` div and replace it:

```html
<img
  src="../assets/team.jpg"
  alt="Ben and daughter — Paniolo founding team"
  style="width:100%;height:100%;object-fit:cover;"
/>
```

## Replacing the Contact Form

The form submits via a simulated timeout by default. Replace the `setTimeout` block in `js/main.ts` with a real API endpoint (Formspree, Netlify Forms, your own backend).

## Design System

| Token | Value |
|-------|-------|
| `--cream` | `#F5F0E8` |
| `--charcoal` | `#1C1C1E` |
| `--accent` (gold) | `#8B6914` |
| Display font | Cormorant Garamond |
| Body font | DM Sans |
| Mono font | DM Mono |

## Accessibility

- Semantic HTML5 (`nav`, `main`, `section`, `article`, `footer`)
- ARIA labels on all interactive elements
- `aria-current` on active nav links
- `role="alert"` on form success message
- Color contrast validated for WCAG AA
- Keyboard-navigable (all interactive elements in natural tab order)
- Reduced motion: add `@media (prefers-reduced-motion: reduce)` overrides as needed

## Deploy

Works as static HTML — deploy to GitHub Pages, Vercel, Netlify, or Cloudflare Pages with zero configuration.

---

© 2026 Paniolo · Honolulu, Hawaiʻi

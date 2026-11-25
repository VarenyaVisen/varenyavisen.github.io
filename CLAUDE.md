# Shashank's Portfolio

Personal portfolio site. The full plan lives in @docs/PLAN.md. Read it before any big change.
Visual references are in `design/inspiration/` (what to take from each is listed in PLAN.md).

## Stack
- Astro (latest version, static output) + TypeScript (strict). Node.js 22.12+ or 24 LTS.
- Tailwind CSS v4 via `@tailwindcss/vite`, with colors mapped to CSS variables in `src/styles/tokens.css`
- No React or other UI framework unless I approve it. Use plain Astro components and small vanilla TS `<script>`s.
- Fonts via Fontsource (self-hosted). Icons: Lucide.
- Deploy: GitHub → Vercel (or Cloudflare Pages)

## Golden rule: content is data
- ALL text content (name, bio, jobs, projects, skills, certs, achievements, interests, links) lives in YAML files in `src/data/`.
- Components only READ data. Never hardcode personal content inside a component.
- Every YAML file has a zod schema in `src/content.config.ts`, so a typo gives a clear error.
- If a data file is empty or missing, its section and nav link are hidden automatically.
- When I say "add X to my portfolio", edit the YAML, not the components.

## Design rules
- Concept: "Engineer's notebook". Light mode is a cream graph-paper notebook with cartoony doodles. Dark mode is a night terminal with a grid and neon accents. Same layout, different material.
- Use only the tokens in `tokens.css` (colors, radii, shadows, fonts). No one-off hex values in components.
- Fonts: JetBrains Mono (headings, labels, UI), Geist (body), Caveat (handwritten notes), Instrument Serif (the Interests section only).
- Avoid generic AI look: no purple-to-blue gradients, no Inter, no emoji as icons, no centered-everything layouts.
- Motion is subtle and must respect `prefers-reduced-motion` and the global "Pause motion" toggle.
- Theme: `data-theme="light|dark"` on `<html>`, default from system preference, saved in localStorage, with an inline head script so there is no flash.

## Code rules (keep it beginner-readable)
- One component per section in `src/components/sections/`. Shared bits go in `src/components/ui/`.
- Add a 2–3 line comment at the top of every component saying what it does and which YAML file it reads.
- Prefer simple and obvious over clever. No state libraries, no abstractions "for later".
- Images go in `src/assets/` (optimized with `astro:assets`) or `public/` for files linked directly (resume PDF).

## Workflow
- Work one phase or section at a time (phases are in PLAN.md). Don't build ahead.
- After each change, run `npm run build` and `npx astro check` and fix every error before saying you're done.
- Check both light and dark mode and a 375px mobile width for every section.
- Never invent facts about me. Use `TODO:` placeholders in YAML for anything you don't know.

## Commands
- `npm run dev` starts the dev server at http://localhost:4321
- `npm run build` builds the production site
- `npx astro check` runs type checks

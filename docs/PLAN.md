# Portfolio Plan: "Engineer's Notebook"

A portfolio that feels like a backend engineer's notebook: half cartoony doodles, half precise
system diagrams. Light mode is cream graph paper with ink. Dark mode is a terminal at night.
It's fun to look at but still professional enough to send to a recruiter.

---

## 1. Inspiration: what to take from each screenshot

| File | Take this | Leave this |
|---|---|---|
| `01-hero-ascii-portrait.png` | Big bold **monospace** headline with an *italic muted* second line. Spaced-caps eyebrow label ("PONYTAIL 5.3 · NOW WITH…"). **ASCII art made of code characters** with a few accent-colored glyphs (we use it for an animated "diffusion" canvas). Faint code texture in the background. Floating pill nav with blur. "Pause motion" button. | The exact wording and branding |
| `02-hero-ascii-portrait-variant.png` | Same hero, different portrait framing. The portrait can be loose or partial; it doesn't need a full face. | — |
| `03-experience-pipeline-diagram.png` | Experience entry layout: role title, company in accent color, location, `FULL-TIME` tag. A **"the product, end-to-end" pipeline diagram** (nodes in a line, small label above, metric below). `CAME IN TO DO` paragraph. `SHIPPED` list with `→` bullets, dashed dividers and `case study →` links. Subtle grid background. | Their content |
| `04-experience-latency-trace.png` | **Latency trace / waterfall** variant of the diagram (query → expand → retrieve → answer, with timing bars). The date range sits top-right. | — |
| `05-cartoony-isometric-light.png` | **The cartoony part.** Cream background, **isometric 3D blocks** (orange, blue, purple), tiny people figures, chunky buttons with **hard offset shadows**, pill badges, a stat strip, a numbered step tracker, a "key idea" callout box. | The course/sidebar layout |
| `06-interests-bento.png` | **Interests as bento cards** with big rounded corners, a display **serif** heading ("I love gaming"), a **handwritten note with a doodle arrow** ("some of my favourites"), tilted stacked tiles, a photo carousel with dots. | — |

**The mix:** structure and diagrams from 01–04 (professional), materials and personality from 05–06 (cartoony).
Light mode leans 05. Dark mode leans 01–04.

---

## 2. Tech stack (and why)

| Tool | Why |
|---|---|
| **Astro** (latest, static) | Builds a plain HTML/CSS site. Fast, free to host, almost no JS. Components look like HTML, so they're easy to read. |
| **TypeScript** | Catches mistakes in data and components. |
| **Tailwind CSS v4** | Styling in the markup, mapped to our design tokens. |
| **YAML + Astro content collections + zod** | All content in readable YAML files. Schemas give friendly errors if you make a typo. |
| **Fontsource** | Self-hosted fonts: JetBrains Mono, Geist, Caveat, Instrument Serif. |
| **Lucide icons** | Clean line icons. |
| **Vanilla TS scripts** | Theme toggle, ASCII animation, small interactions. No React. |
| **GitHub + Vercel** (or Cloudflare Pages) | Push to `main` and the site goes live automatically. Free. |

Requires Node.js 22.12+ (24 LTS recommended).

---

## 3. Site map (single page with anchor sections + 1 extra page)

```
/                     one long page
├── #home             Hero
├── #about            About me
├── #experience       Experience
├── #projects         Projects
├── #skills           Skills
├── #achievements     Achievements (competitive programming and more)
├── #certifications   Certifications
├── #interests        Personal interests (gaming, etc.)
└── #contact          Contact + footer
/styleguide           (dev only) every token, button, card and badge in both themes
/resume.pdf           in /public
```

Nav order comes from one list in `src/data/site.yaml`. A section whose data is empty disappears from the page and the nav.

---

## 4. Folder structure

```
Portfolio/
├── CLAUDE.md
├── docs/
│   ├── PLAN.md                ← this file
│   └── PROMPTS.md             ← copy-paste prompts for each phase
├── design/inspiration/        ← reference screenshots
├── public/
│   ├── resume.pdf
│   └── favicon.svg
├── src/
│   ├── data/                  ← ✏️  THE ONLY PLACE YOU EDIT CONTENT
│   │   ├── site.yaml          (nav order, SEO title/description, which sections are on)
│   │   ├── profile.yaml       (name, headline, about, links, quick facts)
│   │   ├── experience.yaml
│   │   ├── projects.yaml
│   │   ├── skills.yaml
│   │   ├── achievements.yaml
│   │   ├── certifications.yaml
│   │   └── interests.yaml
│   ├── assets/                ← images (interest photos, logos)
│   ├── content.config.ts      ← zod schemas for every YAML file
│   ├── styles/
│   │   ├── tokens.css         ← colors, fonts, radii, shadows for light + dark
│   │   └── global.css
│   ├── components/
│   │   ├── ui/                ← Button, Badge, Card, SectionHeader, Annotation, ThemeToggle, MotionToggle
│   │   ├── diagrams/          ← PipelineDiagram, TraceDiagram, IsoBlock
│   │   └── sections/          ← Hero, About, Experience, Projects, Skills, Achievements, Certifications, Interests, Contact
│   ├── layouts/BaseLayout.astro   ← <head>, fonts, theme script, nav, footer
│   └── pages/
│       ├── index.astro
│       └── styleguide.astro
└── astro.config.mjs
```

---

## 5. Design system

### Theme concept
- **Light: "Notebook".** Cream paper, faint graph-paper grid, black ink outlines, cartoony isometric fills, hard offset shadows, handwritten notes.
- **Dark: "Night terminal".** Near-black, faint grid, neon green as the primary accent, purple as secondary, glows instead of hard shadows, faint code texture behind the hero.

### Color tokens (starting point; tune on /styleguide)

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#F5F0E6` | `#0A0A0B` |
| `--surface` | `#FFFDF8` | `#111113` |
| `--ink` (text) | `#1C1A17` | `#EDEAE4` |
| `--muted` | `#6B645A` | `#8A8680` |
| `--line` (borders) | `#1C1A17` | `#2A2A2E` |
| `--grid` | `rgba(28,26,23,0.07)` | `rgba(255,255,255,0.04)` |
| `--accent` (green) | `#15803D` | `#22C55E` |
| `--accent-2` (purple) | `#7C3AED` (darker than #8B5CF6 so text passes WCAG AA) | `#A78BFA` |
| `--block-orange` | `#F6B67A` | `#FBBF24` |
| `--block-blue` | `#A5C8F5` | `#60A5FA` |
| `--block-purple` | `#CFC2F7` | `#A78BFA` |
| `--shadow-pop` | `3px 3px 0 var(--ink)` | `0 0 0 1px var(--line), 0 0 24px -8px var(--accent)` |

### Typography
- **Headings / labels / UI:** JetBrains Mono, bold. Labels in spaced caps (`letter-spacing: 0.2em`).
- **Body:** Geist, 17–18px, line-height 1.6.
- **Handwritten notes:** Caveat, used sparingly for doodle annotations.
- **Interests section headings only:** Instrument Serif.

### Signature elements (reused everywhere)
1. **Chunky button**: border + hard shadow. On press it shifts 2px down-right and the shadow shrinks. In dark mode it gets a glowing border.
2. **Sticker badge**: pill, slightly rotated (±2°), used for tags like `FULL-TIME` and skill chips.
3. **Annotation**: Caveat text + a hand-drawn SVG arrow pointing at something.
4. **Section header**: `02 · EXPERIENCE` eyebrow in spaced caps + big mono title + optional italic subtitle.
5. **Grid background**: CSS background on the page, very faint.
6. **IsoBlock**: an SVG isometric cube/cylinder with an icon and label (from screenshot 05), for diagrams and skills.

### Motion
- Fade/slide-in on scroll (once), 200–400ms, ease-out.
- Diagram "packets": small dots travelling along pipeline lines.
- Hero diffusion: shapes form out of ASCII noise, hold, then dissolve (see Hero).
- A global **Pause motion** button (bottom-right, like screenshot 01) plus `prefers-reduced-motion` turn all of this off.

---

## 6. Sections in detail

### Nav
Floating pill, centered, blurred background. Name/logo on the left, section links, then `Resume ↗`, then ThemeToggle.
The ThemeToggle is a sun/moon icon that rotates when swapped (the moon can wear a tiny nightcap 🙂 drawn in SVG).
On mobile it collapses to a menu button.

### Hero (`profile.yaml`)
- Eyebrow: `SDE-II · ZOMATO · GO / PHP →`
- Title: name in big bold mono. Second line in italic muted mono (e.g. *"I build the boring parts that never go down."*). The tagline comes from YAML.
- One-sentence intro + two buttons: `See my work ↓` (chunky) and `Get in touch →` (text link).
- Right side: an animated **"diffusion" ASCII canvas** (inspired by screenshot 01). No photo.
  - Background: dim code characters.
  - A shape forms out of random noise, as if an AI is denoising it: characters inside the shape brighten and some turn accent-colored. It holds ~3s, dissolves back into noise, then the next shape forms.
  - Shapes cycle: neural network, brain, server rack, game controller, trophy, my initials.
  - Shapes live in `src/data/hero-shapes.yaml` as text masks (rows of `#` and `.`) so I can draw new ones in a text editor.
  - Capped at ~30fps, pauses when the hero is off-screen, shows one static shape when Pause motion or `prefers-reduced-motion` is on, and uses theme tokens so it looks right in both themes.
- Background: faint code texture (dark mode) / graph paper (light mode).

### About (`profile.yaml → about, quickFacts`)
- Left: 2–3 short paragraphs.
- Right: 3–4 "sticky note" quick-fact cards, slightly rotated, each with a Lucide icon: `IIT Dhanbad`, `India`, `currently into low-latency C++`, `…`
- One handwritten annotation pointing at something fun.

### Experience (`experience.yaml`)
Vertical list of entries, newest first. Each entry has:
- Title row: role (mono, bold), company (accent color), location, type badge, date range top-right.
- **Optional diagram** chosen by `diagram.type`:
  - `pipeline`: nodes in a row with a label above and a metric below (screenshot 03)
  - `trace`: a latency waterfall with bars (screenshot 04)
  - In light mode, nodes are drawn as small isometric blocks; in dark mode, as glowing circles.
- `CAME IN TO DO` paragraph.
- `SHIPPED` list: `→` bullets, dashed dividers, optional `case study →` / `link →`.
- Stack chips at the bottom.

### Projects (`projects.yaml`)
Card grid (2 columns on desktop). Each card has a title, one-liner, a highlight metric ("O(1) per order", "wait-free"), tags, GitHub/demo links, and an optional tiny diagram or image.
`featured: true` projects get a wide card.

### Skills (`skills.yaml`)
Grouped by category (Languages, Backend & Infra, Data, Frontend, Tools).
- Default: groups of sticker-badge chips.
- Stretch goal: an **isometric "stack"**, one IsoBlock layer per category stacked like a tech stack, that lifts on hover and shows the chips.

### Achievements (`achievements.yaml`)
Styled like **game "Achievement Unlocked" cards**: icon, title, subtitle, date, rarity color (gold / silver / bronze).
This is where coding meets gaming. Optionally fetch the live Codeforces rating at build time (with a fallback if the API fails).

### Certifications (`certifications.yaml`)
Compact cards: name, issuer, date, `verify →` link, optional logo. Hidden if the list is empty.

### Interests (`interests.yaml`)
Bento grid (screenshot 06). Instrument Serif headings, big rounded cards.
- **Gaming card**: "I love gaming" + a short line + a stack of tilted tiles (my own screenshots/images) + a handwritten "some of my favourites" with an arrow. It can also show my in-game achievements.
- Other cards: photography carousel, music, anything else. Each card's `layout` (`wide`, `tall`, `square`) comes from YAML.

### Contact + footer (`profile.yaml → links, email`)
A terminal-style card:
```
$ contact varenya          (name comes from profile.yaml)
> email    TODO           [copy]
> github   github.com/…
> linkedin linkedin.com/in/…
```
Footer: "Built with Astro · last updated {build date}" + a tiny doodle.

---

## 7. Data shapes (examples)

`src/data/profile.yaml`
```yaml
name: Varenya
headline: SDE-II · Backend Engineer
eyebrow: "SDE-II · ZOMATO · GO / PHP"
tagline: "TODO: one punchy italic line"
intro: "TODO: one-sentence intro"
location: India
email: TODO
resume: /resume.pdf
about:
  - "TODO paragraph 1"
  - "TODO paragraph 2"
quickFacts:
  - { icon: graduation-cap, text: "IIT Dhanbad" }
  - { icon: zap, text: "Currently into low-latency C++" }
links:
  - { label: GitHub, url: TODO, icon: github }
  - { label: LinkedIn, url: TODO, icon: linkedin }
  - { label: Codeforces, url: TODO, icon: code }
```

`src/data/experience.yaml`
```yaml
# One entry per company, newest first. Dates are YYYY-MM; an end date can also be "present".
- company: Kellton Tech Solutions
  companyUrl: https://...   # optional: links the company name
  location: TODO
  summary: "TODO: one line on what you owned here"   # optional
  roles:                    # newest first; add one above for a promotion
    - title: Software Engineer
      type: Full-time
      start: 2025-09
      end: present
  projects:                 # projects built at this company, newest first
    - name: AI-Powered Observability Platform
      start: 2026-06        # optional
      end: 2026-08          # optional
      description: >
        Turn unstructured application logs into a RAG chatbot that finds
        the relevant logs and generates root causes.
      did:                  # 2–4 bullets
        - "Preprocessing pipeline that standardizes unstructured application logs for analysis"
        - "Reranking with cross-encoder/ms-marco-MiniLM-L-6-v2 before root cause generation"
      impact: "RAG Triad evaluation: 92% context relevance, 95% groundedness, 92% answer relevance"   # optional
      stack: [Python, Chroma, LangChain]
      link: https://...     # optional, shows "link →"
```
The company's date range (top right) is worked out from its roles. Experience has no diagrams;
`PipelineDiagram` / `TraceDiagram` stay in `src/components/diagrams/` (shown on /styleguide) for use elsewhere.

`src/data/projects.yaml`
```yaml
- title: O(1) Order Book
  oneLiner: "Limit order book with O(1) add / cancel / match"
  highlight: "O(1) per op"
  tags: [C++, low-latency]
  repo: TODO
  featured: true
- title: Lock-free Seqlock
  oneLiner: "TODO"
  highlight: "lock-free"
  tags: [C++, concurrency]
  repo: TODO
- title: Wait-free SPSC Queue
  oneLiner: "TODO"
  highlight: "wait-free"
  tags: [C++, concurrency]
  repo: TODO
```

`src/data/achievements.yaml`
```yaml
- title: Candidate Master
  subtitle: Codeforces
  rarity: gold          # gold | silver | bronze
  icon: trophy
  date: TODO
  link: TODO
- title: ICPC Regionalist
  subtitle: ICPC
  rarity: silver
  icon: medal
- title: Meta Hacker Cup, Round 2
  subtitle: Meta
  rarity: silver
  icon: flag
```

`src/data/skills.yaml`
```yaml
- category: Languages
  items: [Go, PHP, C++, Python, TypeScript, SQL]
- category: Backend & Infra
  items: [TODO]
- category: Frontend
  items: [React]
```

`src/data/certifications.yaml`
```yaml
[]   # empty list → section hidden. Example entry:
# - name: TODO
#   issuer: TODO
#   date: 2026-01
#   url: TODO
```

`src/data/interests.yaml`
```yaml
- title: I love gaming
  text: "TODO: what you play / how"
  layout: wide          # wide | tall | square
  kind: stack           # stack (tilted tiles) | carousel | plain
  note: "some of my favourites"   # handwritten annotation, optional
  images: [gaming/1.jpg, gaming/2.jpg, gaming/3.jpg]
- title: "& photography"
  layout: tall
  kind: carousel
  images: [photos/1.jpg, photos/2.jpg]
```

---

## 8. Build phases (one Claude Code session each; commit after each)

| # | Phase | Done when |
|---|---|---|
| 0 | **Plan review** in plan mode | Claude has read everything and asked its questions; plan approved |
| 1 | **Scaffold + design system**: Astro, Tailwind, fonts, `tokens.css`, theme toggle, Pause motion, `/styleguide` | /styleguide looks right in both themes, no flash on reload |
| 2 | **Data layer**: all YAML files + zod schemas + `TODO` placeholders | `astro check` passes; a deliberate typo gives a readable error |
| 3 | **Layout**: BaseLayout, floating nav, footer, section shells, hide-if-empty logic | Nav scrolls to each section; mobile menu works |
| 4 | **Hero** with diffusion ASCII canvas | Looks good in both themes; motion stops when paused |
| 5 | **About + Experience** with PipelineDiagram / TraceDiagram | Diagrams are driven entirely by YAML |
| 6 | **Projects + Skills** | — |
| 7 | **Achievements + Certifications + Interests** | Bento works on mobile |
| 8 | **Polish**: responsive pass, accessibility, SEO + OG image, Lighthouse ≥ 95 | Lighthouse report screenshot |
| 9 | **Deploy**: GitHub repo + Vercel | Live URL; push = redeploy |

---

## 9. How I edit later (no Claude needed)

- **New job:** open `src/data/experience.yaml`, copy the top entry, paste it above, and change the text. Save. The dev server updates instantly.
- **New certification / achievement / project:** same thing in its YAML file.
- **Hide a section:** empty its YAML list (`[]`) or turn it off in `site.yaml`.
- **Change a color:** edit `src/styles/tokens.css`.
- **Go live:** `git add . && git commit -m "add new role" && git push`. Vercel redeploys automatically.

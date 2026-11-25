# Prompts to copy and paste into Claude Code

How to use these:
- Start each phase with a fresh conversation (`/clear`) so Claude isn't carrying old context.
- Phase 0 runs in **plan mode** (`Shift+Tab` until you see `⏸ plan mode on`). For the later phases you can switch back to normal mode.
- After every phase: look at the site yourself, then commit with `git add . && git commit -m "phase N"`.
- Something looks wrong? Take a screenshot, paste it with `Ctrl+V` (or drag it in), and say what's off.

---

## Phase 0: Plan review (PLAN MODE)

```
Read @CLAUDE.md and @docs/PLAN.md carefully, then look at every image in
design/inspiration/. Don't write any code yet.

1. In your own words, describe the visual style you'll build: how light mode and
   dark mode differ, and what you're taking from each screenshot.
2. Point out anything in the plan that's unclear, contradictory, or will be hard
   to build, and suggest simpler alternatives.
3. Ask me any questions you need answered (my content, preferences, assets).
4. Then give a step-by-step plan for Phase 1 only.
```

## Phase 1: Scaffold + design system

```
Do Phase 1 from @docs/PLAN.md: scaffold the latest Astro + TypeScript (strict) +
Tailwind v4 in this folder, install the fonts via Fontsource and Lucide icons,
create src/styles/tokens.css with the light and dark tokens from the plan, the
theme toggle (system default, saved in localStorage, no flash on reload), the
global Pause motion toggle, and the shared ui components (Button, Badge, Card,
SectionHeader, Annotation).

Build a /styleguide page showing every color, font, button, badge, card and
annotation in BOTH themes side by side. Use @design/inspiration/05-cartoony-isometric-light.png
for the light-mode feel and @design/inspiration/03-experience-pipeline-diagram.png
for dark mode. Run the build and astro check, then tell me how to view it.
```
*Spend time here. If the styleguide looks great, every section will too. Tweak colors and fonts now.*

## Phase 2: Data layer

```
Do Phase 2: create every YAML file in src/data/ using the shapes in
@docs/PLAN.md section 7, and zod schemas for each in src/content.config.ts.
Fill in what you know about me from the plan and use TODO for everything else;
don't invent anything. Make an empty list hide its section. Then show me what
error appears if I make a typo (e.g. misspell a field) so I know what to expect.
```
*Now fill in your real content in the YAML files yourself. That's the best way to learn the structure.*

## Phase 3: Layout, nav, footer

```
Do Phase 3: BaseLayout, the floating pill nav (from @design/inspiration/01-hero-ascii-portrait.png),
mobile menu, footer, and empty section shells for every section, in the order
from site.yaml. Nav links smooth-scroll to sections and hide when a section is empty.
```

## Phase 4: Hero

```
Do Phase 4: the Hero section as described in @docs/PLAN.md, matching the layout
of @design/inspiration/01-hero-ascii-portrait.png. Generate the ASCII portrait at
build time from src/assets/me.jpg using characters from code snippets, with a few
accent-colored glyphs that shimmer slowly. It must stop when Pause motion is on
or prefers-reduced-motion is set, and look good in both themes. If there's no
photo yet, use the isometric fallback from the plan.
```

## Phase 5: About + Experience

```
Do Phase 5: the About and Experience sections. Build PipelineDiagram and
TraceDiagram components driven only by the `diagram` field in experience.yaml
(see @design/inspiration/03-experience-pipeline-diagram.png and
@design/inspiration/04-experience-latency-trace.png). In light mode draw nodes as
small isometric blocks like @design/inspiration/05-cartoony-isometric-light.png;
in dark mode as glowing circles. Add the travelling "packet" dots animation.
```

## Phase 6: Projects + Skills

```
Do Phase 6: Projects (card grid, featured cards wider) and Skills (grouped
sticker-badge chips). Don't build the isometric stack yet; just make the chip
version great.
```

## Phase 7: Achievements, Certifications, Interests

```
Do Phase 7: Achievements as game-style "Achievement Unlocked" cards with rarity
colors, Certifications as compact cards, and Interests as a bento grid like
@design/inspiration/06-interests-bento.png with Instrument Serif headings, the
tilted image stack and a handwritten annotation with a doodle arrow. Everything
must be driven by the YAML files.
```

## Phase 8: Polish

```
Do Phase 8: go through every section at 375px, 768px and 1440px in both themes
and fix layout issues. Then do an accessibility pass (contrast, focus states,
alt text, keyboard nav), add SEO meta + an OG image, and get Lighthouse to 95+.
List everything you changed.
```

## Phase 9: Deploy

```
Help me deploy: create a .gitignore, walk me through creating a GitHub repo and
pushing, then connecting it to Vercel. Explain the step-by-step clicks I need
to do myself.
```

---

## Everyday prompts (after it's built)

- `Add a new job to experience.yaml: <paste details>. Keep the same style as the others.`
- `I got a new certification: <name, issuer, date, link>. Add it.`
- `Here's a screenshot [paste]. The spacing between cards feels cramped on mobile. Fix it.`
- `Explain how the theme toggle works, like I'm new to frontend.`
- `I want to try a different accent color. Show me 3 options on /styleguide first.`
- `Stretch goal: build the isometric skills stack from the plan.`

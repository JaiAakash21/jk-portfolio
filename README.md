# jaiaakash.xyz

Personal portfolio for **Jai Aakash S** — backend & full-stack engineer,
Computer Science at Rajalakshmi Engineering College, Chennai.

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · GSAP · Lenis

---

## Run it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build && npm run start
```

```bash
npm run lint
```

Dev runs on `http://localhost:3000`. There are no environment variables and no
runtime services — every route is statically generated at build time.

## Layout

```
src/
├── app/
│   ├── layout.tsx              Fonts, metadata, JSON-LD, shell
│   ├── page.tsx                Home — composes the six sections
│   ├── globals.css             Design system: tokens + cascade layers
│   ├── icon.tsx                Generated favicon
│   ├── opengraph-image.tsx     Generated social card
│   ├── sitemap.ts / robots.ts
│   ├── not-found.tsx
│   ├── work/page.tsx           Work index — every project in one grid
│   └── work/[slug]/            Case studies, one per project
├── components/
│   ├── SiteHeader / SiteFooter Scroll-aware nav, footer
│   ├── HeroField.tsx           Hand-written WebGL contour field
│   ├── Plate.tsx               Nine original SVG architecture schematics
│   ├── SmoothScroll.tsx        Lenis, wired into GSAP's ticker
│   ├── Reveal / SplitReveal    Scroll-triggered entrances
│   ├── Magnetic / ThemeToggle / ScrollProgress / InView
│   └── sections/               Hero, About, Work, Stack, Experience, Contact
└── lib/
    ├── site.ts                 Name, links, nav
    ├── projects.ts             Project data and case-study content
    ├── profile.ts              Skills, timeline, achievements
    └── motion.ts               GSAP registration, capability checks
```

### Editing content

All copy lives in `src/lib/`. Nothing is hardcoded in components.

- Add a project → append to `projects` in `src/lib/projects.ts`. A case study
  page, static params and an OG image are generated from it automatically. Pick
  a `plate` from the nine schematic kinds, or add a new one in `Plate.tsx`.
  Optional fields — `role`, `metrics`, `shots`, `docs` — render a stat band, a
  screenshot gallery and deep links into the project's own documentation.
- Change skills → `skillGroups` in `src/lib/profile.ts`. Grades are `core`
  (multiple shipped projects), `working` (at least one), `learning`.
- Replace the résumé → drop a new PDF at `public/JaiAakash_S_Resume.pdf`.

## Design system

Defined once in `src/app/globals.css`.

**Colour** — warm ink / bone / ember, with a sage used only inside diagrams.
Dark is the default; light is a full peer theme, not an afterthought. Every text
pairing clears WCAG AA on its own ground.

**Type** — Instrument Serif (display) · Geist Sans (text) · Geist Mono (indices,
labels, data). All self-hosted via `next/font`; no runtime font requests.

**Cascade layers** — element resets are in `@layer base`, component classes in
`@layer components`, Tailwind utilities last. This ordering matters: unlayered
rules beat every layered rule, so resets written outside a layer silently
override utilities.

**Theme** — a blocking inline script sets `data-theme` before first paint, so
there is no flash. The choice persists in `localStorage`.

## Motion

GSAP + ScrollTrigger for entrances, Lenis for inertial scrolling (sharing GSAP's
ticker so there is one RAF loop), SplitType for line reveals.

Three rules the implementation holds to:

1. **The resting state is the final state.** CSS never hides anything; GSAP sets
   the from-state at runtime. With JS disabled, hydration failed, or motion
   reduced, the page is complete and correctly laid out.
2. **Nothing animates layout.** Transforms and opacity only — measured CLS is 0.
3. **`prefers-reduced-motion` is honoured everywhere**, including Lenis, the
   WebGL layer, magnetic buttons and the CSS schematic animations.

### The hero field

A ~40-line fragment shader drawing animated iso-contours over a domain-warped
noise field — hand-written WebGL, one full-screen triangle, no Three.js (which
would cost roughly 150 kB gzipped to draw a quad).

It is decoration and behaves like it: never mounted under reduced motion, on
coarse pointers, or below four CPU cores; rendered at 0.55× resolution capped at
DPR 1.6; paused when off-screen or when the tab is hidden; falls back to a
static gradient if WebGL is unavailable. The hero reads identically without it.

## Project visuals

No product screenshots exist for most of these projects, and fake browser chrome
would misrepresent them. Each project is drawn instead as an **original SVG
schematic of its own architecture** — pure SVG, no images, CSS-only animation
that pauses off-screen. They are labelled as schematics on the page.

Where real screenshots do exist they are used as well, under their own heading
and never in place of the schematic. RelayForge's four images in
`public/work/relayforge/` were captured with Playwright against the running
stack; every figure in them is data that pipeline actually produced.

## Contact

There is deliberately **no contact form**. The site has no backend, and a form
that reports success without sending anything loses real messages. Contact is
the address at full size, one click to copy, one click to open a composed draft.

To add a real form later: create a route handler at `src/app/api/contact/route.ts`
backed by a mail provider, then replace the mailto block in
`src/components/sections/Contact.tsx`.

## Measured results

Lighthouse, desktop preset, against the production build:

| Route | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` | 98–99 | 100 | 100 | 100 |
| `/work/[slug]` | 100 | 100 | 100 | 100 |

Home: FCP 0.3s · LCP 0.7s · CLS 0 · TBT 70–100ms

Verified at 360 / 390 / 768 / 1024 / 1440 / 1920 with no horizontal overflow,
all internal routes returning 200, and no application console errors. Full
record in `docs/IMPLEMENTATION_PROGRESS.md`.

## Deploying

Built for Vercel; any Node host that can run `next start` works.
Node **>= 20.9** (`engines` in `package.json`, `.nvmrc` pins the major).

Every push runs `.github/workflows/ci.yml`: `npm ci`, lint, `tsc --noEmit`,
then `next build`. `npm ci` installs the committed lockfile exactly, so CI
cannot pass on a dependency tree the repository does not describe.

```bash
npx vercel --prod
```

1. Import the repository at [vercel.com/new](https://vercel.com/new). Framework
   preset Next.js, no build-setting changes needed.
2. Add `jaiaakash.xyz` under **Settings → Domains** and point the registrar's
   records at Vercel.
3. No environment variables are required.

`site.url` in `src/lib/site.ts` is the canonical origin used for metadata, the
sitemap and JSON-LD — change it if the domain changes.

### Generated at build time

No image files are committed apart from the résumé PDF. These are all rendered
by `next/og` and served as static PNGs:

| Route | Size | Purpose |
|---|---|---|
| `/icon` | 64×64 | Favicon |
| `/apple-icon` | 180×180 | iOS home screen |
| `/opengraph-image` | 1200×630 | Social card for the home page |
| `/work/[slug]/opengraph-image` | 1200×630 | Per-project social card |
| `/manifest.webmanifest` | — | Web app manifest |
| `/sitemap.xml`, `/robots.txt` | — | Crawling |

Licensed MIT — see `LICENSE`.

## Documentation

- [`docs/DESIGN_RESEARCH.md`](docs/DESIGN_RESEARCH.md) — measured research across
  three galleries and five live portfolios, and the reasoning behind the
  direction.
- [`docs/IMPLEMENTATION_PROGRESS.md`](docs/IMPLEMENTATION_PROGRESS.md) — phase
  status, every issue found and resolved, the full test record, and the list of
  information and assets still outstanding.

# Design research

Research carried out on **8 November 2026** for the rebuild of jaiaakash.xyz.

## Method, and what it is worth

Reference sites were loaded in headless Chromium at 1440×1000 and inspected
programmatically: computed styles on `body` and `h1`, `@font-face` families from
the live stylesheets, `meta[name=theme-color]`, request URLs (to identify
animation libraries), element counts, and `document.scrollHeight`.

That means the colour values, font names, type metrics and library findings
below are **measured from the live pages**, not recalled. Where a site could not
be loaded it is listed as inaccessible and nothing is claimed about it. No
reference was described from memory.

---

## 1. Primary reference — Scrolltide

`https://www.scrolltide.co/` · **HTTP 200**

| Measured | Value |
|---|---|
| `<title>` | Scrolltide — Cinematic website prompts & templates |
| Meta description | "A curated library of scroll-driven website templates and AI prompts. Copy a prompt, paste it into your AI, and launch a site that actually moves." |
| `body` background | `rgb(7, 8, 10)` |
| `body` colour | `rgb(243, 245, 248)` |
| `body` class | `min-h-screen overflow-x-clip bg-ink text-bone font-sans selection:bg-tide/25 selection:text-bone` |
| `@font-face` families | **Bricolage Grotesque**, **Inter**, **Space Mono** |
| `<video>` elements | 108 |
| `<canvas>` elements | 1 |
| Framework | Next.js + Turbopack chunks, served from Vercel |

Nav labels, verbatim: `Library · Components · Shaders · Sections · UI · MCP
(New) · eBook · Pricing · FAQ · Contact · Log in · Go Unlimited`.
H1: *"Ship websites that move like the tide."*

**What this actually is.** Scrolltide is a commercial library of scroll-driven
templates and AI prompts — not a portfolio. Its template names (Murk, Odaline,
Marea, Ephyra, Nightjar, Lacuna, ARÊTE, Ondine, SELENE, NAÏADE, UPDRAFT, Zephyr…)
are product SKUs. So it is a reference for *technique*, not for structure: a
portfolio that copied its homepage would be copying a storefront.

**Worth taking:**
- A **three-tier type system** — expressive display face, neutral text face, a
  mono for data. Measured here as Bricolage Grotesque / Inter / Space Mono.
- **Shaders treated as a first-class category**, not a gimmick bolted on.
- A very dark, slightly cool ground (`#07080A`) that lets one accent carry.

**Worth rejecting:**
- 108 autoplaying videos on one page. Defensible for a template storefront where
  the product *is* the motion; indefensible for a portfolio that should load fast
  on a recruiter's phone.
- Its token vocabulary (`ink` / `bone` / `tide`) is cool-toned. Reusing it would
  produce a site that looks like a Scrolltide template, which is the opposite of
  the brief.

---

## 2. Galleries

### minimal.gallery — HTTP 200
`theme-color` `#000000`; Inter loaded as a single variable woff2. Taxonomy is
split into **Types** and **Platforms** (Readymag, Framer, Webflow, WordPress,
JavaScript, Squarespace, Shopify, Super, Tailwind, Bootstrap), with category
counts visible — Agency 766, App 60, AI 60, Animation 22. Tagline: *"For the love
of beautiful & functional websites."*

Sites listed on the front page included Mathias Adolfsson, Melike Turgut, Carter
Ogunsola, Registered Commons, Kalok Yeung, Philipp Hafner, Enode, Thursday's
Child, Vasiliy Kiselev, pu—ente, Atomicdust, Tequs, Causal, Driessen
Architectuur, Ev Astapov, Eli Horn, Isaac Fayemi, Grafik, How&How.

*Observation:* the gallery that curates minimal work is itself almost styleless —
one typeface, black on white, no motion. The restraint is the editorial position.

### onepagelove.com — HTTP 200
| Measured | Value |
|---|---|
| Typefaces | **Geist** + **Geist Mono**, self-hosted woff2 |
| `body` colour | `rgb(45, 37, 31)` — a **warm** brown-black, not `#000` |
| H1 metrics | 44px / weight 500 / letter-spacing **−1.4px** / line-height 50px (1.14) |

Tight negative tracking on a medium-weight grotesque, and a warm rather than
neutral text colour. Categories are explicit enough to be useful: ★Portfolio,
★Experimental, ★Personal, ★Launching Soon.

### Could not be reached
| Site | Result |
|---|---|
| `awwwards.com` | HTTP 502 through the session proxy |
| `siteinspire.com` | HTTP 429 — rate limited |
| `lapa.ninja` | HTTP 403 — automated requests refused |
| `godly.website` | DNS / tunnel failure on both apex and `www` |

Nothing is claimed about these four. The research below leans on the galleries
that did load and on the individual portfolios reached through them.

---

## 3. Real portfolios and studio sites

All reached via outbound links on One Page Love's front page, then probed
directly.

| Site | Ground | Text | Typefaces | Motion stack | Scroll height |
|---|---|---|---|---|---|
| `petesena.com` | `rgb(10,10,10)` | `rgb(242,240,235)` | — | **GSAP + Lenis + OGL** | 10,208px |
| `yanndo.com` | `rgb(245,243,238)` | `rgb(46,46,54)` | Styrene B Web, Original Sans Web | **Three.js + Motion** | 1,000px (single screen) |
| `mandl.design` | `rgb(182,188,148)` | `rgb(69,38,14)` | **Basier Circle Mono only** | — | 16,671px |
| `petrillo.studio` | `rgb(255,0,0)` | `rgb(0,0,0)` | Clash Grotesk, Suisse Intl, Suisse Intl Mono, Space Grotesk | — | single screen |
| `tegra.nyc` | light | `rgb(0,0,0)` | — | GSAP + SplitText | 2,139px |

`madebyigor.com` failed with a tunnel error and was not inspected.

### What the measurements show

**Warm neutrals beat pure black and white.** Not one of the five uses `#000000`
on `#FFFFFF`. petesena.com pairs `#0A0A0A` with a warm off-white `#F2F0EB`;
yanndo.com uses a bone `#F5F3EE`; mandl.design goes as far as sage over dark
brown. The warmth is what separates these from a default dark-mode template.

**The real motion stack is GSAP + Lenis + a small WebGL library — not Three.js.**
petesena.com, the most motion-heavy of the set, ships **OGL**, a few kilobytes,
rather than Three.js. tegra.nyc uses GSAP with SplitText and nothing else. Only
yanndo.com loads Three.js, and it is a single-screen site with no long scroll to
pay for it.

**One typeface can carry a whole identity.** mandl.design sets everything —
headings included — in Basier Circle Mono, uppercase, tracked out ~+1.92px. It is
instantly recognisable without a logo.

**Short declarative headings.** yanndo.com's four section headings are "Meet.",
"Listen.", "Cut the noise.", "Make." Four words doing the work of four paragraphs.

**Length is a choice, not a default.** 1,000px and 16,671px are both defensible.
Decide the length, then fill it.

### Patterns to avoid
- Autoplaying video walls (Scrolltide's 108 elements).
- Pure-black grounds with a neon accent — the current default, and now generic.
- Bento grids, floating glass cards, glowing borders. None of the five use them.
- Motion with no referent: effects that do not describe the content they animate.
- Percentage skill bars. Nothing measured here displays a self-assessed number.

---

## 4. Direction taken: *Instrument*

The throughline in Jai Aakash's actual work is **systems that keep working under
bad conditions** — offline-first storage, server-authoritative game state,
incident triage, defect detection. The art direction is drawn from that, not
applied on top of it: the portfolio is laid out like a precision instrument, in
an editorial register.

### Colour — warm ink, bone, ember

Warmth is the deliberate break from Scrolltide's cool `#07080A`/`bg-ink` and the
proof the site is not one of its templates. It follows the measured consensus of
the real portfolios.

| Token | Dark | Light |
|---|---|---|
| Ground | `#0E0D0C` | `#F2EEE6` |
| Text | `#EDE8E0` | `#1A1815` |
| Muted | `#9A938A` | `#5F5A51` |
| Faint | `#8A847B` | `#655F54` |
| Accent (ember) | `#E8663C` | `#A8401B` |
| Signal (diagrams) | `#8FA89C` | `#5B7468` |

Every pairing was checked numerically and clears WCAG AA on its own ground — the
light accent is `#A8401B` rather than a brighter orange precisely because the
brighter value measured 3.68:1 on the sunken background.

A single warm accent, with one cool sage used *only* inside diagrams, gives the
schematics a second channel without introducing a second brand colour.

### Typography — three tiers

Following the Scrolltide finding, differently executed:

- **Instrument Serif** — display. A serif rather than another grotesque: it reads
  editorial next to engineering content, and the italic gives one emphasis tool.
- **Geist Sans** — all body and UI. The same choice One Page Love measured out at.
- **Geist Mono** — indices, labels, metadata, diagram annotation.

The mono is load-bearing, not decorative: every section index, every data
read-out and every diagram label is mono, which is what makes the page read as
instrumentation. This is the mandl.design lesson applied to one tier of three.

### Structure — the hairline grid

A six-column hairline rule, drawn behind sparse sections (hero, work, contact,
case-study headers) and deliberately **omitted** where content is dense — the
four-column skill grid, where two grids fight. The grid is punctuation, not
wallpaper. With index numerals and the mono read-out, it is the thing that should
be recognisable with the name removed.

### Motion — GSAP + Lenis + hand-written WebGL

Directly from the petesena.com measurement. The hero field is a ~40-line
fragment shader drawing animated **iso-contours** — a topographic read-out of a
noise field, matching the instrument concept. No Three.js: it would cost ~150 kB
gzipped to draw one quad.

The first version rendered soft filled bands and looked like a smudge, especially
on the light ground. Rewriting it to `fwidth`-derived contour lines turned it
from a blur into structure. The light theme runs it at half gain, because any
tint on bone reads as a stain.

It is opt-out by default: never mounted under `prefers-reduced-motion`, on coarse
pointers, or below four CPU cores; rendered at 0.55× resolution capped at DPR
1.6; paused when off-screen or the tab is hidden.

### Project visuals — schematics, not screenshots

No product screenshots exist for most of these projects, and browser-chrome
mockups would misrepresent them. Each project is instead drawn as **an original
SVG schematic of its own architecture** — an encrypted action queue replaying
after reconnect, a hotspot grid with a route planned around it, named rules
feeding a risk score and a reviewer queue, a ResNet feature scatter with a PR
curve. Pure SVG, no images, CSS-only animation that pauses off-screen.

They are labelled as schematics on the page. That is more honest than a
placeholder and more informative than a screenshot would have been.

---

## 5. Decisions log

| Decision | Why |
|---|---|
| Warm palette over cool | Measured consensus of five live portfolios; separates the site from Scrolltide's `ink`/`bone`/`tide` |
| Serif display | Nothing in the reference set pairs a serif display with mono data — it is the distinguishing move |
| Hand-written WebGL, no Three.js | petesena.com ships OGL for heavier motion; Three.js is ~150 kB to draw a quad |
| Iso-contours over noise bands | First version measured as a muddy blur in review; contours read as structure |
| Grid omitted on dense sections | Two grids at different column counts read as a broken grid |
| Three-grade skills, no percentages | Percentages are unverifiable; grades are defined by shipped-project count |
| No contact form | There is no backend. A form that reports success without sending loses real messages |
| `cacheComponents` disabled | Next 16 default; aimed at per-request data. Every route here is static, so it only forbade build-time values |

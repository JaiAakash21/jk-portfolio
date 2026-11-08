# Implementation progress

Status as of **8 November 2026**. Final verification run against the production
build (`next build` → `next start`), not the dev server.

## Phases

| Phase | Status | Notes |
|---|---|---|
| Repository audit | Done | `jk-portfolio` was empty — no commits on the remote. Greenfield build. |
| Content gathering | Done | CV, 24 public repos, and the previous jaiaakash.xyz HTML |
| Design research | Done | `docs/DESIGN_RESEARCH.md` — 3 galleries + 5 live portfolios measured |
| Creative direction | Done | "Instrument": warm ink/bone/ember, three-tier type, hairline grid |
| Design system | Done | Tokens in `src/app/globals.css`, cascade layers `base → components → utilities` |
| Sections | Done | Hero, About, Work, Stack, Experience, Contact, Footer |
| Case studies | Done | 8 routes at `/work/[slug]`, statically generated |
| Motion | Done | GSAP + ScrollTrigger + Lenis + SplitType; WebGL hero field |
| Responsiveness | Done | Verified 360 / 390 / 768 / 1024 / 1440 / 1920 |
| Accessibility | Done | Lighthouse 100; keyboard, focus, contrast, reduced motion all checked |
| Performance & SEO | Done | Lighthouse 98–99 / 100 / 100 / 100 (home); 100 across the board on case studies |
| Visual refinement | Done | Three passes, below |
| Docs | Done | This file, `DESIGN_RESEARCH.md`, `README.md` |

## Repository audit findings

- The target repo `JaiAakash21/jk-portfolio` had **no commits**. The brief
  described an existing Next.js 16 / React 19 / TypeScript / Tailwind codebase;
  no such code was present on the remote, so nothing could be preserved from it.
- The live site at jaiaakash.xyz is served from a separate repo
  (`JaiAakash21/Portfolio`, plain HTML + CSS). It was supplied as an HTML file
  and mined for **content only**, at the user's explicit instruction.
- Content recovered from it: Chennai location, the LeetCode profile URL, the
  FraudLens architecture chain, the "reliability" positioning, current-focus
  items, and the closing line.
- Two email addresses existed across sources. The CV and the brief both give
  `jaiaakashs21@gmail.com`; the old site had a different one. The CV/brief
  address was used.
- Two LinkedIn URLs existed. The one given in the brief
  (`linkedin.com/in/jaiaakash21/`), which matches the CV, was used.

## Issues found and resolved

| # | Issue | Resolution |
|---|---|---|
| 1 | `next build` failed: `dynamicParams` incompatible with `cacheComponents` | Disabled `cacheComponents` (and `partialPrefetching`, which requires it) — every route is static |
| 2 | `new Date()` in a client component rejected during prerender | Resolved by the same change |
| 3 | **Paragraph margins had no effect anywhere** — unlayered `p { margin: 0 }` beat Tailwind's layered `.mt-*` utilities | Moved element resets into `@layer base` and component classes into `@layer components` |
| 4 | Hero WebGL field rendered as a muddy blur, worst on the light ground | Rewrote the shader from filled fbm bands to `fwidth`-derived iso-contours; light theme runs at 0.5 gain |
| 5 | Hero had a dead vertical gap on phones | `justify-center` below `md`, `justify-between` above |
| 6 | Hero display type too small on phones | Floor raised from 3.25rem to 3.75rem |
| 7 | Availability string wrapped badly at 390px | Short variant below `sm` |
| 8 | Case-study `h1` used the hero scale — long titles would overflow | Dropped to `--text-h1` with a `16ch` measure |
| 9 | Hairline grid fought the 4-column skill grid | Grid removed from the Stack section |
| 10 | Empty space beside the Work section heading | Added a counts block (case studies / live demos / open source) |
| 11 | Contrast failures: `--fg-faint` 2.67:1 on the light sunken ground | Light faint → `#655F54`, dark faint → `#8A847B`, light accent → `#A8401B`; all ≥4.5:1, verified numerically |
| 12 | `label-content-name-mismatch` on the wordmark link | Removed the conflicting `aria-label`; visible text plus an `sr-only` suffix |
| 13 | Touch tap targets below 24px in the footer and mobile menu | Padding added to all small link lists |
| 14 | `.hover-line` touch fallback underlined display-size project titles | Fallback removed; affordance comes from context and ↗ / → glyphs |
| 15 | WebGL `<canvas>` was in the DOM even when the layer was skipped | Element no longer rendered at all when disabled |
| 16 | Schematic labels illegible at 390px (10px type at ~0.6 scale) | Plate typography scaled up ~20% |

## Tests performed

Production build, Chromium via Playwright.

- **Breakpoints** 360 / 390 / 768 / 1024 / 1440 / 1920 — no horizontal overflow
  at any width; one `<h1>` per page; every `<img>` has `alt`.
- **Links** — all 15 internal routes return 200, including the résumé PDF and
  all 8 case studies. External links enumerated and checked by hand.
- **Console** — no errors or warnings from the application. The only console
  output is a headless-Chromium GL driver performance notice.
- **Theme** — toggles, writes to `localStorage`, and is restored after reload.
- **Reduced motion** — WebGL canvas not mounted, Lenis not started, all content
  present and visible (9,786 characters of text).
- **Keyboard** — tab order: skip link → wordmark → nav → résumé → theme → CTA.
  Focus ring visible throughout.
- **Mobile** — 390×844 with touch emulation; panel opens, traps focus, locks
  scroll, closes on Escape.

## Lighthouse — measured, desktop preset, production build

| Route | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` | **98–99** | **100** | **100** | **100** |
| `/work/crimelens-ai` | **100** | **100** | **100** | **100** |

Home: FCP 0.3s · LCP 0.7s · **CLS 0** · TBT 70–100ms
Case study: LCP 0.6s · **CLS 0** · TBT 0ms

Performance on the home route measured 98 and 99 across runs; the variance is
the WebGL hero's first frames against a headless software renderer. Both figures
are recorded rather than only the better one.

## Known limitations

- Schematic diagrams are dense at 360–390px. They are supporting visuals and
  every claim they illustrate is also in the text, but a phone-specific
  simplified variant would be better.
- No real product screenshots — see the schematics rationale in the research doc.
- `awwwards.com`, `siteinspire.com`, `lapa.ninja` and `godly.website` refused
  automated requests, so they contributed nothing to the research.
- Lighthouse was run against `127.0.0.1`; figures on real hardware over a real
  network will differ.

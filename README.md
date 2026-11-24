# Jai Aakash S · Engineering portfolio

The Next.js portfolio for [www.jaiaakash.xyz](https://www.jaiaakash.xyz). The homepage features an interactive walkthrough of RelayForge’s recorded Kafka outage test. It also includes ten statically generated project case studies, internship experience, education and a downloadable résumé.

## Run locally

Use the Node version in `.nvmrc` and the committed npm lockfile.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Verify and deploy

```sh
npm run lint
npx tsc --noEmit
npm run build
npm start
```

The GitHub Actions workflow runs installation, lint, type checking and a production build for pushes and pull requests. Use the existing Vercel project with the Next.js preset and the repository root as its root directory. The site requires no environment variables, database or API keys. A standard Node host can serve the same production build with `npm start`.

## Update content

- `src/lib/projects.ts` contains the case studies, source links and featured project selection. New slugs automatically generate a detail page, a share image and a sitemap entry.
- `src/lib/profile.ts` contains skills, education, achievements and work history.
- `src/lib/site.ts` contains the canonical origin, contact links and navigation.
- `src/components/DeliveryTrace.tsx` contains the illustrative replay of the recorded recovery test. It runs entirely in the browser.
- `public/JaiAakash_S_Resume.pdf` is the résumé served by every download link.

Licensed under the [MIT License](LICENSE).

# Wellgenz — public marketing website

A premium minimalist recruitment SaaS website for **wellgenz.com**, built with Next.js App Router, TypeScript, Tailwind CSS, Lucide, and Motion. Ivory, charcoal, violet, and muted peach form the visual system. All recruitment application links lead to **https://app.wellgenz.com**.

## Local setup

Use Node.js 22 or newer and npm. Dependencies are pinned; `package-lock.json` is committed for reproducible installs.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. No website environment variables are required. `.env.example` documents this explicitly. There is no authentication, database, backend API, resume processing, or application-subdomain configuration in this project.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm run verify:routes
npm start
```

Lint is a separate command because Next.js 16 does not run ESLint during its production build. All routes are prerendered; only navigation, team tabs, matching illustration, and subtle section motion require browser-side JavaScript.

Browser verification:

```bash
npx playwright install chromium
npm run test:e2e
```

An existing browser can be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. The Playwright suite runs against the production server and checks mobile/desktop overflow, navigation, FAQ disclosure, keyboard-accessible team tabs, shortlist threshold changes, application links, legal pages, SEO endpoints, runtime errors, and automated accessibility checks. A successful production build is required before the suite. Automated accessibility checks complement manual keyboard and visual review; they do not establish complete accessibility conformance.

## Project structure

```text
src/app/                 App Router pages, CSS, metadata and SEO routes
src/components/          Reusable UI, navigation and product illustrations
src/lib/site.ts          Brand URLs, contact placeholder and FAQ copy
public/                  Reserved for future brand assets
tests/                  Production browser checks
.github/workflows/       Lint, TypeScript and build checks on develop
```

The product visuals are semantic HTML/CSS and lightweight Lucide icons. Fictional people, example company names, and illustrative scores are labeled. The matching threshold changes a browser-local demo only; it is not a recruitment engine.

## Branding and content

- Edit `src/lib/site.ts` for URLs, contact information, and FAQ text.
- Edit `src/app/page.tsx` for marketing copy and section composition.
- Edit the design tokens and responsive rules in `src/app/globals.css` for the palette/layout.
- The temporary typography wordmark is `Wordmark` in `src/components/ui.tsx`.
- Next.js serves the locally bundled Geist font; no Google Fonts request is needed.
- Privacy and terms are explicitly marked as **drafts**, with `noindex` and omission from the sitemap. Finalize them before public launch.
- `hello@wellgenz.com` is a clearly labeled **placeholder**, not a verified mailbox. Confirm or replace it in `src/lib/site.ts` and remove the footer placeholder note before launch.

## Deployment

### Vercel

Import the repository, use the Next.js preset, and select `develop` as the production branch while `main` intentionally remains initial setup. Install: `npm ci`; build: `npm run build`. No secrets or environment variables are required. Connect `wellgenz.com` and follow the DNS records supplied by your deployment provider. Decide your www redirect in the provider's domain settings. Do not point or configure `app.wellgenz.com` through this project.

### Node.js host

```bash
npm ci
npm run build
npm start
```

The production server defaults to port 3000. Put it behind an HTTPS reverse proxy and configure your host's process manager. Use the same Node.js major version in CI and production. This project has no deployed domain until the owner connects hosting and DNS.

The app URL and canonical marketing URL are fixed in `src/lib/site.ts`. If deploying under another permanent domain, update this configuration before building. Preview deployments inherit the production canonical URL intentionally.

## SEO, performance, and accessibility

- Server-rendered semantic sections, one page heading, skip link, focus-visible styles, labeled controls, and a keyboard-operable tab interface.
- Reduced-motion preference honored in CSS and Motion. Content is visible without entrance animations and the principal sections are readable without JavaScript.
- Canonical metadata, Open Graph PNG, Twitter summary card, SVG favicon, `/sitemap.xml`, and `/robots.txt`.
- No tracking libraries, stock photos, invented customer testimonials, or unsupported performance claims.
- Security response headers configured in `next.config.ts`.
- Real Core Web Vitals require measurements on the deployed domain; no field performance results are claimed here.

## Git workflow

Exactly two local initial branches:

- `main`: initial README and `.gitignore` only. This branch stays unchanged after initial setup.
- `develop`: complete application and documentation. Do not merge to `main` unless the owner explicitly changes the workflow.

The connected GitHub account is `hitten04`. Repository creation must occur before remote synchronization; the connector available for this task supports branch/file/Git-object writes but does not expose a repository-creation operation. The source archive includes the local Git history to preserve the two-branch setup for continuation. Never commit `.next`, `node_modules`, `.env` secrets, or browser reports.

## Before public launch

Confirm the contact mailbox, complete the legal drafts with the correct operator and effective date, connect hosting/DNS, and verify that the externally managed application destination is available. This repository does not configure that application.

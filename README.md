# Wellgenz — public marketing website

A premium minimalist recruitment SaaS website for **wellgenz.com**, built with Next.js App Router, TypeScript, Tailwind CSS, Lucide, and Motion. A colorful ivory, violet, peach, and periwinkle visual system pairs a CSS 3D hiring diagram with lightweight animation. The diagram includes a pause control and honors reduced-motion preferences. All recruitment application links lead to **https://app.wellgenz.com**.

## Local setup

Use Node.js 22 or newer and npm. Dependencies are pinned; `package-lock.json` is committed for reproducible installs.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Copy `.env.example` to `.env` to configure the optional contact-form Turnstile widget (see below). There is no authentication, database, backend API, resume processing, or application-subdomain configuration in this project.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm run verify:routes
npm start
```

Lint is a separate command because Next.js 16 does not run ESLint during its production build. All routes are prerendered; only navigation, team tabs, hiring email examples, the diagram pause control, matching illustration, and subtle section motion require browser-side JavaScript.

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

The product visuals are semantic HTML/CSS and lightweight Lucide icons. The hero uses CSS perspective, layered surfaces, SVG connectors, and controllable animation; no WebGL engine or external 3D asset is needed. Fictional people, example company names, and illustrative scores are labeled. The matching threshold changes a browser-local demo only; it is not a recruitment engine.

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

Import the repository, use the Next.js preset, and select `develop` as the production branch while `main` retains its existing content. Install: `npm ci`; build: `npm run build`. For Turnstile, set `PUBLIC_TURNSTILE_SITE_KEY` in the hosting build environment before building. No secret key is used by this static website. Connect `wellgenz.com` and follow the DNS records supplied by your deployment provider. Decide your www redirect in the provider's domain settings. Do not point or configure `app.wellgenz.com` through this project.

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

The remote repository has two branches:

- `main`: the existing website version uploaded by the owner. Its commit is preserved during this push.
- `develop`: complete application and documentation. Do not merge to `main` unless the owner explicitly changes the workflow.

The target repository is [hitten04/wellgenz](https://github.com/hitten04/wellgenz). The owner has created it and granted the GitHub app access. The completed redesign is published on `develop`; `main` remains the default branch. The repository contains the complete website source. Never commit `.next`, `node_modules`, `.env` secrets, or browser reports.

## Before public launch

Confirm the contact mailbox, complete the legal drafts with the correct operator and effective date, connect hosting/DNS, and verify that the externally managed application destination is available. This repository does not configure that application.

## Connected hiring capabilities

The marketing journey covers career portal and email resume intake, AI resume parsing, job-specific matching rules, automatic shortlisting, Kanban ATS stages, Google Meet and Zoom interview scheduling, shortlist emails, interview communication, offer letter email automation, rejection emails, and one-click career page updates. These describe the separate recruitment product; the marketing website does not book meetings, send hiring messages, or receive resumes.

The communication section has accessible tabs with illustrative email examples. Provider names identify supported meeting platforms and do not imply partnership or certification. Product claims follow the capabilities supplied by the owner and the attached admin screenshots.

Browser screenshots are generated locally in `docs/previews/` and are excluded from source control. The previously shared source archive also contains desktop and mobile previews. Run browser checks against a production build. In a constrained environment with single-process Chromium, use `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` and `PLAYWRIGHT_SINGLE_PROCESS=1`; the suite creates a fresh browser per test in that mode. `WELLGENZ_CAPTURE_PREVIEWS=1` saves full-page screenshots at 390px and 1440px.

### Color and motion design

The homepage hero places a centered introduction above a transparent panoramic editorial sketch. The artwork is primarily graphite with sparse violet details. It enters softly and floats gently while in view, using the existing reveal system and a lightweight CSS loop. Reduced-motion preferences disable the loop; there is no pointer tracking or hover tilt. The highlighted headline uses Royal Violet. Responsive sizing preserves the complete illustration. Asset provenance is recorded in `docs/home-panorama-hero.md`.

The resume illustration contains three persistent fictional candidate cards. Each advances every two seconds through a six-second CSS 3D loop; hover, clicks, and cursor exit leave the animation timeline running without restarting it. Reduced-motion users see a stationary layered deck.

### Detailed product pages

`/features` introduces eight statically generated pages: job management, branded career pages, applicant tracking, resume parsing, candidate scoring, candidate notes, role-based access, and hiring analytics. Each page includes detailed capabilities, a workflow, an illustrative scenario, FAQs, related features, and an application CTA. The Features header link opens the feature directory. How It Works, Why Wellgenz, and FAQs each have a dedicated page with desktop and mobile header links.

Edit copy in `src/lib/product-pages.ts` and header links in `src/lib/site.ts`. Page-specific palettes live in `src/app/features/features.css`. Motion for React (`motion/react`) powers section entrances, staggered cards, hover feedback, and reading progress; reduced-motion preferences disable these effects. All content remains rendered and readable before JavaScript loads. Landing-page sections and their animations are unchanged.


### Contact form: Cloudflare Turnstile

1. Copy `.env.example` to `.env` and fill in `PUBLIC_TURNSTILE_SITE_KEY=` locally, or set that exact variable in your hosting provider’s build environment. `.env` is gitignored; never commit your actual configuration.
2. Create a Managed Turnstile widget in Cloudflare and allow your deployed hostnames (for example `wellgenz.com` and any preview hostname you use). Allow `localhost` only for local testing as appropriate.
3. Restart the development server after editing `.env`. Rebuild and redeploy for production: the contact page reads the variable on the server at build time and passes only the public site key to its widget. No Next.js environment-variable prefix is needed for this approach.
4. With a configured key, the draft button waits for a completed challenge. Expiry, timeouts and errors clear that completion. With an empty key, no Turnstile script loads and the original email-draft form remains available.

The site key is a **public widget identifier** and necessarily appears in the rendered page. It is not hardcoded in source. Never put a Cloudflare **secret key** into this variable, client components, or `next.config` public environment settings.

**Scope:** this form opens a `mailto:` draft; it does not send mail or submit to a backend. Turnstile currently gates that browser action only, and is not server-enforced spam protection. If you introduce direct submissions, validate each token with Cloudflare’s Siteverify API **in the submission handler before sending/storing anything**, using a server-only secret. Tokens are single-use and expire after five minutes. Do not treat the browser callback as proof of identity or a secure backend verification.

Official setup: https://developers.cloudflare.com/turnstile/get-started/ and https://developers.cloudflare.com/turnstile/get-started/server-side-validation/.

### Content and SEO checks

Page titles, descriptions, canonical URLs, and social metadata are maintained in `src/lib/page-seo.ts`. Feature details remain in `src/lib/product-pages.ts`; distinct overview summaries, section headings, and closing messages live in `src/lib/feature-editorial.ts`. Homepage FAQ introductions use `homeFaqs`, while the FAQ page uses the more detailed `faqs` entries in `src/lib/site.ts`.

After `npm run build`, run `npm run verify:seo`. It checks exported marketing pages for unique titles, descriptions and H1s, correct canonical and social metadata, sitemap coverage, and repeated paragraphs longer than 70 characters across routes. Shared navigation, action labels, feature names, and short related-feature references can repeat where they aid navigation.

# Wellgenz content and SEO review

## Scope

Reviewed 19 rendered page routes: 15 marketing pages, two legal pages, and two error pages. Updated marketing copy and metadata while keeping existing sections, component order, images, styling, routes, links, and interactions.

## Changes

- Made homepage and section headings describe recruitment, applicant tracking, matching, interviews, and career pages naturally.
- Separated feature-overview summaries from the eight detailed feature introductions.
- Gave each feature page distinct workflow headings, FAQ headings, related-feature headings, and closing messages.
- Replaced duplicated homepage FAQ answers with concise introductions; retained the FAQ page’s detailed answers.
- Differentiated the How It Works workflow, Why Wellgenz benefits, and About Us purpose.
- Clarified that the contact form prepares an email draft, preserving its behavior and unconfirmed-contact label.
- Added route-specific titles, descriptions, Open Graph and Twitter metadata with a single brand suffix.
- Included the existing About Us and Contact Us routes in the sitemap.
- Kept legal and error page body copy and existing noindex behavior; fixed metadata title suffixes on legal and server-error pages.

## Verified results

- `npm run lint`, `npm run typecheck`, and production build passed.
- `npm run verify:seo` passed for all 15 indexable marketing routes: unique titles, descriptions, and H1s; self-referencing canonicals; matching social metadata; full sitemap coverage.
- Exact rendered main-element structures and structural attributes matched the baseline on all 19 routes, including images, links, section order, IDs, classes, dimensions, and animation attributes.
- SHA-256 hashes matched for all 52 existing image assets and 12 stylesheets.
- Repeated substantive text blocks longer than 70 characters across rendered routes: 11 exact duplicate groups before, zero after.
- Navigation labels, feature names, short related-feature teasers, and action labels retain useful consistency. These are not duplicate long-form copy.

Browser visual QA was unavailable in this environment. The DOM comparison and unchanged styling/image hashes verify the structural limits of this content-only change; text wrapping still depends on viewport and font rendering. Search rankings and indexing were not measured. The owner-private preview retains its audience, and canonical URLs target `https://wellgenz.com`.

## Page intent

| Page | Primary purpose |
| --- | --- |
| Home | AI recruitment software and applicant tracking overview |
| Features | Compare the eight hiring capabilities |
| Job management | Creating, editing, and publishing job posts |
| Career pages | Company branding, public careers link, and current vacancies |
| Applicant tracking | Candidate stages and the recruitment pipeline |
| Resume parsing | Structured resume details for reviewer assessment |
| Candidate scoring | Matching weights, job criteria, and shortlist thresholds |
| Candidate notes | Review observations and interview handoffs |
| Role-based access | Viewing and editing permissions for hiring participants |
| Hiring analytics | Dashboard counts, funnel visibility, and team check-ins |
| How It Works | Six-step implementation of a hiring workflow |
| Why Wellgenz | Product benefits and team-specific reasons to choose |
| About Us | Product purpose, beliefs, and design priorities |
| Contact Us | Product questions, walkthrough inquiries, and email drafts |
| FAQs | Practical product guidance organized by topic |

## Ongoing maintenance

Run `npm run build` then `npm run verify:seo` after future content changes. Titles and descriptions are in `src/lib/page-seo.ts`; feature-specific editorial copy is in `src/lib/feature-editorial.ts`.

Reference guidance: [Google title links](https://developers.google.com/search/docs/appearance/title-link) and [Google search snippets](https://developers.google.com/search/docs/appearance/snippet).

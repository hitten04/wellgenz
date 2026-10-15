# Closing CTA artwork

Generated with the built-in image-generation tool for the Wellgenz marketing site. These illustrations are fictional editorial scenes, not photographs of customers or the Wellgenz team. The homepage artwork is unchanged.

## Shared visual brief

Premium fine plum-black pen-and-ink editorial sketch with clean pencil hatching, mostly monochrome and subtle lavender accents; warm ivory background `#f7f6f2`; natural faces, hands, and contemporary professional clothing. Landscape 3:2 with generous margins, clear at 400px wide. No text, logos, statistics, stars, sparkles, or green. Not a photograph, cartoon, or 3D render.

## Page-specific subjects and final assets

### how-it-works

Asset: `public/images/cta-how-it-works-sketch.webp` (900 × 600 WebP).

Subject prompt: A warm professional handshake between a female candidate and male recruiter across a small desk, one neat folder on the desk, a small plant at the side. The moment of a thoughtful next chapter.

### why-wellgenz

Asset: `public/images/cta-why-wellgenz-sketch.webp` (900 × 600 WebP).

Subject prompt: A thoughtful recruiter in the foreground smiling gently while two diverse colleagues beside her discuss a single candidate paper profile together. A human-centred conversation, waist-up, simple composition.

### about-us

Asset: `public/images/cta-about-us-sketch.webp` (900 × 600 WebP).

Subject prompt: Two product makers in a quiet studio sharing an open notebook of simple abstract pencil marks, one seated and one leaning casually beside the table, a single coffee cup. A thoughtful collaborative moment.

### contact-us

Asset: `public/images/cta-contact-us-sketch.webp` (900 × 600 WebP).

Subject prompt: A friendly woman wearing a light headset at a small desk, writing a personal note while talking, a closed laptop and one small speech-bubble outline floating beside her. Welcoming, candid and uncluttered.

### features

Asset: `public/images/cta-features-sketch.webp` (900 × 600 WebP).

Subject prompt: An elegant recruiter standing beside a clean desk, organizing three paper folders into one tidy tray, comfortable confident posture. A metaphor for a connected hiring workspace. Only a few objects.

### faqs

Asset: `public/images/cta-faqs-sketch.webp` (900 × 600 WebP).

Subject prompt: Two young professionals having a friendly conversation over an open book, one pointing gently to a page while the other listens. Simple waist-up editorial scene with an air of clarity and curiosity.

### job-management

Asset: `public/images/cta-job-management-sketch.webp` (900 × 600 WebP).

Subject prompt: A female recruiter at a simple drafting desk writing a role brief on a large clipboard, one small stack of paper beside her. Clear intentional focus and an elegant open composition.

### career-pages

Asset: `public/images/cta-career-pages-sketch.webp` (900 × 600 WebP).

Subject prompt: A young candidate pausing at an open doorway beside a small tasteful noticeboard with two blank paper openings, looking hopeful. Human figure, doorway, noticeboard only.

### applicant-tracking

Asset: `public/images/cta-applicant-tracking-sketch.webp` (900 × 600 WebP).

Subject prompt: An HR professional arranging three candidate portrait cards in a neat sequence across a small tabletop, three-quarter view. A few cards, one person, no board full of UI.

### resume-parsing

Asset: `public/images/cta-resume-parsing-sketch.webp` (900 × 600 WebP).

Subject prompt: A recruiter holding a candidate resume sheet and carefully referring to an organized notebook at a small desk. A subtle single paper profile nearby, human detail, simple objects.

### candidate-scoring

Asset: `public/images/cta-candidate-scoring-sketch.webp` (900 × 600 WebP).

Subject prompt: A thoughtful hiring manager considering two paper candidate profiles side by side, one hand on chin, seated at a small desk. Evidence and human judgment, no scores or numbers.

### candidate-notes

Asset: `public/images/cta-candidate-notes-sketch.webp` (900 × 600 WebP).

Subject prompt: Two interviewers in a comfortable conversation, one listening attentively and the other writing observations in a small notebook, one desk corner. Understated human warmth.

### role-based-access

Asset: `public/images/cta-role-based-access-sketch.webp` (900 × 600 WebP).

Subject prompt: Two professional teammates exchanging a small elegant key over a closed folder, a symbolic editorial scene about considered access. Waist-up figures, minimal objects, friendly and natural.

### hiring-analytics

Asset: `public/images/cta-hiring-analytics-sketch.webp` (900 × 600 WebP).

Subject prompt: An HR manager thoughtfully reviewing one large sheet with three simple unlabelled bars and a small funnel outline while seated at a clean desk. No numbers, no exact data, illustrative shapes only.

## Candidate-scoring correction

The candidate-scoring illustration was edited to give the manager exactly two hands: one under his chin and one resting on the desk. The two profile sheets rest on folders on the desk instead of being held. The face, clothing, ink style, ivory background and lavender accents remain consistent.

## Implementation

`src/components/closing-cta.tsx` renders the shared responsive closing panel. `src/lib/closing-art.ts` maps page-specific captions and alt text. Images load lazily and preserve their 3:2 composition with `object-fit: contain`. The existing shared reveal controller provides motion and reduced-motion fallbacks.

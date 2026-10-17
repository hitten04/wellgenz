# FAQ page redesign

The FAQ page now uses a panoramic editorial hero, topic navigation, keyword search, and native accessible question disclosures. The original thirteen questions and answers and shared closing CTA are retained. Other pages are unchanged.

## Artwork provenance

- Asset: `public/images/faq-conversations-panorama.webp`
- Created with the built-in OpenAI image-generation tool for this page.
- Prompt: a transparent 3:1 editorial ink-and-wash illustration of four diverse hiring colleagues sharing a long desk, reading a reference book, discussing a laptop, and taking notes. Fine deep-plum pen lines, sparse lavender and peach washes, clear faces, complete figures, generous negative space; no text, logos, green, UI panels, or floating icons.
- Original: 2172 × 724 PNG; exported to WebP with alpha preserved.

## Verification

Run `npm run lint`, `npm run typecheck`, `npm run build`, `npm run verify:seo`, and `node --test tests/faq-explorer.unit.mjs`. Unit tests exercise topic filters, case-insensitive search, combined filters, reset behavior, and source-data integrity.

Responsive styles stack the topic navigation on smaller screens, preserve the full image aspect ratio, and maintain readable answers. Reduced-motion preferences disable answer entrance effects. Browser-based visual verification was unavailable in this environment.

# Panoramic homepage hero

The homepage retains its centered introduction above a full-width illustration. The current illustration is primarily graphite with sparse violet details. The highlighted headline is Royal Violet (#6F42C2). The image is static; pointer handlers, springs, tilt transforms, and client-side motion imports have been removed from HomeHeroArt. Obsolete pointer-tracking unit tests were removed with that behavior.

## Artwork provenance

- Current asset: `public/images/home-hiring-ink-panorama.webp`
- Created with the built-in OpenAI image-generation tool.
- Prompt: an original 3:1 transparent editorial panorama of four hiring colleagues connected by a flowing ribbon of white paper that becomes a shared table. A woman reviews a resume, a colleague points at a laptop, and two teammates discuss a portfolio. Fine charcoal and graphite crosshatching, white clothing, grayscale faces, extremely sparse violet notebook/edge accents. Airy continuous composition; no handshake, labels, text, panels, green, colored suits, painted skin, or room background.
- Exported from the generated PNG to WebP with alpha and original aspect ratio preserved.

## Checks

Lint, TypeScript, production build, and exported SEO checks. Static-source inspection verifies the absence of pointer/motion handlers. Exported-page comparison verifies unchanged homepage copy and all other pages. Responsive image sizing preserves the full panorama. Browser visual testing was unavailable in this environment.

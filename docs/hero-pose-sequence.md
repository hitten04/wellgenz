# Homepage gesture animation

Current revision: see **Furniture-locked revision** below; earlier details describe the preceding iteration.

Generated with the built-in image-generation tool, using the original transparent artwork as the edit target. Six new poses add a raised open hand, nodding, a listening reaction, a raised paper, and a blink. The original grayscale and muted lavender palette was requested explicitly. No CSS color filters or added shadows are used.

## Files

Original: `public/images/home-hiring-ink-panorama.webp`.

Animation: `public/images/hero-motion/pose-0.webp` through `pose-6.webp`. Pose 0 is the original. The new poses use lossless WebP conversion, verified to preserve their generated source's visible RGB and alpha exactly. Generated artwork may still differ slightly from the original drawing.

Motion data: `public/images/hero-motion/flow-0.bin` through `flow-7.bin`. Manifest: `public/images/hero-motion/manifest.json`.

## Playback

The six-second loop follows poses 0, 1, 2, 3, 4, 1, 5, 6. Bidirectional motion fields guide interpolation on a transparent WebGL canvas. Pixels with incompatible surfaces select a single pose instead of creating a double arm. Some pose changes can remain visible; this is not a guarantee of perfect natural video motion.

All frames and motion data load before the canvas replaces the original image. The canvas preserves the original aspect ratio. Automatic playback, hidden-tab pause, offscreen pause, reduced-motion fallback, unsupported-GPU fallback, and image-load fallback are supported.

## Generation prompt

Use case: precise-object-edit. Input is the EDIT TARGET, not a loose style reference. Create ONE transparent panoramic animation keyframe of this EXACT recruitment artwork. Preserve exact horizontal framing, same four people in same positions and same scale, same faces, chairs, laptop, ribbon table contours and background alpha. Preserve ORIGINAL COLORS EXACTLY: neutral grayscale graphite, pure white shirts/paper, ONLY the existing muted lavender folder and very fine lavender ribbon edge. No warm tint, sepia, blue/green cast, skin coloring, contrast restyle or saturation change. No new scene or objects. Original composition is 2048x682, roughly 3:1. Do not crop, zoom or move camera. All ribbon ends and people must remain fully visible as source. Clean real transparent background, no dark or white matte, shadows, halo or border. Need clearly visible NATURAL GESTURE rather than barely moving fingers, but only change the specified parts. Keep everything else anchored and unchanged. 

### Generated pose 1

The central standing man has lifted his RIGHT forearm (the arm on viewer's left) about 15 degrees from its original downward pointing pose, wrist slightly above the laptop, palm beginning to open upward. His left arm remains planted. He turns his face a few degrees toward the woman with purple folder. Other people exactly unchanged.

### Generated pose 2

The central standing man raises his RIGHT forearm (viewer left arm) to a clearly visible conversational open-palm gesture at his waist/lower chest, elbow bent, fingers relaxed anatomically correct, palm facing up toward the woman with purple folder. His LEFT hand remains on the table. The folder woman's chin lowers slightly beginning a nod. Other people unchanged.

### Generated pose 3

The central standing man maintains the raised open-palm explaining gesture. The woman with the purple folder clearly nods down with a small natural smile, eyes toward laptop, retaining BOTH arms holding the same folder. The right seated man turns his face slightly toward the speaker. Other people unchanged.

### Generated pose 4

The central standing man lowers his open right hand halfway toward the laptop. The woman with purple folder raises her chin back to original upright posture with a small smile. The right seated man lifts the fingers of his chin-supporting hand a little in a visible listening reaction while elbow stays on the table. Other people unchanged.

### Generated pose 5

The central standing man returns his right hand almost to the original pointing position at the laptop. The seated woman on the left lifts the upper edge of the paper she is holding by about 20 pixels and turns her face slightly toward the standing man, as if asking a question. Preserve paper size and unprinted white surface. Other people unchanged.

### Generated pose 6

Return very close to original starting posture for a seamless loop: the left seated woman settles her paper almost back to original position but is blinking naturally with eyelids closed; central man's right index finger points toward laptop as originally, slight gentle smile; woman with folder and right seated man essentially original pose. All other elements unchanged.

## Validation

- All seven WebP assets decode and retain transparency.
- Lossless conversion checks compare visible source pixels exactly.
- Eight motion data files have the expected dimensions and byte count.
- Vertex and fragment shaders compile and link under a standalone EGL OpenGL ES context.
- Intermediate motion frames were rendered for visual inspection; an initial double-arm artifact led to the occlusion handling above.
- TypeScript and production build checked separately.
- Browser visual QA was unavailable; final browser playback is unverified.


## Furniture-locked revision

Three further poses were generated with the built-in image-generation tool and saved as `public/images/hero-motion-v2/pose-7.webp`, `pose-8.webp`, and `pose-9.webp`. The original and previous poses are retained as `pose-0.webp` through `pose-6.webp` in that same directory. New conversions preserve visible source RGBA exactly.

The current nine-second loop follows 0, 1, 7, 2, 3, 4, 8, 1, 9, 6. Only the four head regions and the speaking arm above the table can change. The rest samples the original texture directly; protected folder and laptop regions are explicitly excluded. This prevents generated furniture differences from entering the final animation.

Hair uses localized periodic displacement, strongest at the long outer tips and tapered at roots. Faces are excluded from the long-hair displacement. Each wave completes whole cycles within the nine-second loop. No color grading or tint is applied.

Standalone EGL rendering compiled and linked the actual shaders. Intermediate frames at 0, 2.3, 5.8 and 7.7 seconds were rendered. Protected furniture/folder/laptop regions compared byte-for-byte equal across those times. Final browser playback is unverified. This remains a stylized illustration animation, not a guarantee of perfectly realistic human motion.

### New shared prompt

Use case: precise-object-edit. EDIT the supplied original transparent recruitment panorama. Create one image only, same 3:1 framing, same positions and scale, preserve identities and anatomy. Keep exact original neutral graphite grayscale and the same muted lavender folder and thin ribbon accents; absolutely no recoloring, tint, sepia, saturation or lighting change. Chair, white flowing ribbon table and laptop must be IDENTICAL to the original without movement, reshaping or new detail. Transparent alpha background, no matte, no border. Change ONLY the described people/hairstyle motion in a realistic restrained keyframe. Keep their hairstyles and strand texture, only natural small follow-through at tips, no wind blast. No text or new objects. 

### New pose 7

Standing central man turns his head slightly toward the woman holding the folder, shoulders stay in place. His right arm is halfway lifted in an open-palm explanation near his waist, a natural clear gesture. His swept wavy hair retains the original shape but a few outer tips shift 2–3 pixels with his head turn. All other people unchanged.

### New pose 8

The woman holding the lavender folder tilts her head gently toward the central speaker, smiling with lips closed. Her long wavy hair responds naturally: outer locks at her right shoulder drift outward only about 5 pixels, with continuous believable strands and unchanged hair length/volume. Both arms and folder stay anchored. The central man's open right palm is at his waist. Others unchanged.

### New pose 9

Seated man on the right inclines his head slightly toward the center, keeps elbow anchored, maintains hand near chin in an attentive listening pose. His short wavy hair follows the head turn naturally without changing hairstyle. Left seated woman lifts her gaze toward the central man, keeps paper and arms stable, her bun fixed with only one or two loose strands shifted subtly. Central man points near the laptop as original; folder woman original.




## Playback control update

Removed the visible play/pause button and its manual pause state. Animation starts automatically when visible and still respects reduced-motion preferences and hidden-tab/offscreen pausing.

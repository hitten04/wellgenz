import type { HeroMotionRenderer } from "./hero-motion-renderer";

const sequence = [0, 1, 7, 2, 3, 4, 8, 1, 9, 6];
const duration = 900;
const smooth = (a: number, b: number, value: number) => {
  const t = Math.max(0, Math.min(1, (value - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const ellipse = (x: number, y: number, cx: number, cy: number, rx: number, ry: number) =>
  1 - smooth(.86, 1, Math.hypot((x - cx) / rx, (y - cy) / ry));

// Same protected furniture/people regions as the desktop shader.
function maskAt(x: number, y: number) {
  const heads = Math.max(
    ellipse(x, y, .220, .320, .070, .180),
    ellipse(x, y, .445, .160, .055, .170),
    ellipse(x, y, .777, .340, .060, .160),
    x >= .565 && x <= .650 && y >= .380 ? 0 : ellipse(x, y, .620, .280, .075, .220),
  );
  const limit = .555 + (x - .350) * .50;
  const arm = smooth(.350, .360, x) * (1 - smooth(.480, .490, x)) *
    smooth(.260, .280, y) * (1 - smooth(limit - .018, limit, y));
  return x >= .460 && y >= .530 ? 0 : Math.max(heads, arm);
}

/** Mobile/unsupported-GPU path: small images, Canvas 2D, no texture or shader requirements. */
export async function createHeroFrameRenderer(canvas: HTMLCanvasElement): Promise<HeroMotionRenderer> {
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) throw new Error("Canvas unavailable");
  const loaded = await Promise.allSettled(Array.from({ length: 10 }, async (_, index) => {
    const image = new window.Image();
    image.src = `/images/hero-motion-mobile/pose-${index}.webp`;
    await image.decode();
    return { index, image };
  }));
  const poses = new Map<number, HTMLImageElement>();
  loaded.forEach((result) => { if (result.status === "fulfilled") poses.set(result.value.index, result.value.image); });
  const original = poses.get(0);
  const available = sequence.filter((index) => poses.has(index));
  if (!original || new Set(available).size < 2) throw new Error("Animation images unavailable");

  const mask = document.createElement("canvas");
  const layer = document.createElement("canvas");
  const maskContext = mask.getContext("2d");
  const layerContext = layer.getContext("2d");
  if (!maskContext || !layerContext) throw new Error("Canvas layers unavailable");
  let running = false;
  let disposed = false;
  let request = 0;
  let elapsed = 0;
  let lastTime: number | null = null;
  let previous = -1;

  function resize() {
    const width = Math.max(1, Math.min(1024, Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 1.5))));
    const height = Math.max(1, Math.round(width * 341 / 1024));
    if (canvas.width === width && canvas.height === height) return false;
    canvas.width = mask.width = layer.width = width;
    canvas.height = mask.height = layer.height = height;
    const pixels = maskContext!.createImageData(width, height);
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      const offset = (y * width + x) * 4;
      pixels.data[offset] = pixels.data[offset + 1] = pixels.data[offset + 2] = 255;
      pixels.data[offset + 3] = Math.round(maskAt((x + .5) / width, (y + .5) / height) * 255);
    }
    maskContext!.putImageData(pixels, 0, 0);
    return true;
  }

  function draw() {
    if (disposed) return;
    const resized = resize();
    const index = available[Math.floor(elapsed / duration) % available.length];
    if (!resized && index === previous) return;
    previous = index;
    const { width, height } = canvas;
    context!.clearRect(0, 0, width, height);
    context!.globalCompositeOperation = "source-over";
    context!.drawImage(original!, 0, 0, width, height);
    // Remove only moving regions, then replace them with the selected pose.
    // The chair, ribbon table, laptop and folder remain from the original.
    context!.globalCompositeOperation = "destination-out";
    context!.drawImage(mask, 0, 0);
    context!.globalCompositeOperation = "source-over";
    layerContext!.clearRect(0, 0, width, height);
    layerContext!.globalCompositeOperation = "source-over";
    layerContext!.drawImage(poses.get(index)!, 0, 0, width, height);
    layerContext!.globalCompositeOperation = "destination-in";
    layerContext!.drawImage(mask, 0, 0);
    layerContext!.globalCompositeOperation = "source-over";
    context!.drawImage(layer, 0, 0);
  }

  function tick(time: number) {
    if (!running || disposed) return;
    if (lastTime !== null) elapsed = (elapsed + Math.min(time - lastTime, 100)) % (available.length * duration);
    lastTime = time;
    draw();
    request = requestAnimationFrame(tick);
  }
  draw();
  return {
    start() { if (running || disposed) return; running = true; lastTime = null; request = requestAnimationFrame(tick); },
    stop() { running = false; lastTime = null; cancelAnimationFrame(request); },
    dispose() { disposed = true; running = false; cancelAnimationFrame(request); poses.clear(); mask.width = layer.width = 0; },
  };
}

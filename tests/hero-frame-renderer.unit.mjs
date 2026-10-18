import test from "node:test";
import assert from "node:assert/strict";
import { createHeroFrameRenderer } from "../src/lib/hero-frame-renderer.ts";

function environment(failed = new Set()) {
  let id = 0;
  const callbacks = new Map();
  class Context {
    selected = null;
    frames = [];
    clearRect() {}
    createImageData(w, h) { return { data: new Uint8ClampedArray(w * h * 4) }; }
    putImageData() {}
    drawImage(image) {
      const src = image.src || image.context?.selected;
      if (src) { this.selected = src; this.frames.push(src); }
    }
  }
  class Canvas {
    width = 300;
    height = 150;
    clientWidth = 375;
    context = new Context();
    getContext(type) { assert.equal(type, "2d", "mobile path must not request WebGL"); return this.context; }
  }
  globalThis.window = { devicePixelRatio: 3, Image: class {
    src = "";
    async decode() { if (failed.has(Number(this.src.match(/pose-(\d+)/)[1]))) throw new Error("asset failed"); }
  } };
  globalThis.document = { createElement: () => new Canvas() };
  globalThis.requestAnimationFrame = (fn) => { callbacks.set(++id, fn); return id; };
  globalThis.cancelAnimationFrame = (key) => callbacks.delete(key);
  return {
    canvas: new Canvas(), callbacks,
    tick(time) { const batch = [...callbacks.values()]; callbacks.clear(); batch.forEach((fn) => fn(time)); },
  };
}

test("mobile 2D animation changes poses without WebGL and supports pause/resume", async () => {
  const env = environment();
  const engine = await createHeroFrameRenderer(env.canvas);
  engine.start();
  for (let time = 0; time <= 2100; time += 50) env.tick(time);
  const frames = new Set(env.canvas.context.frames);
  assert.ok(frames.size >= 3, "should paint multiple distinct poses");
  assert.ok(env.canvas.width <= 1024, "drawing buffer stays within mobile limit");
  engine.stop();
  const paints = env.canvas.context.frames.length;
  env.tick(3000);
  assert.equal(env.canvas.context.frames.length, paints);
  engine.start();
  for (let time = 3100; time <= 4200; time += 50) env.tick(time);
  assert.ok(env.canvas.context.frames.length > paints);
  engine.dispose();
  assert.equal(env.callbacks.size, 0);
});

test("a failed pose is skipped instead of freezing the mobile animation", async () => {
  const env = environment(new Set([7]));
  const engine = await createHeroFrameRenderer(env.canvas);
  engine.start();
  for (let time = 0; time <= 3500; time += 50) env.tick(time);
  assert.ok(new Set(env.canvas.context.frames).size >= 3);
  assert.ok(env.canvas.context.frames.every((src) => !src.endsWith("pose-7.webp")));
  engine.dispose();
});

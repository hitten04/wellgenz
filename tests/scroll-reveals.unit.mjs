import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

// Exercise the actual controller without requiring a browser server. Native
// layout/paint remains a separate browser QA concern.
const source = readFileSync(new URL("../src/components/scroll-reveals.tsx", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
function harness({ reduced = false, compact = false } = {}) {
  let cleanup, observer, mutation;
  const animations = [], listeners = new Map(), frames = new Map();
  const nodes = [];
  class Element {
    animate() {}
    isConnected = true;
    dataset = {};
    classList = { add() {}, remove() {} };
    visual = false;
    nested = false;
    parentElement = { children: [], closest: () => this.nested ? {} : null };
    contains(target) { return target === this; }
    closest() { return null; }
    matches() { return this.visual; }
  }
  class IO {
    // Capture the observer instance to drive native-style callbacks in this test.
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    constructor(callback) { this.callback = callback; this.nodes = new Set(); observer = this; }
    observe(node) { this.nodes.add(node); }
    unobserve(node) { this.nodes.delete(node); }
    disconnect() { this.nodes.clear(); this.disconnected = true; }
  }
  const document = { hidden: false, activeElement: null, body: {}, querySelectorAll: () => nodes,
    addEventListener: (name, cb) => listeners.set(name, cb), removeEventListener: name => listeners.delete(name) };
  const window = { IntersectionObserver: IO, scrollY: 0, matchMedia: () => ({ matches: compact }) };
  const exports = {};
  vm.runInNewContext(compiled, {
    exports, window, document, Element, Node: Element, IntersectionObserver: IO,
    MutationObserver: class { constructor(cb) { mutation = cb; } observe() {} disconnect() {} },
    requestAnimationFrame: cb => { frames.set(1, cb); return 1; }, cancelAnimationFrame: id => frames.delete(id),
    getComputedStyle: () => ({ visibility: "visible", opacity: "1", translate: "none", scale: "none" }),
    require: name => {
      if (name === "react") return { useEffect: cb => { cleanup = cb(); } };
      if (name === "next/navigation") return { usePathname: () => "/features" };
      if (name === "./use-reduced-motion") return { useReducedMotion: () => reduced };
      if (name === "motion/mini") return { animate: (node, keyframes, options) => {
        let resolve;
        const animation = { node, keyframes, options, finished: new Promise(r => { resolve = r; }), cancel() { this.cancelled = true; }, complete: () => resolve() };
        animations.push(animation); return animation;
      } };
      throw Error(name);
    },
  });
  return { nodes, animations, window, document, listeners,
    node: () => new Element(), mount: () => exports.ScrollReveals(),
    enter: node => observer.callback([{ target: node, isIntersecting: true, intersectionRatio: .5 }]),
    leave: node => observer.callback([{ target: node, isIntersecting: false, intersectionRatio: 0 }]),
    mutation: () => { mutation(); for (const cb of frames.values()) cb(); frames.clear(); },
    observer: () => observer, cleanup: () => cleanup?.(),
  };
}

test("reveals once per entry and reverses travel when scrolling upward", () => {
  const h = harness(), n = h.node(); h.nodes.push(n); h.mount();
  h.window.scrollY = 400; h.enter(n); h.enter(n);
  assert.equal(h.animations.length, 1);
  assert.equal(h.animations[0].keyframes.translate[0], "0px 20px");
  h.leave(n); assert.equal(h.animations[0].cancelled, true);
  h.window.scrollY = 100; h.enter(n);
  assert.equal(h.animations.length, 2);
  assert.equal(h.animations[1].keyframes.translate[0], "0px -20px"); h.cleanup();
});
test("reduced motion creates no observers or animations", () => {
  const h = harness({ reduced: true }); h.mount(); assert.equal(h.observer(), undefined); assert.equal(h.animations.length, 0);
});
test("focus and unmount cancel effects and remove listeners", () => {
  const h = harness(), n = h.node(); h.nodes.push(n); h.mount(); h.enter(n);
  h.listeners.get("focusin")({ target: n }); assert.equal(h.animations[0].cancelled, true);
  h.leave(n); h.enter(n); h.cleanup();
  assert.equal(h.animations[1].cancelled, true); assert.equal(h.listeners.size, 0); assert.equal(h.observer().disconnected, true);
});
test("dynamic content is observed, detached content is released, nested reveals are skipped", () => {
  const h = harness(); h.mount(); const n = h.node(), nested = h.node(); nested.nested = true;
  h.nodes.push(n, nested); h.mutation(); assert.equal(h.observer().nodes.size, 1);
  h.enter(n); n.isConnected = false; h.nodes.splice(0, 1); h.mutation();
  assert.equal(h.observer().nodes.size, 0); assert.equal(h.animations[0].cancelled, true); h.cleanup();
});
test("mobile travel and stagger are bounded; final styles are released", async () => {
  const h = harness({ compact: true }), n = h.node(); n.visual = true; n.dataset = { revealY: "70", revealDelay: "2" };
  h.nodes.push(n); h.mount(); h.enter(n); const a = h.animations[0];
  assert.equal(a.keyframes.translate[0], "0px 12px"); assert.equal(a.options.delay, .18);
  assert.equal(a.keyframes.scale[0], .995); a.complete(); await Promise.resolve();
  assert.equal(a.cancelled, true); h.cleanup();
});
test("hidden tabs and focused content remain still", () => {
  const h = harness(), n = h.node(); h.nodes.push(n); h.mount(); h.document.hidden = true; h.enter(n);
  assert.equal(h.animations.length, 0); h.leave(n); h.document.hidden = false; h.document.activeElement = n; h.enter(n);
  assert.equal(h.animations.length, 0); h.cleanup();
});

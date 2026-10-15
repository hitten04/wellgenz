import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const compiled = ts.transpileModule(readFileSync(new URL("../src/components/home-hero-art.tsx", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
function harness({ reduced = false, fine = true } = {}) {
  const exported = {}, values = [];
  const value = initial => { const v = { current: initial, set(next) { this.current = next; } }; values.push(v); return v; };
  const jsx = (type, props) => ({ type, props });
  vm.runInNewContext(compiled, { exports: exported, window: { matchMedia: () => ({ matches: fine }) }, require: name => {
    if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
    if (name === "motion/react") return { motion: { div: "motion.div" }, useSpring: value, useMotionValue: value, useMotionTemplate: () => "gradient" };
    if (name === "lucide-react") return new Proxy({}, { get: (_, key) => key });
    if (name === "next/image") return { default: "Image" };
    if (name === "./use-reduced-motion") return { useReducedMotion: () => reduced };
    throw new Error(name);
  } });
  const scene = exported.HomeHeroArt();
  const event = (clientX, clientY, pointerType = "mouse", width = 400) => ({ clientX, clientY, pointerType, currentTarget: { getBoundingClientRect: () => ({ left: 100, top: 100, width, height: 400 }) } });
  return { scene, values, event };
}
test("pointer tracking tilts the artwork and moves its shadow in the opposite direction", () => {
  const h = harness();
  h.scene.props.onPointerMove(h.event(500, 100));
  assert.equal(h.values[0].current, 4); assert.equal(h.values[1].current, 7);
  assert.equal(h.values[2].current, 8); assert.equal(h.values[3].current, -6);
  assert.equal(h.values[4].current, -5); assert.equal(h.values[5].current, 2);
  h.scene.props.onPointerMove(h.event(300, 300));
  assert.equal(Math.abs(h.values[0].current), 0); assert.equal(h.values[1].current, 0);
});
test("coordinates stay bounded and leaving or canceling returns the scene to rest", () => {
  const h = harness();
  h.scene.props.onPointerMove(h.event(1000, -100));
  assert.equal(h.values[0].current, 4); assert.equal(h.values[1].current, 7);
  for (const handler of ["onPointerLeave", "onPointerCancel"]) {
    h.scene.props.onPointerMove(h.event(100, 500));
    h.scene.props[handler]();
    assert.equal(Math.abs(h.values[0].current), 0); assert.equal(h.values[1].current, 0); h.values.forEach(value => assert.equal(value.current, 0));
  }
});
test("touch, coarse pointers, reduced motion and empty bounds never activate tracking", () => {
  for (const options of [{ reduced: true }, { fine: false }, {}]) {
    const h = harness(options);
    h.scene.props.onPointerMove(h.event(500, 100, options.reduced || options.fine === false ? "mouse" : "touch"));
    assert.equal(Math.abs(h.values[0].current), 0); assert.equal(h.values[1].current, 0); h.values.forEach(value => assert.equal(value.current, 0));
  }
  const h = harness(); h.scene.props.onPointerMove(h.event(500, 100, "mouse", 0));
  h.values.forEach(value => assert.equal(value.current, 0));
});

test("the hero art has no cards, background panels or text overlays", () => {
  const h = harness();
  const nodes = [];
  function walk(node) {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node?.props) return;
    nodes.push(node); walk(node.props.children);
  }
  walk(h.scene);
  assert.equal(nodes.some(node => /backing|surface|update|careers|label|badge/.test(node.props.className || "")), false);
  assert.equal(nodes.some(node => node.type === "figcaption"), false);
  assert.equal(nodes.filter(node => node.props.src === "/images/hiring-team-3d-transparent.webp").length, 1);
});

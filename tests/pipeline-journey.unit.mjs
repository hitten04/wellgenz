import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

// Exercise the real component's state and keyboard handlers without a browser.
// CSS layout, painting and pointer hit-testing remain browser QA concerns.
const compiled = ts.transpileModule(readFileSync(new URL("../src/components/product-visuals.tsx", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
function harness() {
  let cursor = 0;
  const hooks = [], focus = [], exported = {};
  const jsx = (type, props) => ({ type, props });
  const icons = new Proxy({}, { get: (_, name) => name });
  const react = {
    useId: () => "example-journey",
    useState(initial) { const i = cursor++; if (!(i in hooks)) hooks[i] = initial; return [hooks[i], value => { hooks[i] = typeof value === "function" ? value(hooks[i]) : value; }]; },
    useRef(initial) { const i = cursor++; if (!(i in hooks)) hooks[i] = { current: initial }; return hooks[i]; },
  };
  vm.runInNewContext(compiled, { exports: exported, require: name => {
    if (name === "react") return react;
    if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
    if (name === "motion/react") return { motion: {} };
    if (name === "lucide-react") return icons;
    if (name === "./use-reduced-motion") return { useReducedMotion: () => false };
    throw new Error(name);
  } });
  function walk(node, result = []) {
    if (Array.isArray(node)) node.forEach(item => walk(item, result));
    else if (node && typeof node === "object" && node.props) { result.push(node); walk(node.props.children, result); }
    return result;
  }
  function render() {
    cursor = 0;
    const nodes = walk(exported.PipelineVisual());
    const tabs = nodes.filter(n => n.props.role === "tab");
    const panels = nodes.filter(n => n.props.role === "tabpanel");
    tabs.forEach(tab => tab.props.ref({ focus() { focus.push(tab.props.id); } }));
    return { tabs, panels, selected: tabs.findIndex(t => t.props["aria-selected"]) };
  }
  return { render, focus, walk };
}

test("starts with one selected stage and only its panel available to assistive technology", () => {
  const { tabs, panels, selected } = harness().render();
  assert.equal(tabs.length, 4); assert.equal(panels.length, 4); assert.equal(selected, 0);
  assert.equal(tabs.filter(t => t.props.tabIndex === 0).length, 1);
  panels.forEach((panel, i) => {
    assert.equal(panel.props["aria-hidden"], i !== selected);
    assert.equal(panel.props.inert, i !== selected);
    assert.equal(tabs[i].props["aria-controls"], panel.props.id);
    assert.equal(panel.props["aria-labelledby"], tabs[i].props.id);
  });
});
test("selecting a stage updates the preview and keeps one accessible panel", () => {
  const h = harness();
  h.render().tabs[2].props.onClick();
  const current = h.render();
  assert.equal(current.selected, 2);
  assert.equal(current.panels.filter(p => !p.props["aria-hidden"]).length, 1);
  assert.equal(current.panels[2].props.tabIndex, 0);
});
test("arrow keys wrap, Home and End select boundaries, and focus follows selection", () => {
  const h = harness();
  for (const [key, expected] of [["ArrowLeft",3],["ArrowRight",0],["End",3],["ArrowDown",0],["ArrowUp",3],["Home",0]]) {
    const before = h.render(); let prevented = false;
    before.tabs[before.selected].props.onKeyDown({ key, preventDefault() { prevented = true; } });
    const after = h.render();
    assert.equal(prevented, true); assert.equal(after.selected, expected);
    assert.equal(h.focus.at(-1), after.tabs[expected].props.id);
  }
});
test("unrelated keyboard input does not change selection or intercept the key", () => {
  const h = harness(); let prevented = false;
  h.render().tabs[0].props.onKeyDown({ key: "Tab", preventDefault() { prevented = true; } });
  assert.equal(h.render().selected, 0); assert.equal(prevented, false);
});

test("the same applicants progress from three applications to two interviews and one offer", () => {
  const h = harness();
  const expected = [["Jordan Lee", "Avery Shah", "Sam Morgan"], ["Jordan Lee", "Avery Shah"], ["Jordan Lee", "Avery Shah"], ["Avery Shah"]];
  for (let i = 0; i < expected.length; i++) {
    h.render().tabs[i].props.onClick();
    const current = h.render();
    const panel = current.panels[current.selected];
    const rows = h.walk(panel).filter(node => node.type === "li");
    const names = rows.map(row => h.walk(row).find(node => node.type === "strong").props.children);
    assert.deepEqual(names, expected[i]);
    assert.equal(new Set(names).size, names.length);
    const list = h.walk(panel).find(node => node.type === "ul");
    assert.equal(list.props["aria-label"], ["3 applications", "2 shortlisted", "2 interviews", "1 offer"][i]);
  }
});

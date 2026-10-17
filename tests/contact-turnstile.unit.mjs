import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const compiled = ts.transpileModule(readFileSync(new URL("../src/components/contact-form.tsx", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
function harness(siteKey = "") {
  let cursor = 0, now = 1000;
  const hooks = [], exported = {}, location = { href: "" };
  const jsx = (type, props) => ({ type, props });
  const react = {
    useState(initial) { const i = cursor++; if (!(i in hooks)) hooks[i] = initial; return [hooks[i], value => { hooks[i] = value; }]; },
    useCallback(callback) { const i = cursor++; if (!(i in hooks)) hooks[i] = callback; return hooks[i]; },
  };
  vm.runInNewContext(compiled, { exports: exported, Date: { now: () => now }, window: { location }, require: name => {
    if (name === "react") return react;
    if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
    if (name === "lucide-react") return { ArrowUpRight: "ArrowUpRight", Mail: "Mail" };
    if (name === "./contact-turnstile") return { ContactTurnstile: "ContactTurnstile" };
    if (name === "@/lib/site") return { site: { contactEmail: "hello@example.com" } };
    throw new Error(name);
  } });
  function walk(node, found = []) {
    if (Array.isArray(node)) node.forEach(child => walk(child, found));
    else if (node?.props) { found.push(node); walk(node.props.children, found); }
    return found;
  }
  function render() { cursor = 0; return walk(exported.ContactForm({ siteKey })); }
  function submit() { render().find(n => n.type === "form").props.onSubmit({ preventDefault() {} }); }
  return { render, submit, location, advance: ms => { now += ms; } };
}

test("an unconfigured widget preserves the original email-draft form", () => {
  const h = harness();
  assert.equal(h.render().some(n => n.type === "ContactTurnstile"), false);
  h.submit(); assert.match(h.location.href, /^mailto:/);
});
test("a configured widget blocks the draft until its challenge completes", () => {
  const h = harness("configured-public-key");
  assert.equal(h.render().find(n => n.type === "button").props.disabled, true);
  h.submit(); assert.equal(h.location.href, "");
  assert.equal(h.render().some(n => n.props.role === "alert"), true);
  h.render().find(n => n.type === "ContactTurnstile").props.onToken("challenge-token");
  assert.equal(h.render().find(n => n.type === "button").props.disabled, false);
  h.submit(); assert.match(h.location.href, /^mailto:/);
  assert.equal(h.location.href.includes("challenge-token"), false);
});
test("expiry or errors revoke completion and keep form data", () => {
  const h = harness("configured-public-key");
  h.render().find(n => n.props.id === "contact-name").props.onChange({ target: { value: "Alex" } });
  const challenge = () => h.render().find(n => n.type === "ContactTurnstile");
  challenge().props.onToken("token");
  challenge().props.onToken("");
  h.submit(); assert.equal(h.location.href, "");
  assert.equal(h.render().find(n => n.props.id === "contact-name").props.value, "Alex");
  challenge().props.onToken("replacement-token");
  h.advance(300_000);
  h.submit(); assert.equal(h.location.href, "");
});
test("ordinary field edits do not restart the widget callback", () => {
  const h = harness("configured-public-key");
  const callback = h.render().find(n => n.type === "ContactTurnstile").props.onToken;
  h.render().find(n => n.props.id === "contact-email").props.onChange({ target: { value: "alex@example.com" } });
  assert.equal(h.render().find(n => n.type === "ContactTurnstile").props.onToken, callback);
});

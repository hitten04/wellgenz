import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function compile(path, dependencies = {}) {
  const source = ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(source, { exports, require(name) { if (name in dependencies) return dependencies[name]; throw new Error(name); } });
  return exports;
}
const site = compile("../src/lib/site.ts");
const { faqGroups, filterFAQGroups } = compile("../src/lib/faq-groups.ts", { "./site": site });
const count = groups => groups.reduce((n, group) => n + group.items.length, 0);
const plain = value => JSON.parse(JSON.stringify(value));

test("all thirteen original questions remain in four topic groups", () => {
  assert.equal(faqGroups.length, 4); assert.equal(count(faqGroups), 13);
  assert.deepEqual(plain(filterFAQGroups("")), plain(faqGroups));
  assert.equal(new Set(faqGroups.flatMap(group => group.items.map(item => item.question))).size, 13);
});
test("topic filters show only their own questions", () => {
  for (const group of faqGroups) {
    const result = filterFAQGroups("", group.id);
    assert.equal(result.length, 1); assert.equal(result[0].id, group.id);
    assert.equal(count(result), group.items.length);
  }
});
test("search matches question or answer text regardless of case and extra spaces", () => {
  assert.deepEqual(plain(filterFAQGroups("  GOOGLE    MEET  ")), plain(filterFAQGroups("google meet")));
  assert.ok(count(filterFAQGroups("Google Meet")) > 0);
  assert.equal(count(filterFAQGroups("who is wellgenz for")), 1);
  assert.ok(count(filterFAQGroups("funnel")) > 0);
});
test("search and topic filters combine without mutating the source", () => {
  const before = JSON.stringify(faqGroups);
  assert.ok(count(filterFAQGroups("Zoom", "coordination")) > 0);
  assert.equal(count(filterFAQGroups("Zoom", "team")), 0);
  assert.equal(count(filterFAQGroups("no-such-topic-or-answer-xyz")), 0);
  assert.equal(JSON.stringify(faqGroups), before);
  assert.equal(count(filterFAQGroups("")), 13);
});

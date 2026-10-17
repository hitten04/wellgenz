import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

// Run after next build; inspect the HTML that search engines actually receive.
const root = "out";
const origin = "https://wellgenz.com";
const decode = value => value.replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replace(/&quot;/g, '"').replace(/&apos;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const text = value => decode(value.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const attrs = value => Object.fromEntries([...value.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, val]) => [key, decode(val)]));
const routeOf = value => new URL(value, origin).pathname.replace(/\/$/, "") || "/";
function files(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)]); }
const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const sitemapURLs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, value]) => decode(value));
const routes = new Set(sitemapURLs.map(routeOf));
assert.equal(routes.size, sitemapURLs.length, "Sitemap has duplicate routes");
const titles = new Map(), descriptions = new Map(), headings = new Map(), paragraphs = new Map(), indexed = new Set();
for (const file of files(root).filter(file => file.endsWith("/index.html"))) {
  const html = readFileSync(file, "utf8");
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attrs(tag));
  if (metas.some(meta => meta.name === "robots" && /\bnoindex\b/.test(meta.content))) continue;
  const route = routeOf("/" + file.slice(root.length + 1, -"index.html".length));
  const meta = (kind, value) => metas.find(item => item[kind] === value)?.content;
  const title = text(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
  const description = meta("name", "description");
  assert.ok(title && description, `${route}: missing title or description`);
  assert.equal((title.match(/Wellgenz/g) ?? []).length, 1, `${route}: duplicated or missing brand in title`);
  for (const [map, value, label] of [[titles, title, "title"], [descriptions, description, "description"]]) {
    assert.ok(!map.has(value), `${route}: duplicate ${label} from ${map.get(value)}`); map.set(value, route);
  }
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attrs(tag));
  const canonical = links.filter(link => link.rel === "canonical");
  assert.equal(canonical.length, 1, `${route}: expected one canonical URL`);
  assert.equal(new URL(canonical[0].href).origin, origin, `${route}: incorrect canonical origin`);
  assert.equal(routeOf(canonical[0].href), route, `${route}: canonical points to another page`);
  assert.equal(meta("property", "og:title"), title, `${route}: Open Graph title mismatch`);
  assert.equal(meta("property", "og:description"), description, `${route}: Open Graph description mismatch`);
  assert.equal(routeOf(meta("property", "og:url")), route, `${route}: Open Graph URL mismatch`);
  assert.equal(meta("name", "twitter:title"), title, `${route}: Twitter title mismatch`);
  assert.equal(meta("name", "twitter:description"), description, `${route}: Twitter description mismatch`);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  const h1s = [...main.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  assert.equal(h1s.length, 1, `${route}: expected one H1`);
  const h1 = text(h1s[0][1]);
  assert.ok(!headings.has(h1), `${route}: duplicate H1 from ${headings.get(h1)}`); headings.set(h1, route);
  for (const [, value] of main.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)) {
    const paragraph = text(value);
    if (paragraph.length <= 70) continue;
    assert.ok(!paragraphs.has(paragraph) || paragraphs.get(paragraph) === route, `${route}: repeated paragraph from ${paragraphs.get(paragraph)}: ${paragraph}`);
    paragraphs.set(paragraph, route);
  }
  indexed.add(route);
}
assert.deepEqual([...indexed].sort(), [...routes].sort(), "Sitemap does not match the indexable pages");
console.log(`SEO checks passed for ${indexed.size} marketing routes: unique titles, descriptions and H1s; matching social metadata; self-canonicals; sitemap coverage; no repeated long paragraphs.`);

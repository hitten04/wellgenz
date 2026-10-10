import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { setTimeout } from "node:timers/promises";
const port = 3100;
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], { stdio: "ignore" });
try {
  let ready = false;
  for (let i = 0; i < 80; i++) {
    try { if ((await fetch(origin)).ok) { ready = true; break; } } catch { /* wait for startup */ }
    await setTimeout(100);
  }
  assert(ready, "Production server did not start");
  for (const path of ["/", "/privacy", "/terms", "/robots.txt", "/sitemap.xml", "/opengraph-image", "/icon.svg"]) {
    const response = await fetch(`${origin}${path}`);
    assert.equal(response.status, 200, `${path} must return 200`);
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    const body = path === "/opengraph-image" ? new Uint8Array(await response.arrayBuffer()) : await response.text();
    if (path === "/opengraph-image") assert.deepEqual(Array.from(body.slice(0, 8)), [137, 80, 78, 71, 13, 10, 26, 10]);
    if (path === "/") {
      assert.equal((body.match(/<h1(?:\s|>)/g) || []).length, 1);
      assert.match(body, /rel="canonical" href="https:\/\/wellgenz.com"/);
      const ids = new Set([...body.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
      const anchors = [...body.matchAll(/href="\/?#([^"]+)"/g)].map(match => match[1]);
      for (const id of anchors) assert(ids.has(id), `Missing anchor ${id}`);
      assert((body.match(/href="https:\/\/app.wellgenz.com"/g) || []).length >= 5);
    }
    if (["/privacy", "/terms"].includes(path)) { assert.match(body, /Draft — not yet effective/); assert.match(body, /name="robots" content="noindex/); }
    console.log(`PASS ${path}`);
  }
  assert.equal((await fetch(`${origin}/nonexistent-page`)).status, 404);
  console.log("PASS 404 route, canonical, anchors, app links, legal draft metadata and security headers");
} finally { server.kill("SIGTERM"); }

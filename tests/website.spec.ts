import { mkdir } from "node:fs/promises";
import { test as base, expect } from "@playwright/test";
// Single-process Chromium requires a fresh browser for each test context.
const test = process.env.PLAYWRIGHT_SINGLE_PROCESS === "1" ? base.extend({
  page: async ({ playwright }, provide) => {
    const browser = await playwright.chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH, args: ["--single-process", "--no-zygote"] });
    const context = await browser.newContext();
    const page = await context.newPage();
    await provide(page);
    await browser.close();
  },
}) : base;
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 375, 390, 768, 1024, 1440]) {
  test(`homepage fits ${width}px and has no runtime errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("People,");
    await page.locator("#faqs").scrollIntoViewIfNeeded();
    const dimensions = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: innerWidth }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
    expect(errors).toEqual([]);
    if (process.env.WELLGENZ_CAPTURE_PREVIEWS === "1" && [390, 1440].includes(width)) {
      await mkdir("docs/previews", { recursive: true });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `docs/previews/${width === 390 ? "mobile" : "desktop"}.png`, fullPage: true });
    }
    const links = page.locator('a[href="https://app.wellgenz.com"]');
    expect(await links.count()).toBeGreaterThanOrEqual(5);
  });
}

test("mobile disclosure supports navigation and Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Features" }).click();
  await expect(page).toHaveURL(/#features$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
});

test("matching threshold, audience tabs and FAQs work", async ({ page }) => {
  await page.goto("/");
  const range = page.getByRole("slider", { name: "Shortlist threshold" });
  await expect(page.getByText("2 of 3 example candidates meet your threshold.")).toBeVisible();
  await range.focus();
  await page.keyboard.press("End");
  await expect(page.getByText("0 of 3 example candidates meet your threshold.")).toBeVisible();
  await page.keyboard.press("Home");
  await expect(page.getByText("3 of 3 example candidates meet your threshold.")).toBeVisible();
  await page.getByRole("tab", { name: "Recruiters", exact: true }).click();
  await expect(page.getByRole("tabpanel", { name: "Recruiters", exact: true })).toContainText("See the fit behind the profile.");
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Growing companies" })).toBeFocused();
  await expect(page.getByRole("tabpanel", { name: "Growing companies", exact: true })).toContainText("Give your hiring a place to grow.");
  const summary = page.locator("summary").filter({ hasText: "What is Wellgenz?" });
  await summary.click();
  await expect(page.locator("details[open]")).toContainText("end-to-end recruitment platform");
});

test("internal links, metadata and legal routes are valid", async ({ page, request }) => {
  await page.goto("/");
  const destinations = await page.locator('a[href^="/"]').evaluateAll(links => [...new Set(links.map(link => link.getAttribute("href")!))]);
  for (const href of destinations) {
    if (href.startsWith("/#")) expect(await page.locator(href.slice(1)).count()).toBe(1);
    else expect((await request.get(href)).status()).toBe(200);
  }
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://wellgenz.com");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);
  for (const path of ["/robots.txt", "/sitemap.xml", "/opengraph-image", "/icon.svg"]) expect((await request.get(path)).status()).toBe(200);
  for (const path of ["/privacy", "/terms"]) {
    await page.goto(path);
    await expect(page.getByText("Draft — not yet effective.", { exact: false })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  }
  expect((await request.get("/missing-page")).status()).toBe(404);
});

for (const width of [390, 1440]) {
  test(`automated accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations.map(violation => ({ id: violation.id, nodes: violation.nodes.map(node => ({ target: node.target, reason: node.failureSummary })) }))).toEqual([]);
  });
}

 test("hiring email examples work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Offer", exact: true }).click();
  await expect(page.getByRole("tabpanel", { name: "Offer", exact: true })).toContainText("Your next chapter starts here.");
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Rejection", exact: true })).toBeFocused();
  await expect(page.getByRole("tabpanel", { name: "Rejection", exact: true })).toContainText("An update on your application.");
});

test("natural 3D journey responds to pointer without controls and respects reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator(".hero-diagram button")).toHaveCount(0);
  const scene = page.locator(".diagram-scene");
  const tilt = page.locator(".diagram-tilt");
  const box = (await scene.boundingBox())!;
  const transform = () => tilt.evaluate(node => getComputedStyle(node).transform);
  await page.mouse.move(box.x + box.width * .9, box.y + box.height * .2);
  await expect.poll(transform).toContain("matrix3d");
  await page.mouse.move(0, 0);
  await expect.poll(transform).toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page.mouse.move(box.x + box.width * .2, box.y + box.height * .8);
  await expect.poll(transform).toBe("none");
});


test("candidate deck keeps its timeline through hover, click and exit with correct cyclic order", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const cards = page.locator(".deck-card");
  await expect(cards).toHaveCount(3);
  const clock = () => cards.first().evaluate(node => {
    const animation = node.getAnimations()[0];
    return { time: Number(animation.currentTime), start: Number(animation.startTime), state: animation.playState };
  });
  const initial = await clock();
  await page.locator(".candidate-deck").hover();
  await expect.poll(async () => (await clock()).time).toBeGreaterThan(initial.time + 300);
  expect((await clock()).start).toBe(initial.start);
  await page.locator(".candidate-deck").click();
  const clicked = await clock();
  await expect.poll(async () => (await clock()).time).toBeGreaterThan(clicked.time + 300);
  expect((await clock()).start).toBe(initial.start);
  await page.mouse.move(0, 0);
  expect((await clock()).state).toBe("running");
  expect((await clock()).start).toBe(initial.start);
  const sampled = await cards.evaluateAll(nodes => {
    const animations = nodes.map(node => node.getAnimations()[0]);
    animations.forEach(animation => animation.pause());
    const frames = [0, 2000, 4000, 6000].map(time => {
      animations.forEach(animation => { animation.currentTime = time; });
      const styles = nodes.map(node => getComputedStyle(node));
      const front = styles.reduce((best, style, index) => Number(style.zIndex) > Number(styles[best].zIndex) ? index : best, 0);
      return { front, transforms: styles.map(style => style.transform) };
    });
    return { frames, durations: animations.map(animation => animation.effect!.getTiming().duration) };
  });
  expect(sampled.frames.map(frame => frame.front)).toEqual([0, 1, 2, 0]);
  expect(sampled.frames[0].transforms).toEqual(sampled.frames[3].transforms);
  expect(sampled.durations).toEqual([6000, 6000, 6000]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => cards.first().evaluate(node => getComputedStyle(node).animationName)).toBe("none");
  await expect(cards).toHaveCount(3);
});

test("feature directory and all eight detail pages work on desktop and mobile", async ({ page, request }) => {
  const slugs = ["job-management", "career-pages", "applicant-tracking", "resume-parsing", "candidate-scoring", "candidate-notes", "role-based-access", "hiring-analytics"];
  await page.goto("/features");
  await expect(page.locator(".product-directory-card")).toHaveCount(8);
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const slug of slugs) {
      await page.goto(`/features/${slug}`);
      await expect(page.locator("main h1")).toHaveCount(1);
      await expect(page.locator(".product-detail-grid article")).toHaveCount(3);
      await expect(page.locator('nav[aria-label="Feature pages"] a[aria-current="page"]')).toHaveAttribute("href", `/features/${slug}`);
      await page.locator("details summary").first().click();
      await expect(page.locator("details[open] p")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://wellgenz.com/features/${slug}`);
    }
    await page.goto("/features/job-management");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
    if (process.env.WELLGENZ_CAPTURE_PREVIEWS === "1") await page.screenshot({ path: `docs/previews/features-${width}.png`, fullPage: true });
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const slug of slugs) expect(sitemap).toContain(`/features/${slug}`);
  expect((await request.get("/features/not-a-feature")).status()).toBe(404);
});

test("product navigation exposes all eight pages and themes respect reduced motion", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    if (width < 960) await page.getByRole("button", { name: "Open navigation" }).click();
    const button = page.getByRole("button", { name: "Product pages", exact: true });
    await button.click();
    const panel = page.locator(width < 960 ? "#mobile-product-pages" : "#desktop-product-pages");
    await expect(panel.locator('a[href^="/features/"]')).toHaveCount(8);
    await panel.getByRole("link", { name: /Hiring analytics/ }).click();
    await expect(page).toHaveURL(/features\/hiring-analytics/);
    await expect(page.locator("main")).toHaveAttribute("data-theme", "hiring-analytics");
    await expect(page.locator("[data-product-motion]")).toHaveCount(7);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.locator(".product-reading-progress")).toHaveCount(0);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    if (width === 1440) {
      await button.click();
      await page.keyboard.press("Escape");
      await expect(button).toBeFocused();
      await expect(panel).toBeHidden();
    }
  }
});

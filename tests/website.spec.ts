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

 test("3D diagram pause and hiring email examples work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Pause diagram animation" }).click();
  await expect(page.getByRole("button", { name: "Play diagram animation" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Play diagram animation" }).click();
  await expect(page.getByRole("button", { name: "Pause diagram animation" })).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("tab", { name: "Offer", exact: true }).click();
  await expect(page.getByRole("tabpanel", { name: "Offer", exact: true })).toContainText("Your next chapter starts here.");
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Rejection", exact: true })).toBeFocused();
  await expect(page.getByRole("tabpanel", { name: "Rejection", exact: true })).toContainText("An update on your application.");
});

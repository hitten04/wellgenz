import { test, expect } from "@playwright/test";
for (const width of [390, 1024, 1440]) {
  test(`restored pages and animations fit ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.setViewportSize({ width, height: 850 });
    for (const route of ['/', '/features', '/features/job-management', '/how-it-works', '/why-wellgenz', '/faqs', '/about-us', '/contact-us']) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await expect(page.locator('main h1')).toBeVisible();
      await page.locator('footer').scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollTo(0,0));
      if (route === '/faqs') {
        const question = page.locator('.faq-motion-trigger').first();
        if(await question.getAttribute("aria-expanded") !== "true") await question.click();
        await expect(question).toHaveAttribute('aria-expanded','true');
        await expect(page.locator('.faq-motion-content').first()).toBeVisible();
      }
      if (process.env.WELLGENZ_CAPTURE_PREVIEWS === '1' && ['/','/about-us','/contact-us'].includes(route)) await page.screenshot({path:`docs/previews/restored-${route.slice(1)||'home'}-${width}.png`,fullPage:true});
    }
    if(width <=1100){
      await page.getByRole('button',{name:'Open navigation'}).click();
      const nav=page.getByRole('navigation',{name:'Mobile navigation'});
      await expect(nav.getByRole('link',{name:'Contact us'})).toBeVisible();
      await nav.getByRole('link',{name:'About us'}).click();
      await expect(page).toHaveURL(/about-us$/);
    }
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.goto('/features/job-management');
    await expect(page.locator('.product-reading-progress')).toHaveCount(0);
    await expect(page.locator('main h1')).toBeVisible();
    expect(errors).toEqual([]);
  });
}
test('page copy remains readable before JavaScript loads',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false});
  const page=await context.newPage();
  for(const route of ['/','/features/job-management','/about-us']){
    await page.goto(`http://127.0.0.1:3000${route}`);
    await expect(page.locator('main h1')).toBeVisible();
    expect(await page.locator('main h1').evaluate(el=>{let n:Element|null=el;while(n){if(getComputedStyle(n).opacity==='0')return false;n=n.parentElement;}return true;})).toBe(true);
  }
  await context.close();
});

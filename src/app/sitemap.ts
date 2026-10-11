import type { MetadataRoute } from "next";
import { productPages } from "@/lib/product-pages";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  // Legal pages are intentionally excluded until the owner finalizes the drafts.
  return [{ url: site.url, changeFrequency: "monthly", priority: 1 }, { url: `${site.url}/features`, changeFrequency: "monthly", priority: .8 }, ...productPages.map(page => ({ url: `${site.url}/features/${page.slug}`, changeFrequency: "monthly" as const, priority: .7 }))];
}

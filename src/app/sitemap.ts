import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  // Legal pages are intentionally excluded until the owner finalizes the drafts.
  return [{ url: site.url, changeFrequency: "monthly", priority: 1 }];
}

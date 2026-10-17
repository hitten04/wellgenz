import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-seo";
import { ServerErrorScene } from "@/components/server-error-scene";

export const metadata: Metadata = pageMetadata("/500");

export default function Page500() {
  return <ServerErrorScene />;
}

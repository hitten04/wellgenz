import type { Metadata } from "next";
import { ServerErrorScene } from "@/components/server-error-scene";

export const metadata: Metadata = {
  title: "500 – Something Went Wrong | Wellgenz",
  description: "Our servers are experiencing an unexpected issue. Please try again in a few moments.",
  robots: { index: false, follow: false },
};

export default function Page500() {
  return <ServerErrorScene />;
}

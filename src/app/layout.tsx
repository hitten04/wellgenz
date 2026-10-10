import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Wellgenz — A clearer way to hire", template: "%s | Wellgenz" },
  description: site.description,
  applicationName: site.name,
  openGraph: { title: "Wellgenz — A clearer way to hire", description: site.description, url: site.url, siteName: site.name, type: "website", locale: "en_US", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Wellgenz — People today. Possibilities tomorrow." }] },
  twitter: { card: "summary_large_image", title: "Wellgenz — A clearer way to hire", description: site.description, images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f6f2" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={GeistSans.variable}><body><a className="skip-link" href="#main">Skip to content</a><Header />{children}<Footer /></body></html>;
}

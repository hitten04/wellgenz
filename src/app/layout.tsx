import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Header } from "@/components/header";
import { ScrollReveals } from "@/components/scroll-reveals";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Wellgenz — A clearer way to hire", template: "%s | Wellgenz" },
  description: site.description,
  applicationName: site.name,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: { title: "Wellgenz — A clearer way to hire", description: site.description, url: site.url, siteName: site.name, type: "website", locale: "en_US", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Wellgenz — People today. Possibilities tomorrow." }] },
  twitter: { card: "summary_large_image", title: "Wellgenz — A clearer way to hire", description: site.description, images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f6f2" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        {children}
        <Footer />
        <ScrollReveals />
      </body>
    </html>
  );
}

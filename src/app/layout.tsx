import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Header } from "@/components/header";
import { ScrollReveals } from "@/components/scroll-reveals";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "AI Recruitment Software & Applicant Tracking | Wellgenz", template: "%s | Wellgenz" },
  description: site.description,
  applicationName: site.name,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: { title: "AI Recruitment Software & Applicant Tracking | Wellgenz", description: site.description, url: site.url, siteName: site.name, type: "website", locale: "en_US", images: [{ url: "/images/wellgenz-share-logo-v2.png", width: 1200, height: 1200, alt: "Wellgenz — People today. Possibilities tomorrow." }] },
  twitter: { card: "summary", title: "AI Recruitment Software & Applicant Tracking | Wellgenz", description: site.description, images: ["/images/wellgenz-share-logo-v2.png"] },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f6f2" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://chatzy-kb-store.s3.amazonaws.com/icons/5ab07987-b5db-477c-82ff-1287e0883acb" />
        <script
          src="https://chatzy-kb-store.s3.amazonaws.com/icons/56706cc4-b3ba-4eba-9610-f2fb07008a5c"
          id="d016bf45-912b-411c-a34d-bf1fbab6436f"
          className="chatzy_widget_script"
          defer
        />
      </head>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        {children}
        <Footer />
        <ScrollReveals />
      </body>
    </html>
  );
}

import NextLink from "next/link";
import type { AnchorHTMLAttributes } from "react";

type SiteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

// Published editorial pages use document navigation to avoid reusing an older
// App Router payload on the static preview host after a page is republished.
export function SiteLink({ href, ...props }: SiteLinkProps) {
  const pathname = href.split(/[?#]/, 1)[0];
  const feature = pathname === "/features" || pathname.startsWith("/features/");
  if (feature || pathname.replace(/\/$/, "") === "/how-it-works") {
    return <a href={href} data-document-navigation="true" data-feature-navigation={feature ? "document" : undefined} {...props}/>;
  }
  return <NextLink href={href} {...props}/>;
}

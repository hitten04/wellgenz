import NextLink from "next/link";
import type { AnchorHTMLAttributes } from "react";

type SiteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

// Feature pages use document navigation on the static preview host. This avoids
// reusing an older App Router payload after an illustrated page is republished.
export function SiteLink({ href, ...props }: SiteLinkProps) {
  const pathname = href.split(/[?#]/, 1)[0];
  if (pathname === "/features" || pathname.startsWith("/features/")) {
    return <a href={href} data-feature-navigation="document" {...props}/>;
  }
  return <NextLink href={href} {...props}/>;
}

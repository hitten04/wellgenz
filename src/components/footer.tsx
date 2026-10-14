import { SiteLink as Link } from "@/components/site-link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { navigation, site } from "@/lib/site";
export function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top"><div><Link href="/" aria-label="Wellgenz home"><Image src="/wellgenz-logo-transparent.png" alt="Wellgenz" width={1760} height={893} className="footer-logo" priority={false} style={{ height: "auto", width: "195px", display: "block", marginLeft: "-24px" }} /></Link><p>People today.<br />Possibilities tomorrow.</p></div><nav aria-label="Footer navigation">{navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}<a href={site.appUrl}>Access Dashboard <ArrowUpRight size={14} aria-hidden="true" /></a></nav><div className="footer-contact"><span className="eyebrow">Let’s talk hiring</span><a href={`mailto:${site.contactEmail}`}>{site.contactEmail}<ArrowUpRight size={15} aria-hidden="true" /></a><small>Placeholder contact — pending confirmation.</small></div></div>
    <div className="footer-bottom"><span>© {new Date().getUTCFullYear()} Wellgenz. All rights reserved.</span><div><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Service</Link><Link href="/#top">Back to top ↑</Link></div></div>
  </div></footer>;
}

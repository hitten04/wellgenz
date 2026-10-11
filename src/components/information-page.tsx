import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { AppLink } from "./ui";
import { ProductProgress, ProductSection } from "./product-motion";
export function InformationPage({ title, eyebrow, intro, name, theme, children }: { title: ReactNode; eyebrow: string; intro: string; name: string; theme?: string; children: ReactNode }) {
  return <main id="main" className="product-pages" data-theme={theme} aria-label={name}><ProductProgress /><div className="container"><ProductSection className="info-intro"><p className="eyebrow"><span />{eyebrow}</p><h1>{title}</h1><p className="product-lede">{intro}</p><AppLink>Access Dashboard</AppLink></ProductSection>{children}<ProductSection className="product-end"><p className="eyebrow">YOUR NEXT CHAPTER</p><h2>A clearer view of your next hire.</h2><p>Bring your jobs, applications, candidate context, and hiring communication into one connected recruitment workspace.</p><AppLink light>Access Dashboard</AppLink><Link href="/features">Explore the features <ArrowRight size={15} /></Link></ProductSection></div></main>;
}

import { PageHeroDiagram } from "./page-hero-diagram";
import { SiteLink as Link } from "@/components/site-link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { AppLink } from "./ui";
import { ProductProgress, ProductSection } from "./product-motion";
export function InformationPage({
  title,
  eyebrow,
  intro,
  name,
  theme,
  children,
  heroArt,
}: {
  title: ReactNode;
  eyebrow: string;
  intro: string;
  name: string;
  theme?: string;
  children: ReactNode;
  heroArt?: ReactNode;
}) {
  return (
    <main id="main" className="product-pages" data-theme={theme} aria-label={name}>
      <ProductProgress />
      <div className="container">
        <ProductSection className="info-intro page-hero-layout">
          <div className="page-hero-copy">
            <p className="eyebrow"><span />{eyebrow}</p>
            <h1>{title}</h1>
            <p className="product-lede">{intro}</p>
            <AppLink>Access Dashboard</AppLink>
          </div>
          {heroArt ?? <PageHeroDiagram page={name} />}
        </ProductSection>
        {children}
        <ProductSection className="product-end">
          <p className="eyebrow">YOUR NEXT CHAPTER</p>
          <h2>A clearer view of your next hire.</h2>
          <p>Manage jobs, candidates, and hiring communication in one workspace.</p>
          <AppLink light>Access Dashboard</AppLink>
          <Link href="/features">Explore the features <ArrowRight size={15} /></Link>
        </ProductSection>
      </div>
    </main>
  );
}

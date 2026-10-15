import { ClosingCTA } from "./closing-cta";
import { PageHeroDiagram } from "./page-hero-diagram";
import type { ReactNode } from "react";
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
        <ClosingCTA art="faqs" title={<>A clearer view<br/><em>of your next hire.</em></>} description="Manage jobs, candidates, and hiring communication in one workspace." secondaryLabel="Explore the features"/>
      </div>
    </main>
  );
}

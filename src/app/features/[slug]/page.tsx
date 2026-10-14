import type { Metadata } from "next";
import Image from "next/image";
import { SiteLink as Link } from "@/components/site-link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, ChartNoAxesCombined, Check, FileText, Globe2, KanbanSquare, NotebookPen, ShieldCheck, SlidersHorizontal, type LucideIcon } from "lucide-react";
import { ProductProgress } from "@/components/product-motion";
import { Reveal } from "@/components/reveal";
import { AppLink } from "@/components/ui";
import { FaqAccordion } from "@/components/faq-accordion";
import { productPages } from "@/lib/product-pages";
import "./detail-editorial.css";

type Props = { params: Promise<{ slug: string }> };
const artwork: Record<string, { alt: string; icon: LucideIcon }> = {
  "job-management": { alt: "A recruiter creating a job opening", icon: BriefcaseBusiness },
  "career-pages": { alt: "A candidate discovering a branded career page", icon: Globe2 },
  "applicant-tracking": { alt: "Hiring teammates organizing a candidate pipeline", icon: KanbanSquare },
  "resume-parsing": { alt: "A recruiter organizing resume details into a profile", icon: FileText },
  "candidate-scoring": { alt: "A hiring manager comparing candidate profiles", icon: SlidersHorizontal },
  "candidate-notes": { alt: "Colleagues recording candidate review notes", icon: NotebookPen },
  "role-based-access": { alt: "A hiring team coordinating access to shared information", icon: ShieldCheck },
  "hiring-analytics": { alt: "HR teammates reviewing a hiring funnel", icon: ChartNoAxesCombined },
};
export const dynamicParams = false;
export function generateStaticParams() { return productPages.map(page => ({ slug: page.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = productPages.find(page => page.slug === slug);
  if (!page) return {};
  return { title: page.name, description: page.intro, alternates: { canonical: `/features/${slug}` }, openGraph: { title: `${page.name} | Wellgenz`, description: page.intro, url: `/features/${slug}` } };
}
export default async function ProductDetail({ params }: Props) {
  const { slug } = await params;
  const page = productPages.find(page => page.slug === slug);
  if (!page) notFound();
  const index = productPages.indexOf(page);
  const related = [productPages[(index + 1) % productPages.length], productPages[(index + 2) % productPages.length]];
  const art = artwork[slug];
  const Icon = art.icon;
  return <main id="main" className="product-pages feature-editorial" data-feature={slug}>
    <ProductProgress/>
    <div className="container">
      <nav className="fd-breadcrumb" aria-label="Breadcrumb"><Link href="/features">The toolkit</Link><span aria-hidden="true">/</span><span aria-current="page">{page.name}</span></nav>
      <nav className="fd-feature-nav" aria-label="Feature pages">{productPages.map(item => <Link key={item.slug} href={`/features/${item.slug}`} aria-current={item.slug === slug ? "page" : undefined}>{item.name}</Link>)}</nav>
      <section className="fd-hero">
        <Reveal className="fd-hero-copy"><p className="eyebrow"><span aria-hidden="true"/>{page.category}</p><h1>{page.title}</h1><p className="fd-lede">{page.intro}</p><div className="fd-actions"><AppLink>Access Dashboard</AppLink><a href="#feature-details">Explore the details<ArrowDown size={16} aria-hidden="true"/></a></div></Reveal>
        <Reveal className="fd-hero-art"><div className="fd-illustration"><div className="fd-art-label"><Icon size={17} strokeWidth={1.5} aria-hidden="true"/><span>wellgenz / {page.name.toLowerCase()}</span></div><Image src={`/images/feature-${slug}-sketch.webp`} alt={art.alt} width={1200} height={800} priority sizes="(max-width: 759px) 90vw, 48vw"/></div><span className="fd-art-note"><Check size={15} aria-hidden="true"/>{page.visual[0]}</span></Reveal>
      </section>
      <section id="feature-details" className="fd-details">
        <Reveal className="fd-section-heading"><p className="eyebrow"><span aria-hidden="true"/>The details, connected</p><h2>{page.summary}</h2></Reveal>
        <div className="fd-detail-rows">{page.sections.map((section,i) => <Reveal key={section.title} className={`fd-detail-row fd-detail-tone-${i}`} delay={.03*i}><div className="fd-detail-title"><span className="fd-step-number">0{i+1}</span><h3>{section.title}</h3></div><div className="fd-detail-body"><p>{section.body}</p><ul>{section.points.map(point => <li key={point}><Check size={15} aria-hidden="true"/>{point}</li>)}</ul></div></Reveal>)}</div>
      </section>
      <section className="fd-workflow"><Reveal className="fd-section-heading"><p className="eyebrow"><span aria-hidden="true"/>How it works</p><h2>A clear path to the next step.</h2></Reveal><ol>{page.workflow.map((step,i) => <li key={step.title}><Reveal className="fd-workflow-card" delay={i*.07}><span>0{i+1}</span><h3>{step.title}</h3><p>{step.text}</p><ArrowRight size={19} strokeWidth={1.4} aria-hidden="true"/></Reveal></li>)}</ol></section>
      <section className="fd-practice"><Reveal className="fd-practice-layout"><div className="fd-practice-label"><span><Icon size={29} strokeWidth={1.3} aria-hidden="true"/></span><p className="eyebrow">In practice</p><h3>{page.useCase.team}</h3><small>Illustrative scenario</small></div><div className="fd-practice-copy"><h2>{page.useCase.title}</h2><p>{page.useCase.text}</p></div></Reveal></section>
      <section className="fd-questions"><Reveal className="fd-section-heading"><p className="eyebrow"><span aria-hidden="true"/>A little more clarity</p><h2>Good questions.<br/><em>Useful answers.</em></h2></Reveal><Reveal className="fd-faq"><FaqAccordion items={page.questions} defaultFirstOpen/></Reveal></section>
      <section className="fd-related"><Reveal className="fd-related-heading"><h2>Keep the journey connected.</h2><Link href="/features">All features<ArrowUpRight size={16} aria-hidden="true"/></Link></Reveal><div className="fd-related-grid">{related.map((item,i) => { const RelatedIcon = artwork[item.slug].icon; return <Reveal key={item.slug} delay={i*.06}><Link href={`/features/${item.slug}`} className="fd-related-card"><span className="fd-related-icon"><RelatedIcon size={24} strokeWidth={1.4} aria-hidden="true"/></span><div><h3>{item.name}</h3><p>{item.summary}</p></div><ArrowUpRight size={20} aria-hidden="true"/></Link></Reveal>;})}</div></section>
      <Reveal className="fd-end"><div><p className="eyebrow"><span aria-hidden="true"/>Your next chapter</p><h2>Make room for<br/><em>better hiring conversations.</em></h2><p>Explore {page.name.toLowerCase()} as part of the connected Wellgenz recruitment workspace.</p></div><div className="fd-end-actions"><AppLink light>Access Dashboard</AppLink><Link href="/features">Explore all features<ArrowRight size={16} aria-hidden="true"/></Link></div></Reveal>
    </div>
  </main>;
}

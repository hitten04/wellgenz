import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Sparkles } from "lucide-react";
import { AppLink } from "@/components/ui";
import { productPages } from "@/lib/product-pages";

type Props = { params: Promise<{ slug: string }> };
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
  return <main id="main" className="product-pages"><div className="container">
    <nav className="product-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/features">Features</Link><span>/</span><span aria-current="page">{page.name}</span></nav>
    <nav className="product-section-nav" aria-label="Feature pages">{productPages.map(item => <Link key={item.slug} href={`/features/${item.slug}`} aria-current={item.slug === slug ? "page" : undefined}>{item.name}</Link>)}</nav>
    <section className="product-detail-hero"><div><p className="eyebrow"><span />{page.category}</p><h1>{page.title}</h1><p className="product-lede">{page.intro}</p><div className="product-actions"><AppLink>Access Dashboard</AppLink><a href="#capability-details">Explore the details <ArrowRight size={15}/></a></div></div>
      <figure className={`product-concept product-tone-${index % 3}`}><div className="product-concept-heading"><span>wellgenz<span>.</span></span><Sparkles size={21}/></div><span className="product-concept-label">{page.name}</span><div className="product-concept-steps">{page.visual.map((step, i) => <div key={step}><span>{String(i + 1).padStart(2, "0")}</span><strong>{step}</strong><Check size={16}/></div>)}</div><figcaption>Illustrative workflow</figcaption></figure>
    </section>
    <section id="capability-details" className="product-detail-section"><div className="product-section-heading"><span className="eyebrow">THE DETAILS</span><h2>{page.summary}</h2></div><div className="product-detail-grid">{page.sections.map((section, i) => <article key={section.title}><span className="product-detail-number">0{i + 1}</span><h3>{section.title}</h3><p>{section.body}</p><ul>{section.points.map(point => <li key={point}><Check size={15}/>{point}</li>)}</ul></article>)}</div></section>
    <section className="product-how"><div><p className="eyebrow"><span />HOW IT WORKS</p><h2>A clear path<br />to the next step.</h2></div><ol>{page.workflow.map((step, i) => <li key={step.title}><span>0{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></section>
    <section className="product-use-case"><div><span className="eyebrow">IN PRACTICE</span><p>{page.useCase.team}</p></div><div><h2>{page.useCase.title}</h2><p>{page.useCase.text}</p><small>Illustrative scenario</small></div></section>
    <section className="product-questions"><div><p className="eyebrow"><span />A LITTLE MORE CLARITY</p><h2>Good questions.<br />Useful answers.</h2></div><div className="faq-list">{page.questions.map(faq => <details key={faq.question}><summary>{faq.question}<ChevronDown size={18}/></summary><p>{faq.answer}</p></details>)}</div></section>
    <section className="product-related"><div className="product-related-title"><h2>Keep the journey connected.</h2><Link href="/features">All features <ArrowRight size={15}/></Link></div><div>{related.map(item => <Link href={`/features/${item.slug}`} key={item.slug}><span>{item.category}<ArrowUpRight size={18}/></span><h3>{item.name}</h3><p>{item.summary}</p></Link>)}</div></section>
    <section className="product-end"><p className="eyebrow"><span />YOUR NEXT CHAPTER</p><h2>Make room for better hiring conversations.</h2><p>Explore {page.name.toLowerCase()} as part of the connected Wellgenz recruitment workspace.</p><AppLink light>Access Dashboard</AppLink><Link href="/features">Explore all features <ArrowRight size={15}/></Link></section>
  </div></main>;
}

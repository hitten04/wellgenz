import type { Metadata } from "next";
import Image from "next/image";
import { SiteLink as Link } from "@/components/site-link";
import { ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, ChartNoAxesCombined, Check, FileText, Globe2, KanbanSquare, NotebookPen, ShieldCheck, SlidersHorizontal, type LucideIcon } from "lucide-react";
import { AppLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ProductProgress } from "@/components/product-motion";
import { productPages } from "@/lib/product-pages";
import "./overview.css";

export const metadata: Metadata = {
  title: "Recruitment features", description: "Explore Wellgenz job management, career pages, applicant tracking, AI resume parsing, candidate scoring, notes, role-based access, and hiring analytics.",
  alternates: { canonical: "/features" }, openGraph: { title: "Recruitment features | Wellgenz", description: "Explore the tools behind a connected hiring journey.", url: "/features" },
};

const groups = [
  { id: "attract", label: "Publish & attract", title: "Open the door to your next hire.", text: "Give every opportunity a clear starting point and a recognizable home.", slugs: ["job-management", "career-pages"] },
  { id: "understand", label: "Understand & evaluate", title: "Find the fit. Keep the context.", text: "Turn resumes into useful information and connect your review to the role.", slugs: ["resume-parsing", "candidate-scoring"] },
  { id: "organize", label: "Organize & collaborate", title: "Keep the person in the process.", text: "Bring progress, observations, and the next conversation together.", slugs: ["applicant-tracking", "candidate-notes"] },
  { id: "coordinate", label: "Coordinate & see clearly", title: "A clearer view for the whole team.", text: "Give colleagues the access and visibility they need to keep hiring moving.", slugs: ["role-based-access", "hiring-analytics"] },
];
const featureIcons: Record<string, LucideIcon> = {
  "job-management": BriefcaseBusiness, "career-pages": Globe2, "resume-parsing": FileText, "candidate-scoring": SlidersHorizontal,
  "applicant-tracking": KanbanSquare, "candidate-notes": NotebookPen, "role-based-access": ShieldCheck, "hiring-analytics": ChartNoAxesCombined,
};

export default function FeatureDirectory() {
  return <main id="main" className="product-pages feature-overview">
    <ProductProgress/>
    <section className="fo-hero"><div className="container fo-hero-grid">
      <Reveal className="fo-hero-copy"><p className="eyebrow"><span aria-hidden="true"/>The Wellgenz toolkit</p><h1>Less scattered work.<br/><em>More connected hiring.</em></h1><p className="fo-lede">From publishing the opening to understanding the hiring funnel. Explore how each part of Wellgenz helps your team organize the work and keep people in context.</p><div className="fo-actions"><AppLink>Access Dashboard</AppLink><a href="#capabilities">Explore the toolkit<ArrowDown size={16} aria-hidden="true"/></a></div><p className="fo-hero-note">Eight capabilities. One recruitment journey.</p></Reveal>
      <Reveal className="fo-hero-art"><div className="fo-art-frame"><Image src="/images/features-connected-sketch.webp" alt="Recruiters and a candidate connecting job opportunities, profiles, and conversations" width={1200} height={800} priority sizes="(max-width: 759px) 90vw, 50vw"/></div><span className="fo-art-note"><Check size={17} aria-hidden="true"/>People first. Process connected.</span></Reveal>
    </div></section>
    <div className="container">
      <nav className="fo-journey-nav" aria-label="Explore feature categories">{groups.map((group,index) => <a key={group.id} href={`#${group.id}`}><span>0{index+1}</span>{group.label}<ArrowDown size={15} aria-hidden="true"/></a>)}</nav>
      <div id="capabilities" className="fo-capabilities">
        {groups.map((group,index) => <section className={`fo-group fo-group-${group.id}`} id={group.id} aria-labelledby={`heading-${group.id}`} key={group.id}>
          <Reveal className="fo-group-heading"><span className="fo-group-number" aria-hidden="true">0{index+1}</span><div><p className="fo-kicker">{group.label}</p><h2 id={`heading-${group.id}`}>{group.title}</h2><p>{group.text}</p></div></Reveal>
          <div className="fo-card-grid">{productPages.filter(page => group.slugs.includes(page.slug)).map((page,cardIndex) => {
            const Icon = featureIcons[page.slug];
            return <Reveal key={page.slug} delay={cardIndex*.07}><Link className="fo-feature-card" href={`/features/${page.slug}`}><div className="fo-card-top"><span className="fo-feature-icon"><Icon size={28} strokeWidth={1.35} aria-hidden="true"/></span><span className="fo-card-index">THE TOOLKIT / {String(productPages.indexOf(page)+1).padStart(2,"0")}</span></div><h3>{page.name}</h3><p>{page.intro}</p><ul>{page.visual.slice(0,2).map(item => <li key={item}><Check size={14} aria-hidden="true"/>{item}</li>)}</ul><span className="fo-card-link">Explore {page.name.toLowerCase()}<ArrowUpRight size={18} aria-hidden="true"/></span></Link></Reveal>;
          })}</div>
        </section>)}
      </div>
      <Reveal className="fo-connected-note"><span><ArrowRight size={24} strokeWidth={1.4} aria-hidden="true"/></span><div><h2>The next conversation stays connected, too.</h2><p>Schedule Google Meet or Zoom interviews and follow through with shortlist updates, offer-letter emails, and rejection messages.</p></div><Link href="/how-it-works">See the full journey<ArrowUpRight size={17} aria-hidden="true"/></Link></Reveal>
      <Reveal className="fo-closing"><div><p className="eyebrow"><span aria-hidden="true"/>Built around your people</p><h2>One workspace.<br/><em>Room for better hiring.</em></h2><p>Publish roles, organize applications, review candidate context, and keep the next conversation moving in one hiring workspace.</p></div><div className="fo-closing-actions"><AppLink light>Access Dashboard</AppLink><Link href="/">Back to the homepage<ArrowRight size={16} aria-hidden="true"/></Link></div></Reveal>
    </div>
  </main>;
}

"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, BriefcaseBusiness, ChartNoAxesCombined, ChevronDown, FileText, Globe2, KanbanSquare, NotebookPen, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { SiteLink as Link } from "./site-link";
import "./header-features.css";

const features = [
  { slug: "job-management", name: "Job management", description: "Create, edit, and publish open roles.", icon: BriefcaseBusiness },
  { slug: "career-pages", name: "Branded career pages", description: "Give your opportunities a branded home.", icon: Globe2 },
  { slug: "applicant-tracking", name: "Applicant tracking", description: "Keep every applicant’s next step clear.", icon: KanbanSquare },
  { slug: "resume-parsing", name: "AI resume parsing", description: "Turn resumes into useful candidate profiles.", icon: FileText },
  { slug: "candidate-scoring", name: "Candidate scoring", description: "Compare experience with role criteria.", icon: SlidersHorizontal },
  { slug: "candidate-notes", name: "Candidate notes", description: "Keep your team’s observations connected.", icon: NotebookPen },
  { slug: "role-based-access", name: "Role-based access", description: "Manage who can view and edit hiring.", icon: ShieldCheck },
  { slug: "hiring-analytics", name: "Hiring analytics", description: "See hiring counts and the recruitment funnel.", icon: ChartNoAxesCombined },
];

export function HeaderFeatures({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const links = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (mobile || !expanded) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setExpanded(false);
    };
    const compact = window.matchMedia("(max-width: 1100px)");
    const resize = () => { if (compact.matches) setExpanded(false); };
    document.addEventListener("pointerdown", outside);
    compact.addEventListener("change", resize);
    return () => { document.removeEventListener("pointerdown", outside); compact.removeEventListener("change", resize); };
  }, [expanded, mobile]);

  function keydown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && expanded) {
      event.preventDefault(); event.stopPropagation(); setExpanded(false); toggle.current?.focus();
    } else if ((event.key === "ArrowDown" || event.key === "ArrowUp") && !links.current?.contains(event.target as Node)) {
      event.preventDefault(); setExpanded(true);
      const last = event.key === "ArrowUp";
      requestAnimationFrame(() => {
        const items = links.current?.querySelectorAll<HTMLAnchorElement>("a");
        if (items?.length) items[last ? items.length - 1 : 0].focus();
      });
    }
  }
  function navigate() { setExpanded(false); onNavigate?.(); }

  if (mobile) return <details className="mobile-features"><summary>Features<ChevronDown size={17} aria-hidden="true"/></summary><nav className="mobile-feature-list" aria-label="Mobile feature pages"><Link href="/features" className="mobile-feature-overview" onClick={onNavigate}>Explore all features<ArrowUpRight size={16} aria-hidden="true"/></Link>{features.map(feature => <Link key={feature.slug} href={`/features/${feature.slug}`} onClick={onNavigate}><feature.icon size={18} strokeWidth={1.5} aria-hidden="true"/><span>{feature.name}</span><ArrowUpRight size={14} aria-hidden="true"/></Link>)}</nav></details>;

  return <div className="header-features" ref={root} onPointerEnter={event => { if (event.pointerType === "mouse") setExpanded(true); }} onPointerLeave={() => { if (!root.current?.contains(document.activeElement)) setExpanded(false); }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false); }} onKeyDown={keydown}>
    <div className="header-features-trigger"><Link href="/features" onFocus={() => setExpanded(true)} onClick={navigate}>Features</Link><button ref={toggle} type="button" aria-label="Toggle feature pages" aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(value => !value)}><ChevronDown size={14} aria-hidden="true"/></button></div>
    <div id={id} className="features-dropdown" ref={links} hidden={!expanded}>
      <div className="features-dropdown-heading"><div><span>The Wellgenz toolkit</span><p>A closer look at connected hiring.</p></div><Link href="/features" onClick={navigate}>All features<ArrowUpRight size={14} aria-hidden="true"/></Link></div>
      <nav className="features-dropdown-grid" aria-label="Feature pages">{features.map(feature => <Link key={feature.slug} href={`/features/${feature.slug}`} onClick={navigate}><span className="features-dropdown-icon"><feature.icon size={21} strokeWidth={1.45} aria-hidden="true"/></span><span className="features-dropdown-copy"><strong>{feature.name}</strong><span>{feature.description}</span></span><ArrowUpRight className="features-dropdown-arrow" size={15} aria-hidden="true"/></Link>)}</nav>
      <div className="features-dropdown-note"><span>From the first application to the next chapter.</span><Link href="/how-it-works" onClick={navigate}>How it works<ArrowUpRight size={13} aria-hidden="true"/></Link></div>
    </div>
  </div>;
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, ChartNoAxesCombined, Check, ShieldCheck, SlidersHorizontal, Sparkles, UsersRound } from "lucide-react";
import { AppLink, SectionHeading } from "@/components/ui";
import { PipelineVisual } from "@/components/product-visuals";
import { MatchingDemo } from "@/components/matching-demo";
import { HomeHeroArt } from "@/components/home-hero-art";
import { HiringStudio } from "@/components/hiring-studio";
import { ConnectedWorkflow } from "@/components/connected-workflow";
import { HomeAudiences } from "@/components/home-audiences";
import { Reveal } from "@/components/reveal";
import { HomeMotion } from "@/components/home-motion";
import { HomeFaq } from "@/components/home-faq";
import { ProductProgress } from "@/components/product-motion";
import "./home-refresh.css";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const steps = [
  { number: "01", title: "Open the door", text: "Define the role and matching requirements. Publish it to your branded career page in one click.", art: "workflow-publish", outcome: "Your opportunity, ready to share." },
  { number: "02", title: "Bring people in", text: "Collect applications from your career page or hiring inbox. Turn resumes into structured profiles.", art: "workflow-applications", outcome: "Every applicant, with context." },
  { number: "03", title: "Find the fit", text: "Compare skills, experience, and education. Set a shortlist threshold and review the people behind the scores.", art: "workflow-review", outcome: "AI assistance. Human judgment." },
  { number: "04", title: "Take the next step", text: "Schedule a Meet or Zoom interview. Follow through with shortlist updates, offers, and rejection emails.", art: "workflow-interview", outcome: "A connected journey to the decision." },
];
const essentials = [
  { icon: BriefcaseBusiness, title: "A home for every role.", text: "Create, edit, and publish jobs. Keep each opening’s requirements and matching rules together.", link: "/features/job-management", label: "Job management", tint: "peach" },
  { icon: ShieldCheck, title: "A team on the same page.", text: "Keep candidate notes close to the application. Control who can view and edit hiring with role-based access.", link: "/features/role-based-access", label: "Team collaboration", tint: "lilac" },
  { icon: ChartNoAxesCombined, title: "The bigger picture, too.", text: "See hiring counts, upcoming interviews, and the recruitment funnel without losing sight of individual people.", link: "/features/hiring-analytics", label: "Hiring analytics", tint: "ivory" },
];

export default function Home() {
  return <HomeMotion><main id="main" className="wellgenz-home">
    <ProductProgress />
    <section id="top" className="hero section-anchor home-editorial-hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true" />People first. Process connected.</p>
          <h1>Great <span>hiring.</span><br />Less busywork.</h1>
          <p className="hero-description">From the first resume to the final offer. Publish jobs, match candidates, schedule interviews, and automate hiring emails in one workspace.</p>
          <div className="hero-actions"><AppLink>Access Dashboard</AppLink><a className="text-link" href="#how-it-works">See how it works <ArrowDown size={16} aria-hidden="true" /></a></div>
          <div className="hero-capabilities"><span>AI matching</span><span>Meet + Zoom</span><span>Hiring emails</span></div>
          <p className="hero-footnote">AI-powered. Human-led.</p>
        </div>
        <HomeHeroArt />
      </div>
    </section>

    <section id="features" className="section section-anchor home-features">
      <div className="container">
        <Reveal className="home-centered-heading"><SectionHeading eyebrow="Your hiring day, connected" title={<>Less chasing.<br /><span>More connecting.</span></>}>The practical work of recruitment, brought together. Explore what a more connected hiring flow can look like.</SectionHeading></Reveal>
        <Reveal><HiringStudio /></Reveal>
        <div className="home-essentials">{essentials.map((item,index)=><Reveal key={item.title} delay={index*.06}><Link className={`home-essential home-essential-${item.tint}`} href={item.link}><item.icon size={24} strokeWidth={1.4} aria-hidden="true"/><h3>{item.title}</h3><p>{item.text}</p><span>{item.label}<ArrowUpRight size={16} aria-hidden="true"/></span></Link></Reveal>)}</div>
      </div>
    </section>

    <section id="how-it-works" className="section workflow-section section-anchor editorial-workflow home-journey">
      <div className="container">
        <Reveal className="home-centered-heading"><SectionHeading eyebrow="From hello to hired" title={<>One role.<br /><span>One connected journey.</span></>}>Start with an opening. Keep the people, decisions, and next steps connected all the way through.</SectionHeading></Reveal>
        <div className="steps editorial-steps">{steps.map((step,index)=><Reveal className="step" key={step.number} delay={index*.07}><div className="step-top"><span>{step.number}</span><span className="journey-sketch" aria-hidden="true"><Image src={`/images/${step.art}.webp`} alt="" width={256} height={256} sizes="140px"/></span></div><h3>{step.title}</h3><p>{step.text}</p><div className="step-outcome"><Check size={14} aria-hidden="true"/><span>{step.outcome}</span></div></Reveal>)}</div>
        <Link href="/how-it-works" className="home-section-link">Walk through the process<ArrowUpRight size={17} aria-hidden="true"/></Link>
      </div>
    </section>

    <section id="ai-matching" className="section matching-section section-anchor home-matching">
      <div className="container">
        <div className="home-story-grid">
          <Reveal><SectionHeading light eyebrow="Intelligence with intention" title={<>Less sifting.<br /><span>More seeing potential.</span></>}>Match applicants against what your role actually needs. Explore the evidence behind each score before choosing the next conversation.</SectionHeading><div className="home-matching-principles"><span><SlidersHorizontal size={17} aria-hidden="true"/>Your criteria. Your weights.</span><span><Sparkles size={17} aria-hidden="true"/>Your shortlist threshold.</span><span><UsersRound size={17} aria-hidden="true"/>Your team makes the call.</span></div></Reveal>
          <Reveal className="home-art home-matching-art"><Image src="/images/matching-human.webp" alt="A recruiter thoughtfully reviewing a single candidate resume" width={1536} height={1024} sizes="(max-width: 759px) 90vw, 45vw"/></Reveal>
        </div>
        <Reveal className="home-demo-wrap"><MatchingDemo /></Reveal>
      </div>
    </section>

    <section id="pipeline" className="section pipeline-section section-anchor home-pipeline">
      <div className="container">
        <div className="home-story-grid home-pipeline-story">
          <Reveal className="home-art"><Image src="/images/hiring-pipeline.webp" alt="Hiring teammates arranging candidate cards across a recruitment board" width={1536} height={1024} sizes="(max-width: 759px) 90vw, 45vw"/></Reveal>
          <Reveal><SectionHeading eyebrow="Every person. Every stage." title={<>See the journey.<br /><span>Know what’s next.</span></>}>From new applications to interviews, offers, and hiring outcomes, a clear Kanban pipeline keeps your team focused on the next step.</SectionHeading><ul className="home-checks"><li><Check size={16} aria-hidden="true"/>Candidate profiles and notes in context</li><li><Check size={16} aria-hidden="true"/>Clear stages from applied to hired</li><li><Check size={16} aria-hidden="true"/>Progress connected to candidate communication</li></ul><Link className="home-section-link" href="/features/applicant-tracking">Explore applicant tracking<ArrowUpRight size={17} aria-hidden="true"/></Link></Reveal>
        </div>
        <Reveal className="home-pipeline-board"><PipelineVisual /></Reveal>
      </div>
    </section>

    <ConnectedWorkflow />

    <section id="why-wellgenz" className="section benefits-section section-anchor home-audiences">
      <div className="container">
        <Reveal className="home-centered-heading"><SectionHeading eyebrow="Built around your people" title={<>For the people<br /><span>bringing people together.</span></>}>Whether you coordinate the process, review the fit, or build the team, make room for the work that matters.</SectionHeading></Reveal>
        <Reveal><HomeAudiences /></Reveal>
        <Link href="/why-wellgenz" className="home-section-link">Why teams choose a connected approach<ArrowUpRight size={17} aria-hidden="true"/></Link>
      </div>
    </section>

    <section id="faqs" className="section faq-section section-anchor home-faq-section">
      <div className="container"><Reveal className="home-centered-heading"><SectionHeading eyebrow="A little more clarity" title={<>Good questions.<br /><span>Clear answers.</span></>}>The essentials about your hiring workflow, AI assistance, and getting started.</SectionHeading></Reveal><Reveal><HomeFaq /></Reveal></div>
    </section>

    <section className="section home-final-section">
      <div className="container"><Reveal className="home-final-card"><div className="home-final-copy"><p className="eyebrow"><span aria-hidden="true"/>People today. Possibilities tomorrow.</p><h2>Make room for<br/><em>better hiring.</em></h2><p>Let the process support your people. Bring jobs, candidates, conversations, and follow-through into one connected workspace.</p><AppLink light>Access Dashboard</AppLink><Link href="/contact-us" className="home-final-contact">Have a question? Let’s talk<ArrowUpRight size={15} aria-hidden="true"/></Link></div><div className="home-final-art home-final-ink"><Image src="/images/possibilities-ink.webp" alt="" width={1536} height={1024} sizes="(max-width: 759px) 85vw, 45vw"/><span>Good process.<br/>Great possibilities.</span></div></Reveal></div>
    </section>
  </main></HomeMotion>;
}

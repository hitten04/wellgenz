import type { Metadata } from "next";
import Image from "next/image";
import { SiteLink as Link } from "@/components/site-link";
import { ArrowDown, ArrowUpRight, Check, SlidersHorizontal, Sparkles, UsersRound } from "lucide-react";
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
import "./home-hero-3d.css";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const steps = [
  { number: "01", title: "Open the door", text: "Define the role and matching requirements. Publish it to your branded career page in one click.", art: "workflow-publish", outcome: "Your opportunity, ready to share." },
  { number: "02", title: "Bring people in", text: "Collect applications from your career page or hiring inbox. Turn resumes into structured profiles.", art: "workflow-applications", outcome: "Every applicant, with context." },
  { number: "03", title: "Find the fit", text: "Compare skills, experience, and education. Set a shortlist threshold and review the people behind the scores.", art: "workflow-review", outcome: "AI assistance. Human judgment." },
  { number: "04", title: "Take the next step", text: "Schedule a Meet or Zoom interview. Follow through with shortlist updates, offers, and rejection emails.", art: "workflow-interview", outcome: "A connected journey to the decision." },
];


export default function Home() {
  return <HomeMotion><main id="main" className="wellgenz-home">
    <ProductProgress />
    <section id="top" className="hero section-anchor home-spatial-hero">
      <div className="container hero-grid">
        <div className="hero-copy spatial-hero-copy">
          <p className="spatial-hero-eyebrow"><span aria-hidden="true"/>THE HUMAN SIDE OF HIRING</p>
          <h1>Great people.<br/><span>A clearer way</span><br/>to hire.</h1>
          <p className="hero-description">Bring your hiring day together. From the first resume to the final offer, make room for the people behind every application.</p>
          <div className="hero-actions"><AppLink>Access Dashboard</AppLink><a className="spatial-hero-secondary" href="#how-it-works"><span>See how it works</span><ArrowDown size={16} aria-hidden="true"/></a></div>
          <div className="spatial-hero-capabilities" aria-label="Connected hiring capabilities"><span><Check size={14} aria-hidden="true"/>AI matching</span><span><Check size={14} aria-hidden="true"/>Meet + Zoom</span><span><Check size={14} aria-hidden="true"/>Hiring emails</span></div>
        </div>
        <HomeHeroArt />
      </div>
    </section>

    <section id="features" className="section section-anchor home-features">
      <div className="container">
        <Reveal className="home-centered-heading"><SectionHeading eyebrow="Your hiring day, connected" title={<>Less chasing.<br /><span>More connecting.</span></>}>The practical work of recruitment, brought together. Explore what a more connected hiring flow can look like.</SectionHeading></Reveal>
        <Reveal><HiringStudio /></Reveal>

      </div>
    </section>

    <section id="how-it-works" className="section workflow-section section-anchor editorial-workflow home-journey">
      <div className="container">
        <Reveal className="home-centered-heading"><SectionHeading eyebrow="From hello to hired" title={<>One role.<br /><span>One connected journey.</span></>}>Start with an opening. Keep the people, decisions, and next steps connected all the way through.</SectionHeading></Reveal>
        <ol className="journey-grid">
          {steps.map((step, index) => <li key={step.number}>
            <Reveal className="journey-card" delay={(index % 2) * .08}>
              <span className="journey-number" aria-hidden="true">{step.number}</span>
              <div className="journey-card-art" aria-hidden="true">
                <Image src={`/images/${step.art}.webp`} alt="" width={256} height={256} sizes="(max-width: 599px) 128px, 176px" />
              </div>
              <div className="journey-card-copy"><h3>{step.title}</h3><p>{step.text}</p></div>
              <div className="journey-card-outcome"><Check size={16} aria-hidden="true" /><span>{step.outcome}</span></div>
            </Reveal>
          </li>)}
        </ol>
        <Link href="/how-it-works" className="home-section-link">Walk through the process<ArrowUpRight size={17} aria-hidden="true"/></Link>
      </div>
    </section>

    <section id="ai-matching" className="section matching-section section-anchor home-matching">
      <div className="container">
        <div className="home-story-grid">
          <Reveal><SectionHeading light eyebrow="Intelligence with intention" title={<>Less sifting.<br /><span>More seeing potential.</span></>}>Match applicants against what your role actually needs. Explore the evidence behind each score before choosing the next conversation.</SectionHeading><div className="home-matching-principles"><span><SlidersHorizontal size={17} aria-hidden="true"/>Your criteria. Your weights.</span><span><Sparkles size={17} aria-hidden="true"/>Your shortlist threshold.</span><span><UsersRound size={17} aria-hidden="true"/>Your team makes the call.</span></div></Reveal>
          <Reveal className="matching-paper-scene">
            <div className="matching-paper-frame"><Image src="/images/matching-portrait.webp" alt="A calm recruiter with folded arms, drawn in a simple ink illustration" width={1024} height={1280} sizes="(max-width: 759px) 90vw, 45vw"/></div>
            <div className="matching-paper-notes">
              <div className="matching-paper-note matching-note-criteria"><span><SlidersHorizontal size={19} aria-hidden="true"/></span><div><strong>Your criteria, connected.</strong><p>Skills, experience &amp; education.</p></div></div>
              <div className="matching-paper-note matching-note-evidence"><span><Check size={19} aria-hidden="true"/></span><div><strong>A clearer shortlist.</strong><p>Review the evidence behind the score.</p></div></div>
              <div className="matching-paper-note matching-note-judgment"><span><UsersRound size={19} aria-hidden="true"/></span><div><strong>Your team makes the call.</strong><p>AI assistance. Human judgment.</p></div></div>
            </div>
          </Reveal>
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

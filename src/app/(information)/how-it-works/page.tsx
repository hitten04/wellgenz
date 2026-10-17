import { ClosingCTA } from "@/components/closing-cta";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-seo";
import Image from "next/image";
import { SiteLink as Link } from "@/components/site-link";
import { ArrowDown, ArrowUpRight, Check, Mail, Globe2 } from "lucide-react";
import { AppLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ProductProgress } from "@/components/product-motion";
import { JourneyVisual } from "./journey-visual";
import "./journey.css";

export const metadata: Metadata = pageMetadata("/how-it-works");
const steps = [
  { title: "Define the opportunity.", text: "Start by describing the position and its responsibilities. Add the skills, experience, and education requirements, then choose the matching rules reviewers will use for this opening.", href: "job-management", link: "Explore job management" },
  { title: "Publish it in your company’s voice.", text: "Once the brief is ready, publish the position to your company career page in one click. Share the public careers link so candidates can find the vacancy without a separate website update.", href: "career-pages", link: "Explore career pages" },
  { title: "Turn applications into context.", text: "Applications arrive through the career portal or supported email resume submissions. AI parsing extracts candidate details into profiles; check the information before using it to assess suitability.", href: "resume-parsing", link: "Explore resume parsing" },
  { title: "Build a considered shortlist.", text: "Review match scores against the requirements you set in step one. Use a job-specific threshold to organize the shortlist, then examine relevant skills and experience before deciding whom to meet.", href: "candidate-scoring", link: "Explore candidate scoring" },
  { title: "Coordinate the conversation.", text: "Move shortlisted applicants to interview and choose Google Meet or Zoom. Set the interviewer, date, time, and meeting link, then use candidate notes to prepare the discussion and hiring emails to share details.", href: "applicant-tracking", link: "Explore applicant tracking" },
  { title: "Close the loop with clarity.", text: "After the team reaches a decision, send the appropriate offer-letter or rejection email and update the application stage. Review dashboard counts and the funnel to plan follow-up across the remaining openings.", href: "hiring-analytics", link: "Explore hiring analytics" },
];
const chapters = ["Define", "Publish", "Understand", "Shortlist", "Connect", "Follow through"];
const outcomes = ["A shared brief for your hiring team.", "A public home for every opportunity.", "Useful context from each application.", "A shortlist ready for team assessment.", "People and details in the same conversation.", "A clear next step, through the final update."];

export default function HowItWorks() {
  return <main id="main" className="product-pages how-editorial"><ProductProgress/>
    <section className="hiw-hero"><div className="container">
      <Reveal className="hiw-hero-copy"><p className="eyebrow"><span aria-hidden="true"/>From first application to next chapter</p><h1>How hiring works.<br/><em>From role to offer.</em></h1><p>Follow the six steps of a Wellgenz recruitment workflow. Each step explains what your team sets up, what candidates experience, and which information moves forward.</p><div className="hiw-hero-actions"><AppLink>Access Dashboard</AppLink><a href="#journey">Follow the journey<ArrowDown size={16} aria-hidden="true"/></a></div></Reveal>
      <Reveal className="hiw-mural" delay={.1}><Image src="/images/how-hiring-journey-transparent.webp" alt="A hiring team connecting a new opportunity, candidate review, and a welcoming conversation" width={1600} height={571} priority sizes="(max-width: 759px) calc(100vw - 32px), (max-width: 1368px) calc(100vw - 48px), 1320px"/><span className="hiw-mural-note"><Check size={16} aria-hidden="true"/>One role. Shared context.</span><span className="hiw-mural-note hiw-mural-note-right">People, at every step.</span></Reveal>
    </div></section>
    <div className="container">
      <section id="journey" className="hiw-journey" aria-label="The six-step recruitment journey"><ol>{steps.map((step,i) => <li className="hiw-chapter" id={`journey-${i+1}`} key={step.title}>
        <Reveal className="hiw-chapter-copy"><div className="hiw-chapter-kicker"><span>0{i+1}</span><p>{chapters[i]}</p></div><h2>{step.title}</h2><p className="hiw-chapter-description">{step.text}</p><Link href={`/features/${step.href}`} className="hiw-feature-link">{step.link}<ArrowUpRight size={17} aria-hidden="true"/></Link><p className="hiw-chapter-outcome"><Check size={14} aria-hidden="true"/>{outcomes[i]}</p></Reveal>
        <Reveal className="hiw-chapter-visual" delay={.08}><JourneyVisual stage={i}/></Reveal>
      </li>)}</ol></section>
      <section className="hiw-intake"><Reveal><p className="eyebrow"><span aria-hidden="true"/>Different starting points. Shared context.</p><h2>Two ways in.<br/><em>One connected process.</em></h2></Reveal><div className="hiw-intake-grid"><Reveal delay={.05}><Globe2 size={26} strokeWidth={1.4} aria-hidden="true"/><h3>Your career page</h3><p>Candidates discover published openings and apply through your branded company career portal.</p></Reveal><Reveal delay={.1}><Mail size={26} strokeWidth={1.4} aria-hidden="true"/><h3>Your hiring inbox</h3><p>Supported resume submissions by email enter the same recruitment journey, ready for review.</p></Reveal></div></section>
      <ClosingCTA art="how-it-works" title={<>Start with a role.<br/><em>Follow it through.</em></>} description="Put the six-step workflow into practice with your next job opening in the Wellgenz application."/>
    </div>
  </main>;
}

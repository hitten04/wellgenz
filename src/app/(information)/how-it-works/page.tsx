import { ClosingCTA } from "@/components/closing-cta";
import type { Metadata } from "next";
import Image from "next/image";
import { SiteLink as Link } from "@/components/site-link";
import { ArrowDown, ArrowUpRight, Check, Mail, Globe2 } from "lucide-react";
import { AppLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ProductProgress } from "@/components/product-motion";
import { JourneyVisual } from "./journey-visual";
import "./journey.css";

export const metadata: Metadata = { title: "How it works", description: "Follow the Wellgenz hiring journey from job publishing and incoming resumes to matching, interviews, communication, and hiring outcomes.", alternates: { canonical: "/how-it-works" }, openGraph: { title: "How Wellgenz works", url: "/how-it-works" } };
const steps = [
  { title: "Define the opportunity.", text: "Create a job post with the responsibilities and requirements that matter. Set job-specific matching rules for skills, experience, and education so candidate review begins with a clear brief.", href: "job-management", link: "Explore job management" },
  { title: "Publish it in your company’s voice.", text: "Publish the opening to your branded company career page in one click. Share the public careers link with potential applicants. Updates flow from the hiring workspace to the portal, without a separate website edit for each position.", href: "career-pages", link: "Explore career pages" },
  { title: "Turn applications into context.", text: "Welcome applications through the career portal and supported email resume submissions. AI resume parsing extracts candidate details into profiles, bringing skills and experience together for your team to review.", href: "resume-parsing", link: "Explore resume parsing" },
  { title: "Build a considered shortlist.", text: "Compare candidates with the criteria for their job. Configure a shortlisting threshold and review the matching evidence alongside the resume. A score supports the next conversation; your team makes the hiring decision.", href: "candidate-scoring", link: "Explore candidate scoring" },
  { title: "Coordinate the conversation.", text: "Move applicants through the pipeline and schedule online interviews with Google Meet or Zoom meeting links. Keep the interviewer, time, candidate notes, and next stage connected. Use hiring email automation for shortlist updates and interview communication.", href: "applicant-tracking", link: "Explore applicant tracking" },
  { title: "Close the loop with clarity.", text: "Continue the journey with offer letter emails or rejection messages. Keep the candidate’s stage current and use dashboard counts and the recruitment funnel to understand progress across your active openings.", href: "hiring-analytics", link: "Explore hiring analytics" },
];
const chapters = ["Define", "Publish", "Understand", "Shortlist", "Connect", "Follow through"];
const outcomes = ["A shared brief for your hiring team.", "A public home for every opportunity.", "Useful context from each application.", "AI assistance. Human judgment.", "People and details in the same conversation.", "A clear next step, through the final update."];

export default function HowItWorks() {
  return <main id="main" className="product-pages how-editorial"><ProductProgress/>
    <section className="hiw-hero"><div className="container">
      <Reveal className="hiw-hero-copy"><p className="eyebrow"><span aria-hidden="true"/>From first application to next chapter</p><h1>From a new opening<br/><em>to a new beginning.</em></h1><p>Recruitment works better when every step carries its context forward. Here is how Wellgenz connects publishing, applications, candidate review, interviews, and hiring communication.</p><div className="hiw-hero-actions"><AppLink>Access Dashboard</AppLink><a href="#journey">Follow the journey<ArrowDown size={16} aria-hidden="true"/></a></div></Reveal>
      <Reveal className="hiw-mural" delay={.1}><Image src="/images/how-hiring-journey-transparent.webp" alt="A hiring team connecting a new opportunity, candidate review, and a welcoming conversation" width={1600} height={571} priority sizes="(max-width: 759px) calc(100vw - 32px), (max-width: 1368px) calc(100vw - 48px), 1320px"/><span className="hiw-mural-note"><Check size={16} aria-hidden="true"/>One role. Shared context.</span><span className="hiw-mural-note hiw-mural-note-right">People, at every step.</span></Reveal>
    </div></section>
    <div className="container">
      <section id="journey" className="hiw-journey" aria-label="The six-step recruitment journey"><ol>{steps.map((step,i) => <li className="hiw-chapter" id={`journey-${i+1}`} key={step.title}>
        <Reveal className="hiw-chapter-copy"><div className="hiw-chapter-kicker"><span>0{i+1}</span><p>{chapters[i]}</p></div><h2>{step.title}</h2><p className="hiw-chapter-description">{step.text}</p><Link href={`/features/${step.href}`} className="hiw-feature-link">{step.link}<ArrowUpRight size={17} aria-hidden="true"/></Link><p className="hiw-chapter-outcome"><Check size={14} aria-hidden="true"/>{outcomes[i]}</p></Reveal>
        <Reveal className="hiw-chapter-visual" delay={.08}><JourneyVisual stage={i}/></Reveal>
      </li>)}</ol></section>
      <section className="hiw-intake"><Reveal><p className="eyebrow"><span aria-hidden="true"/>Different starting points. Shared context.</p><h2>Two ways in.<br/><em>One connected process.</em></h2></Reveal><div className="hiw-intake-grid"><Reveal delay={.05}><Globe2 size={26} strokeWidth={1.4} aria-hidden="true"/><h3>Your career page</h3><p>Candidates discover published openings and apply through your branded company career portal.</p></Reveal><Reveal delay={.1}><Mail size={26} strokeWidth={1.4} aria-hidden="true"/><h3>Your hiring inbox</h3><p>Supported resume submissions by email enter the same recruitment journey, ready for review.</p></Reveal></div></section>
      <ClosingCTA art="how-it-works" title={<>A clearer view<br/><em>of your next hire.</em></>} description="Manage jobs, candidates, and hiring communication in one workspace."/>
    </div>
  </main>;
}

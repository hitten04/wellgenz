import Image from "next/image";
import { SiteLink as Link } from "@/components/site-link";
import { ArrowUpRight, CalendarDays, Check, Mail, Video } from "lucide-react";
import { SectionHeading } from "./ui";
import { Reveal } from "./reveal";
import { AutomationShowcase } from "./automation-showcase";

export function ConnectedWorkflow() {
  return <>
    <section id="communications" className="section communications-section section-anchor home-communications"><div className="container">
      <Reveal className="home-centered-heading"><SectionHeading eyebrow="Thoughtful follow-through" title={<>The right message.<br/><span>At the right moment.</span></>}>A hiring journey feels different when candidates know where they stand. Keep every update connected to the next step.</SectionHeading></Reveal>
      <div className="home-email-grid"><Reveal className="home-email-story"><div className="home-art"><Image src="/images/hiring-email.webp" alt="A recruiter preparing candidate communication beside an open offer-letter envelope" width={1536} height={1024} sizes="(max-width: 759px) 90vw, 45vw"/></div><h3>Less follow-up work.<br/>More follow-through.</h3><p>Automate shortlist updates, interview details, offer-letter emails, and thoughtful rejection messages.</p><div className="home-inbox-note"><Mail size={22} aria-hidden="true"/><div><strong>Your inbox is a starting point, too.</strong><p>Candidates can send resumes by email. Bring those applications into the same workflow as career-page applicants.</p></div></div></Reveal><Reveal className="home-email-example"><AutomationShowcase /></Reveal></div>
    </div></section>

    <section id="interviews" className="section interviews-section section-anchor home-interviews interview-editorial"><div className="container">
      <div className="home-story-grid">
        <Reveal className="interview-editorial-copy">
          <SectionHeading eyebrow="From profile to conversation" title={<>Meet the person.<br/><span>Move the journey forward.</span></>}>Schedule online interviews with Google Meet or Zoom. Keep the candidate, interviewer, time, and meeting link connected to the role.</SectionHeading>
          <ul className="home-checks"><li><Check size={16} aria-hidden="true"/>Choose your meeting platform</li><li><Check size={16} aria-hidden="true"/>Coordinate the interviewer, date, and time</li><li><Check size={16} aria-hidden="true"/>Share details through hiring emails</li></ul>
          <div className="interview-editorial-platforms"><span><Video size={16} aria-hidden="true"/>Google Meet</span><span><Video size={16} aria-hidden="true"/>Zoom</span></div>
          <Link href="/how-it-works" className="home-section-link">See how conversations connect<ArrowUpRight size={17} aria-hidden="true"/></Link>
        </Reveal>
        <Reveal className="interview-sketch-scene">
          <div className="interview-sketch-frame"><Image src="/images/interview-sketch.webp" alt="Two hiring teammates thoughtfully preparing an online interview together at a laptop" width={1536} height={1024} sizes="(max-width: 759px) 90vw, 48vw"/></div>
          <div className="interview-sketch-notes">
            <div className="interview-sketch-note interview-note-platform"><span className="interview-note-icon"><Video size={20} strokeWidth={1.5} aria-hidden="true"/></span><div><strong>Choose the platform</strong><p>Google Meet or Zoom</p></div></div>
            <div className="interview-sketch-note interview-note-details"><span className="interview-note-icon"><CalendarDays size={20} strokeWidth={1.5} aria-hidden="true"/></span><div><strong>Set the details</strong><p>Interviewer, time, and meeting link</p></div></div>
            <div className="interview-sketch-note interview-note-informed"><span className="interview-note-icon"><Mail size={20} strokeWidth={1.5} aria-hidden="true"/></span><div><strong>Keep everyone informed</strong><p>Connected interview communication</p></div></div>
          </div>
        </Reveal>
      </div>
    </div></section>

    <section id="career-portals" className="section career-section section-anchor home-careers"><div className="container home-story-grid">
      <Reveal className="home-art home-career-art"><Image src="/images/hiring-careers-cutout.webp" alt="A candidate discovering welcoming opportunities on a company career page" width={1536} height={1024} sizes="(max-width: 759px) 90vw, (max-width: 1300px) 50vw, 632px"/></Reveal>
      <Reveal><SectionHeading eyebrow="Your openings, always connected" title={<>One click to publish.<br/><span>A new door opens.</span></>}>Create and edit jobs in your recruitment workspace. Publish positions to your branded career page in one click, with automatic updates and no manual website edits.</SectionHeading><ul className="home-checks"><li><Check size={16} aria-hidden="true"/>A public career page with a shareable link</li><li><Check size={16} aria-hidden="true"/>Your logo, company identity, and hero banner</li><li><Check size={16} aria-hidden="true"/>Current openings, managed from one place</li></ul><Link href="/features/career-pages" className="home-section-link">Explore company career pages<ArrowUpRight size={17} aria-hidden="true"/></Link><div className="home-publish-note"><span><Check size={16} aria-hidden="true"/></span><p>Manage the opening.<br/><strong>Your career page reflects the change.</strong></p></div></Reveal>
    </div></section>
  </>;
}

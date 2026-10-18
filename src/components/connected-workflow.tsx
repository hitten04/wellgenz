import Image from "next/image";
import { SiteLink as Link } from "@/components/site-link";
import { ArrowUpRight, CalendarDays, Check, Mail, Video } from "lucide-react";
import { SectionHeading } from "./ui";
import { Reveal } from "./reveal";
import { AutomationShowcase } from "./automation-showcase";

export function ConnectedWorkflow() {
  return <>
    <section id="communications" className="section section-anchor home-communications"><div className="container communications-layout">
      <Reveal className="communications-intro">
        <SectionHeading eyebrow="Thoughtful follow-through" title={<>Hiring emails.<br/><span>Every stage, connected.</span></>}>From a first shortlist to a final decision, keep candidates informed with email automation.</SectionHeading>
        <div className="communications-art"><Image src="/images/candidate-mail-desk-v2.webp" alt="Colorful envelopes and a recruiter illustrating connected candidate communication" width={1200} height={800} sizes="(max-width: 759px) 128px, 360px"/></div>
        <p className="communications-inbox"><Mail size={18} aria-hidden="true"/><span>Resumes from your inbox.<br/><strong>Part of the same hiring journey.</strong></span></p>
      </Reveal>
      <Reveal className="communications-examples"><AutomationShowcase /></Reveal>
    </div></section>

    <section id="interviews" className="section interviews-section section-anchor home-interviews interview-editorial"><div className="container">
      <div className="home-story-grid">
        <Reveal className="interview-editorial-copy">
          <SectionHeading eyebrow="From profile to conversation" title={<>Online interviews.<br/><span>Details in one place.</span></>}>Schedule online interviews with Google Meet or Zoom. Keep the candidate, interviewer, time, and meeting link connected to the role.</SectionHeading>
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
      <Reveal><SectionHeading eyebrow="Your openings, always connected" title={<>A branded career page.<br/><span>Openings kept current.</span></>}>Present vacancies with your company logo and banner, then share your public careers link. Recruiters publish and update positions from Wellgenz instead of requesting a separate website edit.</SectionHeading><ul className="home-checks"><li><Check size={16} aria-hidden="true"/>A public career page with a shareable link</li><li><Check size={16} aria-hidden="true"/>Your logo, company identity, and hero banner</li><li><Check size={16} aria-hidden="true"/>Current openings, managed from one place</li></ul><Link href="/features/career-pages" className="home-section-link">Explore company career pages<ArrowUpRight size={17} aria-hidden="true"/></Link><div className="home-publish-note"><span><Check size={16} aria-hidden="true"/></span><p>Manage the opening.<br/><strong>Your career page reflects the change.</strong></p></div></Reveal>
    </div></section>
  </>;
}

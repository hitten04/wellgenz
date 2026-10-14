"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, CalendarDays, Check, CheckCheck, FileText, Globe2, Mail, Send, Sparkles, Video } from "lucide-react";
import { useReducedMotion } from "./use-reduced-motion";

const stories = [
  { id: "review", label: "Review candidates", eyebrow: "A clearer view of every applicant", title: "See the person behind the resume.", copy: "Bring resumes from your career page or email into structured profiles. Compare skills, experience, and education against the requirements of each role.", points: ["AI resume parsing and job-based matching", "Automatic shortlisting using your criteria", "Candidate notes that keep the context close"], link: "/features/candidate-scoring", cta: "Explore candidate matching", note: "AI assists the review. Your team makes the decision." },
  { id: "meet", label: "Schedule interviews", eyebrow: "Make space for the conversation", title: "Connect people. Keep the details together.", copy: "Schedule online interviews through Google Meet or Zoom. Keep the candidate, interviewer, time, and meeting link connected to the hiring process.", points: ["Google Meet and Zoom meeting scheduling", "Interview details beside the application", "A clear next step for everyone involved"], link: "/how-it-works", cta: "See the hiring workflow", note: "Less scattered coordination. More room for a good conversation." },
  { id: "email", label: "Automate email", eyebrow: "Thoughtful follow-through", title: "Keep every candidate in the loop.", copy: "Connect hiring progress to communication. Send shortlist updates, rejection emails, and offer letters through the same hiring journey.", points: ["Shortlist and rejection email automation", "Offer-letter email automation", "Resume intake from your hiring inbox"], link: "/features/applicant-tracking", cta: "Explore connected hiring", note: "From the first application to the final update, keep communication connected." },
  { id: "careers", label: "Publish careers", eyebrow: "Your company. Your next chapter.", title: "A career page that keeps up with you.", copy: "Create and edit jobs, then publish openings to your branded public career page in one click. Updates happen automatically, without manual website changes.", points: ["A branded career page with a shareable link", "Your logo, identity, and hero banner", "One-click publishing for open positions"], link: "/features/career-pages", cta: "Explore career pages", note: "Your next opportunity, ready to share." },
];

function StoryVisual({ active }: { active: string }) {
  if (active === "review") return <div className="studio-review-art">
    <Image src="/images/hiring-review.webp" alt="A recruiter arranging candidate profiles for a thoughtful review" width={1536} height={1024} sizes="(max-width: 759px) 92vw, 55vw" />
    <div className="studio-profile"><div className="studio-profile-top"><span className="studio-avatar">AM</span><div><strong>Avery Morgan</strong><span>Product designer</span></div></div><p className="studio-example">Illustrative candidate</p><div className="studio-fit"><Sparkles size={14} /> Job-based matching</div><div className="studio-skills"><span>Figma</span><span>Research</span><span>Design systems</span></div><div className="studio-profile-line"><Check size={14} /> Skills and experience in context</div></div>
  </div>;
  if (active === "meet") return <div className="studio-ui-scene"><span className="studio-orbit-icon"><Video size={30} strokeWidth={1.4} /></span><div className="studio-ui-card"><div className="studio-ui-card-title"><CalendarDays size={19} /><strong>Design conversation</strong></div><span className="studio-example">Illustrative interview</span><div className="studio-calendar">{["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={`day-${i}`} className="studio-calendar-day">{d}</span>)}{Array.from({length:21}, (_, i) => <span key={i} className={i===11?"studio-date-selected":""}>{i+1}</span>)}</div><div className="studio-meeting-time"><span>12 October</span><strong>10:00 – 10:45</strong></div><div className="studio-platforms"><span><Video size={14} /> Google Meet</span><span><Video size={14} /> Zoom</span></div></div><span className="studio-floating-note"><CheckCheck size={17} /> Meeting details, connected.</span></div>;
  if (active === "email") return <div className="studio-ui-scene"><span className="studio-orbit-icon"><Mail size={30} strokeWidth={1.4} /></span><div className="studio-ui-card studio-mail-card"><div className="studio-ui-card-title"><Mail size={19} /><strong>Your next conversation</strong></div><span className="studio-example">Illustrative shortlist email</span><div className="studio-mail-divider"/><p>Hello Avery,</p><p>Thank you for your interest in the Product Designer role. We’d love to take the next step and arrange a conversation.</p><p>We look forward to meeting you.<br/><strong>The hiring team</strong></p><div className="studio-mail-status"><Send size={15} /> Connected to the hiring journey</div></div><span className="studio-floating-note"><FileText size={17} /> Shortlist · Rejection · Offer</span></div>;
  return <div className="studio-ui-scene"><span className="studio-orbit-icon"><Globe2 size={30} strokeWidth={1.4} /></span><div className="studio-ui-card studio-careers-card"><div className="studio-browser-dots"><i/><i/><i/><span>your-company / careers</span></div><span className="studio-example">Illustrative company career page</span><h4>Build what’s next.<br/>With us.</h4><p>A place for your next chapter.</p>{["Product designer", "Frontend engineer", "People operations"].map(role=><div className="studio-career-role" key={role}><span>{role}</span><ArrowUpRight size={15}/></div>)}</div><span className="studio-floating-note"><CheckCheck size={17} /> One click. Openings updated.</span></div>;
}

export function HiringStudio() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % stories.length;
    else if (event.key === "ArrowLeft") next = (index + stories.length - 1) % stories.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = stories.length - 1;
    else return;
    event.preventDefault(); setSelected(next); tabs.current[next]?.focus();
  }
  return <div className="hiring-studio">
    <div className="studio-tabs" role="tablist" aria-label="Explore connected hiring capabilities">{stories.map((item,index)=><button key={item.id} ref={node=>{tabs.current[index]=node;}} type="button" role="tab" id={`${id}-tab-${item.id}`} aria-controls={`${id}-panel-${item.id}`} aria-selected={selected===index} tabIndex={selected===index?0:-1} onClick={()=>setSelected(index)} onKeyDown={event=>onKeyDown(event,index)}>{item.label}</button>)}</div>
    <div className="studio-panel-shell">
      {stories.map((story, index) => <motion.div key={story.id} role="tabpanel" id={`${id}-panel-${story.id}`} aria-labelledby={`${id}-tab-${story.id}`} tabIndex={selected===index?0:-1} aria-hidden={selected!==index} inert={selected!==index} data-active={selected===index} className="studio-panel" initial={false} animate={{opacity:selected===index?1:0,y:reduced||selected===index?0:8}} transition={{duration:reduced?0:.22,ease:[.22,1,.36,1]}}>
          <div className="studio-copy"><p className="studio-eyebrow">{story.eyebrow}</p><h3>{story.title}</h3><p>{story.copy}</p><ul>{story.points.map(point=><li key={point}><Check size={16} aria-hidden="true"/>{point}</li>)}</ul><Link href={story.link} className="studio-link">{story.cta}<ArrowUpRight size={17} aria-hidden="true"/></Link></div>
          <div className={`studio-visual studio-visual-${story.id}`}><StoryVisual active={story.id}/></div>
          <p className="studio-note"><Sparkles size={15} aria-hidden="true"/>{story.note}</p>
        </motion.div>)}
    </div>
  </div>;
}

"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { SiteLink as Link } from "@/components/site-link";
import { motion } from "motion/react";
import { ArrowUpRight, CalendarDays, Check, Globe2, Mail, UsersRound } from "lucide-react";
import { useReducedMotion } from "./use-reduced-motion";

const stories = [
  {
    id: "review", label: "Candidate review", icon: UsersRound,
    title: "Find the person behind the resume.",
    copy: "Turn resumes into clear profiles. Compare the fit, keep your notes, and build a shortlist your team can review.",
    points: ["AI parsing & job-based matching", "Your criteria. Your final decision."],
    link: "/features/candidate-scoring", cta: "Explore candidate matching",
    alt: "A recruiter comparing candidate profiles beside a laptop",
  },
  {
    id: "meet", label: "Interviews", icon: CalendarDays,
    title: "Make room for a good conversation.",
    copy: "Schedule interviews and keep the practical details beside each application, so everyone arrives prepared.",
    points: ["Google Meet & Zoom scheduling", "Interview details in one place"],
    link: "/how-it-works", cta: "See the hiring workflow",
    alt: "Two professionals connecting through a video interview",
  },
  {
    id: "email", label: "Email automation", icon: Mail,
    title: "Keep every candidate in the loop.",
    copy: "Send the right update as an application moves forward, from the first shortlist to the final decision.",
    points: ["Shortlist, offer & rejection emails", "Resume intake from your inbox"],
    link: "/features/applicant-tracking", cta: "Explore connected hiring",
    alt: "A recruiter sending candidate updates through colorful envelopes",
  },
  {
    id: "careers", label: "Career pages", icon: Globe2,
    title: "Your brand. Their next chapter.",
    copy: "Give your openings a home that feels like your company. Publish roles and share your career page in one click.",
    points: ["Your logo, banner & shareable link", "Openings kept up to date"],
    link: "/features/career-pages", cta: "Explore career pages",
    alt: "Two professionals presenting job openings on a branded careers board",
  },
];

export function HiringStudio() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();

  function selectTab(index: number) {
    setSelected(index);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % stories.length;
    else if (event.key === "ArrowLeft") next = (index + stories.length - 1) % stories.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = stories.length - 1;
    else return;
    event.preventDefault();
    selectTab(next);
    tabs.current[next]?.focus();
  }

  return <div className="hiring-studio">
    <div className="studio-tabs" role="tablist" aria-label="Explore hiring workflows">
      {stories.map((story, index) => <button
        key={story.id}
        ref={node => { tabs.current[index] = node; }}
        type="button" role="tab"
        id={`${id}-tab-${story.id}`} aria-controls={`${id}-panel-${story.id}`}
        aria-selected={selected === index} tabIndex={selected === index ? 0 : -1}
        onClick={() => selectTab(index)} onKeyDown={event => onKeyDown(event, index)}
      ><story.icon size={17} strokeWidth={1.7} aria-hidden="true"/><span>{story.label}</span></button>)}
    </div>
    <div className="studio-panel-shell">
      {stories.map((story, index) => <motion.div
        key={story.id} role="tabpanel"
        id={`${id}-panel-${story.id}`} aria-labelledby={`${id}-tab-${story.id}`}
        tabIndex={0} hidden={selected !== index} className="studio-panel"
        initial={false} animate={{ opacity: selected === index ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : .18 }}
      >
        <div className={`studio-visual studio-visual-${story.id}`}>
          <Image src={`/images/toolkit-${story.id}-color.webp`} alt={story.alt}
            width={1200} height={800} sizes="(max-width: 759px) 90vw, 46vw"/>
        </div>
        <div className="studio-copy">
          <h3>{story.title}</h3>
          <p>{story.copy}</p>
          <ul>{story.points.map(point => <li key={point}><Check size={15} aria-hidden="true"/>{point}</li>)}</ul>
          <Link href={story.link} className="studio-link">{story.cta}<ArrowUpRight size={16} aria-hidden="true"/></Link>
        </div>
      </motion.div>)}
    </div>
  </div>;
}

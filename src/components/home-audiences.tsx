"use client";

import Image from "next/image";
import { SiteLink as Link } from "@/components/site-link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { useReducedMotion } from "./use-reduced-motion";

const people = [
  { name: "HR teams", title: "Make room for the human side.", art: "hr-ink", description: "Bring applications, candidate context, and upcoming interviews into a connected hiring process. Spend your attention on conversations and thoughtful decisions.", points: ["Applications from career pages and email", "Clear stages from application to offer", "Google Meet and Zoom interview coordination"], link: "/features/applicant-tracking", cta: "Explore connected hiring" },
  { name: "Recruiters", title: "See the fit behind the profile.", art: "recruiter-ink", description: "Explore parsed resumes, relevant skills, and matching breakdowns. Use role-specific rules to surface candidates for closer review, then keep the next step moving.", points: ["Job-specific matching criteria", "Automatic shortlisting thresholds", "Shortlist, offer, and rejection emails"], link: "/features/candidate-scoring", cta: "Explore candidate matching" },
  { name: "Growing companies", title: "Build the team for what’s next.", art: "founder-ink", description: "Present your company through a branded career portal and manage openings in one workspace. Keep a clear view of the people moving through your pipeline.", points: ["Your own branded company career portal", "One-click publishing and automatic updates", "Hiring analytics and pipeline visibility"], link: "/features/career-pages", cta: "Explore company career pages" },
];

export function HomeAudiences() {
  const [active,setActive]=useState(0);
  const id=useId();
  const refs=useRef<(HTMLButtonElement|null)[]>([]);
  const reduced=useReducedMotion();
  function navigate(event:KeyboardEvent<HTMLButtonElement>,index:number){
    let next=index;
    if(event.key==="ArrowRight")next=(index+1)%people.length;
    else if(event.key==="ArrowLeft")next=(index+people.length-1)%people.length;
    else if(event.key==="Home")next=0;
    else if(event.key==="End")next=people.length-1;
    else return;
    event.preventDefault();setActive(next);refs.current[next]?.focus();
    refs.current[next]?.scrollIntoView({block:"nearest",inline:"nearest",behavior:reduced?"instant":"smooth"});
  }
  return <div className="home-personas">
    <p className="home-persona-instruction">Choose your team. Find your flow.</p>
    <div className="home-persona-tabs" role="tablist" aria-label="Explore Wellgenz for your team">{people.map((person,index)=><button key={person.name} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={active===index} tabIndex={active===index?0:-1} ref={node=>{refs.current[index]=node;}} onClick={()=>setActive(index)} onKeyDown={event=>navigate(event,index)} className="home-persona-card"><span className="home-persona-label">{person.name}</span><span className="home-persona-title">{person.title}</span><Image src={`/images/${person.art}.webp`} alt="" width={1536} height={1024} sizes="(max-width: 759px) 78vw, 30vw"/><span className="home-persona-select">{active===index?"Your team, connected":"Explore this perspective"}<ArrowUpRight size={17} aria-hidden="true"/></span></button>)}</div>
    <div className="home-persona-panels">{people.map((person,index)=><motion.div key={person.name} role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} aria-hidden={active!==index} inert={active!==index} data-active={active===index} tabIndex={active===index?0:-1} initial={false} animate={{opacity:active===index?1:0,y:reduced||active===index?0:6}} transition={{duration:reduced?0:.25}} className="home-persona-panel"><div><span className="home-persona-label">{person.name} / A clearer way to hire</span><p>{person.description}</p><Link href={person.link}>{person.cta}<ArrowUpRight size={16} aria-hidden="true"/></Link></div><ul>{person.points.map(point=><li key={point}><Check size={16} aria-hidden="true"/>{point}</li>)}</ul></motion.div>)}</div>
  </div>;
}

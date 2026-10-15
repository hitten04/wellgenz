import type { Metadata } from "next";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, FileText, Globe2, LockKeyhole, Mail, MessageSquare, SlidersHorizontal, UsersRound } from "lucide-react";
import { SiteLink as Link } from "@/components/site-link";
import { AppLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ProductProgress } from "@/components/product-motion";
import "./why-editorial.css";

export const metadata: Metadata = { title: "Why Wellgenz", description: "Discover a connected recruitment workspace for HR teams, recruiters, and growing companies, with AI-assisted review and human-led hiring.", alternates: { canonical: "/why-wellgenz" }, openGraph: { title: "Why Wellgenz", url: "/why-wellgenz" } };

const principles = [
  { title: "Context stays with the candidate.", text: "Applications, parsed resumes, candidate notes, and pipeline stages belong in the same hiring journey. Give the next reviewer a clearer starting point, with the role and candidate information together.", label: "Keep the whole picture", href: "applicant-tracking", link: "Explore applicant tracking" },
  { title: "AI assists. Your team decides.", text: "Use job-specific scoring and automatic shortlisting to organize candidate review. Explore the experience and skills behind a match, then use interviews and your team’s judgment to assess the person.", label: "Make room for judgment", href: "candidate-scoring", link: "Explore candidate scoring" },
  { title: "Communication follows the process.", text: "Connect shortlist messages, online interview details, offer letter emails, and rejection updates with the hiring workflow. Keep the next step clear for the people on both sides of the application.", label: "Follow through thoughtfully", href: "candidate-notes", link: "Explore candidate notes" },
  { title: "Your opportunities stay current.", text: "Publish hiring positions to a branded career page in one click. Let recruiters maintain openings in the recruitment workspace while candidates discover opportunities through one shareable public link.", label: "Open the door to possibility", href: "career-pages", link: "Explore career pages" },
];
const teams = [
  { title: "HR teams", icon: UsersRound, headline: "More room for the human side.", text: "Bring applications, candidate context, and upcoming interviews into a connected hiring process. Spend your attention on conversations and thoughtful decisions.", points: ["Candidate information from career pages and email", "Clear stages from application to offer", "Google Meet and Zoom interview coordination"] },
  { title: "Recruiters", icon: SlidersHorizontal, headline: "A shortlist with substance.", text: "Explore parsed resumes, relevant skills, and matching breakdowns. Use role-specific rules to surface candidates for closer review, then keep the next step moving.", points: ["Job-specific matching criteria", "Automatic shortlisting thresholds", "Shortlist, offer, and rejection email automation"] },
  { title: "Growing companies", icon: Globe2, headline: "A place for your next chapter.", text: "Present your company through a branded career portal and manage openings through one recruitment workspace. Keep a clear view of the people moving through your pipeline.", points: ["Custom-branded company career portals", "One-click publishing and automatic career page updates", "Recruitment analytics and pipeline visibility"] },
];

function PeopleSketch() {
  return <svg className="why-people-sketch" viewBox="0 0 520 400" fill="none" aria-hidden="true">
    <ellipse cx="260" cy="329" rx="181" ry="24" fill="#ded0ec" opacity=".5"/>
    <path d="M85 165C82 76 174 39 260 64C363 30 452 92 433 183" stroke="#b59aca" strokeWidth="1.5" strokeDasharray="5 7"/>
    <path d="M108 273C52 193 87 123 163 114M411 272C459 203 430 125 359 114" stroke="#b59aca" strokeWidth="1.5" strokeDasharray="5 7"/>
    <g stroke="#42304f" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M186 262L196 188Q207 167 234 169H283Q313 171 322 199L335 266" fill="#a58ac3"/>
      <path d="M235 171V152H282V173L261 194Z" fill="#f1cdb9"/>
      <path d="M228 109Q226 78 257 77Q295 77 293 115L288 143Q280 162 260 163Q238 160 232 140Z" fill="#f1cdb9"/>
      <path d="M230 118Q218 102 231 84Q248 65 274 77Q301 80 296 112L285 105L279 92Q258 111 230 108Z" fill="#42304f"/>
      <path d="M245 123V128M276 123V128M257 143Q264 148 271 141"/>
      <path d="M220 203L211 243L243 257M299 204L312 239L283 255"/>
      <path d="M77 294L86 232Q98 207 127 208Q157 208 169 235L180 290" fill="#f5dfcf"/>
      <path d="M111 212V194H142V214L128 229Z" fill="#dca887"/>
      <path d="M95 160Q91 128 122 127Q158 126 157 163L150 190Q142 206 125 203Q103 199 100 182Z" fill="#dca887"/>
      <path d="M96 177Q76 155 91 132Q109 109 140 125Q165 128 161 167L150 153Q140 155 127 143Q112 159 99 160Z" fill="#42304f"/>
      <path d="M112 168V172M138 166V170M121 186Q129 190 135 182"/>
      <path d="M345 296L352 233Q362 211 391 209Q421 210 436 236L444 298" fill="#c9b6df"/>
      <path d="M376 214V195H407V216L392 230Z" fill="#f1cdb9"/>
      <path d="M361 164Q359 133 387 131Q420 130 423 160L417 190Q410 207 392 207Q371 203 367 186Z" fill="#f1cdb9"/>
      <path d="M361 175Q345 163 355 143Q362 121 391 123Q429 120 430 154L420 171L414 149Q389 162 366 149Z" fill="#42304f"/>
      <path d="M378 170V174M404 168V172M387 190Q394 195 402 187"/>
      <path d="M146 256L365 252L404 321L111 326Z" fill="#fffaf0"/>
      <path d="M112 326V336M403 321V333"/>
      <path d="M204 264L251 263L268 296L218 299Z" fill="#e9dff2"/>
      <path d="M218 276L241 275M223 284L246 283M227 291L241 290" stroke="#a58ac3"/>
      <path d="M286 268L322 268L330 285L294 285Z" fill="#f5dfcf"/>
      <path d="M91 251L115 283L158 280M435 252L413 286L368 285"/>
      <path d="M158 280L174 277L184 282L174 287L158 286M368 285L351 281L341 285L353 292L368 291" fill="#f1cdb9"/>
      <path d="M332 297V280H349V296Q340 306 332 297ZM349 283Q362 282 358 293L349 295" fill="#e9dff2"/>
    </g>
    <path d="M168 64L172 56M176 69L184 66M350 67L346 58" stroke="#7953a0" strokeWidth="2" strokeLinecap="round"/>
  </svg>;
}

function PrincipleArt({ index }: { index: number }) {
  if (index === 0) return <div className="why-context-art" aria-hidden="true"><div className="why-art-avatar">A</div><div><strong>A candidate. In context.</strong><span>Application · Resume · Team notes</span></div><div className="why-context-tags"><span><FileText size={14}/>Experience</span><span><MessageSquare size={14}/>Review notes</span><span><Check size={14}/>Next step</span></div></div>;
  if (index === 1) return <div className="why-judgment-art" aria-hidden="true"><span><SlidersHorizontal size={20}/>Role-specific criteria</span><div><i/><i/><i/></div><strong><UsersRound size={18}/>Your team’s perspective</strong><p>Evidence for the conversation.<br/>People behind every profile.</p></div>;
  if (index === 2) return <div className="why-message-art" aria-hidden="true"><div><Mail size={20}/><span>From your hiring team</span><Check size={16}/></div><strong>A thoughtful next step.</strong><p>Shortlist updates · Interview details<br/>Offers · Rejection emails</p><span className="why-art-stamp">Connected to the hiring journey</span></div>;
  return <div className="why-career-art" aria-hidden="true"><div><span/><span/><span/><small>yourcompany / careers</small></div><strong>Your next chapter<br/>starts here.</strong><p>Current opportunities</p><span>Product designer<ArrowUpRight size={15}/></span><span>Engineering<ArrowUpRight size={15}/></span></div>;
}

export default function WhyWellgenz() {
  return <main id="main" className="product-pages why-editorial"><ProductProgress/>
    <section className="why-hero container">
      <Reveal className="why-hero-copy"><p className="eyebrow"><span aria-hidden="true"/>Built around your people</p><h1>Hiring has a<br/><em>human centre.</em></h1><p>More room for people. More clarity for hiring. Wellgenz brings the practical work of recruitment together, so your team can focus on the people behind each application.</p><div className="why-hero-actions"><AppLink>Access Dashboard</AppLink><a href="#our-approach">Our approach<ArrowDown size={16} aria-hidden="true"/></a></div></Reveal>
      <Reveal className="why-hero-art" delay={.1}><div className="why-art-heading"><span>The Wellgenz perspective</span><span aria-hidden="true">01 / PEOPLE</span></div><PeopleSketch/><div className="why-hero-note why-note-left"><MessageSquare size={16} aria-hidden="true"/>Better context.</div><div className="why-hero-note why-note-right"><UsersRound size={16} aria-hidden="true"/>Human decisions.</div><div className="why-art-caption">Connected work.<em>Considered hiring.</em></div></Reveal>
    </section>
    <div className="container">
      <Reveal className="why-manifesto"><p className="eyebrow">Our point of view</p><p>A hiring process should bring<br/><span>people into focus.</span></p><span>Present the opportunity. Understand the applicant.<br/>Keep the conversation moving.</span></Reveal>
      <section id="our-approach" className="why-approach" aria-labelledby="why-approach-title"><Reveal className="why-section-heading"><div><p className="eyebrow">The difference is in the details</p><h2 id="why-approach-title">Thoughtful by design.<br/><em>Connected in practice.</em></h2></div><p>Four principles behind a clearer recruitment experience, from the first application to the final update.</p></Reveal>
        <div className="why-principles-layout"><svg className="why-principle-paths" viewBox="0 0 1000 1000" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M500 500V32H968M500 500H968V968M500 500V968H32M500 500H32V32" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round"/><circle cx="968" cy="32" r="4" fill="currentColor"/><circle cx="968" cy="968" r="4" fill="currentColor"/><circle cx="32" cy="968" r="4" fill="currentColor"/><circle cx="32" cy="32" r="4" fill="currentColor"/></svg><span className="why-principle-symbol" aria-hidden="true"><svg viewBox="0 0 100 100" fill="none"><path d="M50 50V20H80M50 50H80V80M50 50V80H20M50 50H20V20" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/><g fill="currentColor"><circle cx="35" cy="35" r="3"/><circle cx="65" cy="35" r="3"/><circle cx="65" cy="65" r="3"/><circle cx="35" cy="65" r="3"/></g></svg></span><div className="why-principles">{principles.map((p,i) => <Reveal className={`why-principle why-principle-${i}`} key={p.title} delay={(i%2)*.08}><article><div className="why-principle-top"><span>0{i+1}</span><p>{p.label}</p></div><div className="why-principle-art"><PrincipleArt index={i}/></div><h3>{p.title}</h3><p className="why-principle-text">{p.text}</p><Link href={`/features/${p.href}`}>{p.link}<ArrowUpRight size={17} aria-hidden="true"/></Link></article></Reveal>)}</div></div>
      </section>
      <section className="why-teams" aria-labelledby="why-teams-title"><Reveal className="why-section-heading"><div><p className="eyebrow">Different teams. A connected view.</p><h2 id="why-teams-title">Your people.<br/><em>Your way of hiring.</em></h2></div><p>A shared workspace with room for the different perspectives that shape a hiring decision.</p></Reveal><div className="why-team-grid">{teams.map((team,i) => <Reveal key={team.title} delay={i*.07}><article className="why-team"><team.icon size={28} strokeWidth={1.4} aria-hidden="true"/><p className="why-team-label">{team.title}</p><h3>{team.headline}</h3><p>{team.text}</p><ul>{team.points.map(point => <li key={point}><Check size={15} aria-hidden="true"/>{point}</li>)}</ul></article></Reveal>)}</div></section>
      <section className="why-alignment" aria-labelledby="why-alignment-title"><Reveal className="why-alignment-art"><div className="why-access-lock"><LockKeyhole size={32} strokeWidth={1.3} aria-hidden="true"/></div><p>Shared context.<br/><em>Considered access.</em></p><div className="why-access-rows"><span><UsersRound size={17} aria-hidden="true"/>Your team<b>Role-based access</b></span><span><MessageSquare size={17} aria-hidden="true"/>Candidate notes<b>Review context</b></span><span><SlidersHorizontal size={17} aria-hidden="true"/>Hiring funnel<b>A connected view</b></span></div></Reveal><Reveal className="why-alignment-copy" delay={.08}><p className="eyebrow">Visibility with purpose</p><h2 id="why-alignment-title">On the same page.<br/><em>At every stage.</em></h2><p>Role-based access helps control who can view and edit hiring information. Candidate notes preserve useful review context, while dashboard counts and the funnel help the team see where attention is needed.</p><p>Whether you are opening a new role or coordinating several searches, the goal stays the same: a clear process, informed conversations, and considered hiring decisions.</p><Link href="/features/role-based-access">Explore role-based access<ArrowUpRight size={17} aria-hidden="true"/></Link></Reveal></section>
      <Reveal className="why-closing"><div><p className="eyebrow">People today. Possibilities tomorrow.</p><h2>Make room for<br/><em>your next great hire.</em></h2><p>Jobs, candidates, and hiring communication. Together in Wellgenz.</p></div><div><AppLink light>Access Dashboard</AppLink><Link href="/how-it-works">See how it works<ArrowRight size={16} aria-hidden="true"/></Link></div></Reveal>
    </div>
  </main>;
}

import Image from "next/image";
import { CalendarDays, Check, FileText, Globe2 } from "lucide-react";

export function HomeHeroArt() {
  return <figure className="home-hero-art" aria-label="People and hiring workflows, connected">
    <Image src="/images/hiring-team-cutout.webp" alt="Two hiring teammates discussing a candidate together at their desk" width={1536} height={1024} sizes="(max-width: 759px) 100vw, 60vw" priority/>
    <div className="hero-story-badge hero-story-badge-resume"><FileText size={19} aria-hidden="true"/><span>Resume received</span><Check size={15} aria-hidden="true"/></div>
    <div className="hero-story-badge hero-story-badge-meeting"><CalendarDays size={19} aria-hidden="true"/><span>Interview scheduled</span><Check size={15} aria-hidden="true"/></div>
    <div className="hero-story-badge hero-story-badge-careers"><Globe2 size={19} aria-hidden="true"/><span>Career page updated</span><Check size={15} aria-hidden="true"/></div>
  </figure>;
}

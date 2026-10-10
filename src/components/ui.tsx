import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

export function Wordmark({ light = false }: { light?: boolean }) {
  return <span className={`wordmark ${light ? "wordmark-light" : ""}`}>wellgenz<span className="wordmark-dot" aria-hidden="true">.</span></span>;
}
export function AppLink({ children = "Access Dashboard", light = false, className = "" }: { children?: ReactNode; light?: boolean; className?: string }) {
  return <a href={site.appUrl} className={`button ${light ? "button-light" : "button-dark"} ${className}`}>{children}<ArrowUpRight size={17} aria-hidden="true" /></a>;
}
export function SectionHeading({ eyebrow, title, children, light = false }: { eyebrow: string; title: ReactNode; children?: ReactNode; light?: boolean }) {
  return <div className={`section-heading ${light ? "heading-light" : ""}`}><p className="eyebrow"><span aria-hidden="true" />{eyebrow}</p><h2>{title}</h2>{children && <p className="section-description">{children}</p>}</div>;
}

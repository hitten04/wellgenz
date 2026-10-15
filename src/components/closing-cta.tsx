import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";
import { AppLink } from "./ui";
import { SiteLink as Link } from "./site-link";
import { closingArt } from "@/lib/closing-art";
import "./closing-cta.css";

export function ClosingCTA({ art, eyebrow = "Your next chapter", title, description, secondaryHref = "/features", secondaryLabel = "Explore the toolkit" }: { art: string; eyebrow?: string; title: ReactNode; description?: string; secondaryHref?: string; secondaryLabel?: string }) {
  const illustration = closingArt[art] ?? closingArt.features;
  const image = closingArt[art] ? art : "features";
  return <section className="closing-cta-section" aria-label="Your next step"><Reveal className="closing-cta"><div className="closing-cta-copy"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p className="closing-cta-description">{description}</p>}<div className="closing-cta-actions"><AppLink light>Access Dashboard</AppLink><Link href={secondaryHref}>{secondaryLabel}<ArrowRight size={16} aria-hidden="true"/></Link></div></div><figure className="closing-cta-art"><Image src={`/images/cta-${image}-sketch.webp`} alt={illustration.alt} width={900} height={600} sizes="(max-width: 759px) calc(100vw - 86px), (max-width: 1250px) 43vw, 510px"/><figcaption>{illustration.caption[0]}<br/><span>{illustration.caption[1]}</span></figcaption></figure></Reveal></section>;
}

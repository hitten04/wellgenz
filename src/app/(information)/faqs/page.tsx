import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { pageMetadata } from "@/lib/page-seo";
import { ClosingCTA } from "@/components/closing-cta";
import { FAQExplorer } from "@/components/faq-explorer";
import { ProductProgress } from "@/components/product-motion";
import { Reveal } from "@/components/reveal";
import "./faq-editorial.css";

export const metadata: Metadata = pageMetadata("/faqs");

export default function FAQs() {
  return <main id="main" className="product-pages faq-editorial" aria-label="FAQs"><ProductProgress/>
    <section className="faq-hero" aria-labelledby="faq-hero-title"><div className="container"><Reveal className="faq-hero-copy"><p className="eyebrow"><span aria-hidden="true"/>A LITTLE KNOWLEDGE. A CLEARER NEXT STEP.</p><h1 id="faq-hero-title">Wellgenz FAQs.<br/><em>Let’s make it clear.</em></h1><p>From your first opening to your next hire. Find practical answers about applications, AI matching, interviews, and working together in Wellgenz.</p><a href="#faq-library">Find your answer<ArrowDown size={17} aria-hidden="true"/></a></Reveal></div><Reveal className="faq-panorama" delay={.08}><Image src="/images/faq-conversations-panorama.webp" alt="Panoramic ink sketch of hiring colleagues reading a guide, discussing questions, and taking notes at a shared desk" width={2172} height={724} priority sizes="(max-width: 759px) calc(100vw - 24px), (max-width: 1368px) calc(100vw - 48px), 1320px"/></Reveal></section>
    <div className="container"><FAQExplorer/>
      <ClosingCTA art="faqs" title={<>Explore a feature.<br/><em>Get into the details.</em></>} description="Read the feature guides for workflows, examples, and answers specific to each part of the product." secondaryLabel="Explore the features"/>
    </div>
  </main>;
}

import { ProductSection, ProductCard, ProductProgress } from "@/components/product-motion";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AppLink } from "@/components/ui";
import { productPages } from "@/lib/product-pages";
export const metadata: Metadata = {
  title: "Recruitment features", description: "Explore Wellgenz job management, career pages, applicant tracking, AI resume parsing, candidate scoring, notes, role-based access, and hiring analytics.",
  alternates: { canonical: "/features" }, openGraph: { title: "Recruitment features | Wellgenz", description: "Explore the tools behind a connected hiring journey.", url: "/features" },
};
export default function FeatureDirectory() {
  return <main id="main" className="product-pages"><ProductProgress/><div className="container">
    <ProductSection className="product-directory-intro"><p className="eyebrow"><span />THE WELLGENZ TOOLKIT</p><h1>A closer look at<br /><em>connected hiring.</em></h1><p className="product-lede">From publishing the opening to understanding the hiring funnel. Explore how each part of Wellgenz helps your team organize the work and keep people in context.</p><AppLink>Access Dashboard</AppLink><span className="product-directory-note">Eight capabilities. One recruitment journey.</span></ProductSection>
    <div className="product-directory-grid">{productPages.map((page, index) => <ProductCard key={page.slug} index={index}><Link data-theme={page.slug} className="product-directory-card" href={`/features/${page.slug}`}><span className="product-card-category">{page.category}<ArrowUpRight size={18}/></span><h2>{page.name}</h2><p>{page.intro}</p><span className="product-explore">Explore {page.name.toLowerCase()}<ArrowRight size={16}/></span></Link></ProductCard>)}</div>
    <ProductSection className="product-end"><p className="eyebrow"><span />BUILT AROUND YOUR PEOPLE</p><h2>Bring the whole journey together.</h2><p>Publish roles, organize applications, review candidate context, and keep the next conversation moving in one hiring workspace.</p><AppLink light>Access Dashboard</AppLink><Link href="/">Back to the Wellgenz homepage <ArrowRight size={15}/></Link></ProductSection>
  </div></main>;
}

import type { Metadata } from "next";
import { InformationPage } from "@/components/information-page";
import { ProductCard, ProductSection } from "@/components/product-motion";
import { Sparkles, Users, ShieldCheck, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "About us",
  description: "Learn about the mission, values, and team behind Wellgenz — a connected recruitment platform built for human-first hiring and clear decisions.",
  alternates: { canonical: "/about-us" },
  openGraph: { title: "About us | Wellgenz", url: "/about-us" },
};

const pillars = [
  {
    tag: "01 / OUR PURPOSE",
    title: "Context stays connected.",
    text: "Too often, valuable interview context, notes, and candidate observations get scattered across disjointed spreadsheets and detached inboxes. Wellgenz keeps every application, match score, note, and next conversation in one unified journey.",
  },
  {
    tag: "02 / OUR BELIEF",
    title: "AI that assists, humans who decide.",
    text: "We believe AI should handle the repetitive work—parsing resumes and matching job criteria—so recruiters can invest their time in meaningful, human conversations with real people.",
  },
  {
    tag: "03 / OUR STANDARD",
    title: "Respect for every applicant.",
    text: "Candidates deserve transparency and prompt communication. Our automated hiring emails, clear interview scheduling, and structured updates help companies build trust with prospective team members.",
  },
  {
    tag: "04 / OUR CRAFT",
    title: "Designed for clarity, not clutter.",
    text: "Hiring software shouldn't feel complicated or dated. We focus on clean typography, intuitive pipelines, and software that teams genuinely enjoy opening and using every single day.",
  },
];

const highlights = [
  {
    icon: Users,
    title: "Human-First Decisions",
    desc: "AI organizes resume evidence and calculates relevance scores, but every hiring decision remains in the hands of your team.",
  },
  {
    icon: Sparkles,
    title: "One Unified Workspace",
    desc: "From publishing openings on branded portals to scheduling video interviews and sending offer letters without tool hopping.",
  },
  {
    icon: HeartHandshake,
    title: "Thoughtful Candidate Experience",
    desc: "Empower applicants with transparent communication, automatic status updates, and professional interview coordination.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Governance",
    desc: "Role-based access controls and enterprise standards ensure hiring data and candidate context remain safe and compliant.",
  },
];

export default function AboutUs() {
  return (
    <InformationPage
      name="About us"
      eyebrow="WHO WE ARE & OUR MISSION"
      title={
        <>
          Building a clearer path
          <br />
          <em>for human-first hiring.</em>
        </>
      }
      intro="Wellgenz was created on a simple premise: recruitment technology should bring clarity to hiring teams and treat candidates like people, not rows in a spreadsheet. We bring together job publishing, AI candidate review, team communication, and pipeline workflows in one connected workspace."
    >
      <ProductSection className="info-steps">
        {pillars.map((pillar, index) => (
          <ProductCard key={pillar.title} index={index}>
            <article className="info-step">
              <span>{pillar.tag}</span>
              <h2>{pillar.title}</h2>
              <p>{pillar.text}</p>
            </article>
          </ProductCard>
        ))}
      </ProductSection>

      <ProductSection className="about-highlights-section">
        <p className="eyebrow"><span />WHAT DRIVES OUR PLATFORM</p>
        <h2>Built on four core principles.</h2>
        <div className="about-highlights-grid">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <ProductCard key={item.title} index={index}>
                <div className="about-highlight-card">
                  <div className="about-highlight-icon">
                    <Icon size={20} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </ProductCard>
            );
          })}
        </div>
      </ProductSection>

      <ProductSection className="product-use-case">
        <div>
          <p className="eyebrow">THE ROAD AHEAD</p>
          <h2>Growing with your team.</h2>
        </div>
        <div>
          <p>
            Whether you are making your first core hire or managing rolling searches across multiple departments, Wellgenz is designed to scale with your team’s ambition.
          </p>
          <p>
            We continue to refine our AI matching, interview workflows, and career portals with one relentless benchmark: does this give hiring teams more clarity and candidates a better experience?
          </p>
        </div>
      </ProductSection>
    </InformationPage>
  );
}

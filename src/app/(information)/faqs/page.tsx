import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-seo";
import { InformationPage } from "@/components/information-page";
import { ProductSection } from "@/components/product-motion";
import { FaqAccordion } from "@/components/faq-accordion";
import { faqs } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/faqs");

const groups = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      faqs[0],
      faqs[7],
      {
        question: "Who is Wellgenz for?",
        answer:
          "Wellgenz is designed for HR teams, recruiters, and companies managing their hiring. The platform connects publishing jobs, reviewing applicants, coordinating interviews, and communicating hiring outcomes.",
      },
    ],
  },
  {
    id: "applications",
    title: "Applications and matching",
    items: [faqs[1], faqs[2], faqs[3], faqs[6]],
  },
  {
    id: "coordination",
    title: "Interviews and communication",
    items: [
      faqs[4],
      faqs[5],
      {
        question: "Can we keep notes on candidates?",
        answer:
          "Yes. Candidate notes keep relevant review context alongside the person’s application so your team can refer to previous observations as hiring progresses.",
      },
    ],
  },
  {
    id: "team",
    title: "Team access and visibility",
    items: [
      {
        question: "Can we control who sees and edits hiring information?",
        answer:
          "Yes. Role-based access controls who can view and edit hiring information. Use the available access settings in your recruitment application to align permissions with team responsibilities.",
      },
      {
        question: "What can we see in the hiring dashboard?",
        answer:
          "The dashboard includes hiring counts and a recruitment funnel. It helps your team understand active hiring activity and where applicants are in the process, alongside the applicant pipeline board.",
      },
      {
        question: "Does an AI score make the hiring decision?",
        answer:
          "No. A match score compares a profile with job-specific criteria and supports your review. Your team should consider the resume, relevant evidence, and interviews when deciding how to proceed.",
      },
    ],
  },
];

export default function FAQs() {
  return (
    <InformationPage
      name="FAQs"
      eyebrow="RECRUITMENT PRODUCT HELP"
      title={
        <>
          Wellgenz FAQs.
          <br />
          <em>Practical answers.</em>
        </>
      }
      intro="Find answers by topic: getting started, receiving applications, configuring matching, coordinating interviews, and managing your team’s access."
    >
      {groups.map((group, groupIdx) => (
        <ProductSection key={group.id} id={group.id} className="info-faqs section-anchor">
          <h2>{group.title}</h2>
          <div className="faq-list">
            <FaqAccordion items={group.items} defaultFirstOpen={groupIdx === 0} />
          </div>
        </ProductSection>
      ))}
    </InformationPage>
  );
}

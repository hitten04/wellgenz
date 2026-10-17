import { faqs } from "./site";

export type FAQGroup = {
  id: string; title: string; label: string; description: string;
  items: { question: string; answer: string }[];
};

export const faqGroups: FAQGroup[] = [
  {
    id: "getting-started",
    label: "Getting started",
    description: "Learn what the platform does and where your team gets to work.",
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
    label: "Applications & AI",
    description: "Explore intake channels, matching criteria, and building a shortlist.",
    title: "Applications and matching",
    items: [faqs[1], faqs[2], faqs[3], faqs[6]],
  },
  {
    id: "coordination",
    label: "Interviews & email",
    description: "Prepare conversations and keep candidates informed as hiring progresses.",
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
    label: "Teams & visibility",
    description: "Understand permissions, hiring counts, and the people making decisions.",
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


const normalize = (value: string) => value.trim().replace(/\s+/g, " ").toLocaleLowerCase("en");

export function filterFAQGroups(query: string, category = "all"): FAQGroup[] {
  const search = normalize(query);
  return faqGroups
    .filter(group => category === "all" || group.id === category)
    .map(group => ({ ...group, items: group.items.filter(item => !search || normalize(`${item.question} ${item.answer}`).includes(search)) }))
    .filter(group => group.items.length > 0);
}

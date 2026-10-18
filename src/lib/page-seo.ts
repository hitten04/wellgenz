import type { Metadata } from "next";
import { site } from "./site";

type PageSEO = { title: string; description: string; index?: boolean; follow?: boolean };

// Each route has its own search intent and summary; titles receive the brand once.
export const pageSEO: Record<string, PageSEO> = {
  "/": { title: "AI Recruitment Software & Applicant Tracking", description: "Manage jobs, track applicants, match resumes with AI, schedule Meet or Zoom interviews, and automate hiring emails with Wellgenz recruitment software." },
  "/features": { title: "Recruitment Software Features & Hiring Tools", description: "Compare eight Wellgenz hiring tools: job posting, career pages, applicant tracking, resume parsing, candidate scoring, notes, permissions, and analytics." },
  "/how-it-works": { title: "How It Works: From Job Posting to Offer", description: "Follow six recruitment steps in Wellgenz: define a role, publish jobs, collect resumes, shortlist candidates, schedule interviews, and send hiring updates." },
  "/why-wellgenz": { title: "Why Choose Our Recruitment Platform", description: "See how Wellgenz supports HR teams, recruiters, and growing companies with shared candidate context, human-led decisions, and coordinated hiring workflows." },
  "/about-us": { title: "About Us: Our Approach to Hiring Software", description: "Learn why Wellgenz is building recruitment software around useful candidate information, responsible AI assistance, and a more thoughtful hiring experience." },
  "/contact-us": { title: "Contact Our Recruitment Software Team", description: "Contact Wellgenz about product walkthroughs, recruitment workflows, setup questions, or partnerships. Prepare an email with details about your hiring needs." },
  "/faqs": { title: "Recruitment Software FAQs & Product Help", description: "Find practical answers about Wellgenz setup, resume parsing, AI matching, branded career pages, interview scheduling, hiring emails, and team permissions." },
  "/features/job-management": { title: "Job Posting & Recruitment Management Software", description: "Create and edit job posts in Wellgenz, define role requirements, and publish openings to your branded career page without a separate website update." },
  "/features/career-pages": { title: "Branded Career Pages & One-Click Job Publishing", description: "Give candidates a public careers page with your company logo and banner. Share one link and keep job openings updated from the Wellgenz hiring workspace." },
  "/features/applicant-tracking": { title: "Applicant Tracking System & Hiring Pipeline", description: "Track applicants from applied to hired with a Kanban pipeline. Keep candidate profiles, review notes, interview details, and hiring stages together." },
  "/features/resume-parsing": { title: "AI Resume Parsing & Candidate Profiles", description: "Turn uploaded resumes into structured candidate profiles with Wellgenz AI parsing. Review extracted skills, work experience, and education before assessment." },
  "/features/candidate-scoring": { title: "AI Candidate Scoring & Automated Shortlisting", description: "Compare applicants with job-specific criteria, weight skills and experience, and set shortlist thresholds. Use AI match scores to support recruiter review." },
  "/features/candidate-notes": { title: "Candidate Notes & Hiring Team Collaboration", description: "Record role-relevant observations and interview questions on candidate profiles. Help authorized teammates prepare for reviews with useful hiring notes." },
  "/features/role-based-access": { title: "Role-Based Access for Recruitment Teams", description: "Control who can view and edit hiring information in Wellgenz. Match recruitment access to team responsibilities and review permissions as roles change." },
  "/features/hiring-analytics": { title: "Hiring Analytics Dashboard & Recruitment Funnel", description: "Review hiring counts, open roles, applications, and upcoming interviews in Wellgenz. Use the recruitment funnel to identify stages that need attention." },
  "/privacy": { title: "Privacy Policy", description: "Read the Wellgenz privacy policy covering recruitment account information, candidate data, processing purposes, and the choices available to users.", index: false },
  "/terms": { title: "Terms of Service", description: "Review the terms for using Wellgenz recruitment software, including organization accounts, authorized users, platform access, and service responsibilities.", index: false },
  "/500": { title: "Service Error: Please Try Again", description: "Wellgenz encountered an unexpected error. Try again shortly or return to the homepage to continue browsing the recruitment platform.", index: false, follow: false },
};

export function pageMetadata(path: string): Metadata {
  const page = pageSEO[path];
  if (!page) throw new Error(`Missing page metadata for ${path}`);
  const url = `${site.url}${path === "/" ? "/" : `${path}/`}`;
  const title = `${page.title} | ${site.name}`;
  return {
    title: { absolute: title },
    description: page.description,
    alternates: { canonical: url },
    openGraph: { title, description: page.description, url, siteName: site.name, type: "website", images: [{ url: "/images/wellgenz-share-logo-v2.png", width: 1200, height: 1200, alt: "Wellgenz recruitment software" }] },
    twitter: { card: "summary", title, description: page.description, images: ["/images/wellgenz-share-logo-v2.png"] },
    robots: { index: page.index !== false, follow: page.follow !== false },
  };
}

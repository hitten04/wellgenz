type FeatureEditorial = {
  cardIntro: string; workflowHeading: string; faqHeading: [string, string]; relatedHeading: string;
  ctaEyebrow: string; ctaTitle: [string, string]; ctaDescription: string;
};

export const featureEditorial: Record<string, FeatureEditorial> = {
  "job-management": {
    cardIntro: "Prepare job descriptions, update role requirements, and publish vacancies from the same place you manage applicants.",
    workflowHeading: "From role brief to published vacancy.", faqHeading: ["Job publishing.", "The practical details."], relatedHeading: "Where a published role goes next.",
    ctaEyebrow: "Prepare your next opening", ctaTitle: ["Give the role", "a strong start."], ctaDescription: "Create a job brief that gives candidates and reviewers a useful reference from day one.",
  },
  "career-pages": {
    cardIntro: "Present open positions under your company identity and give prospective applicants one careers link to explore.",
    workflowHeading: "Brand the page. Publish. Share.", faqHeading: ["Your careers page.", "Publishing explained."], relatedHeading: "Connect the careers page to hiring.",
    ctaEyebrow: "Put opportunities in reach", ctaTitle: ["Open the door", "to your company."], ctaDescription: "Let candidates discover current vacancies through a branded page your recruiters can maintain.",
  },
  "applicant-tracking": {
    cardIntro: "See which applicants are new, shortlisted, interviewing, or approaching an offer in a shared recruitment board.",
    workflowHeading: "Receive applicants. Review. Progress.", faqHeading: ["Applicant tracking.", "Stages made clear."], relatedHeading: "Add context to your pipeline.",
    ctaEyebrow: "Keep applications moving", ctaTitle: ["Know the stage.", "Plan the next step."], ctaDescription: "Open your hiring pipeline to review candidate progress and prepare the next action.",
  },
  "resume-parsing": {
    cardIntro: "Extract skills, experience, and education from resumes so review can begin with an organized candidate profile.",
    workflowHeading: "From uploaded resume to reviewable profile.", faqHeading: ["Resume parsing.", "What to expect."], relatedHeading: "Use the details in your review.",
    ctaEyebrow: "Start with the resume", ctaTitle: ["Bring the details", "into view."], ctaDescription: "Use structured resume information to prepare a closer assessment of each applicant.",
  },
  "candidate-scoring": {
    cardIntro: "Apply role-specific matching weights and shortlist thresholds to organize which applicants need a closer look.",
    workflowHeading: "Set criteria. Compare matches. Shortlist.", faqHeading: ["Matching scores.", "Rules and thresholds."], relatedHeading: "Consider the profile behind the match.",
    ctaEyebrow: "Review fit with purpose", ctaTitle: ["Set the criteria.", "Explore the fit."], ctaDescription: "Configure matching around the opening and use the evidence to guide your shortlist review.",
  },
  "candidate-notes": {
    cardIntro: "Save observations and follow-up questions with each applicant so the next reviewer can prepare their conversation.",
    workflowHeading: "Observe. Record. Prepare the handoff.", faqHeading: ["Candidate notes.", "Useful review context."], relatedHeading: "Put team observations to work.",
    ctaEyebrow: "Make your next handoff useful", ctaTitle: ["Capture the insight.", "Continue the discussion."], ctaDescription: "Keep relevant observations with the application so colleagues can build on the review already done.",
  },
  "role-based-access": {
    cardIntro: "Align viewing and editing permissions with the responsibilities of recruiters, HR colleagues, and other hiring participants.",
    workflowHeading: "Assign access. Review responsibilities.", faqHeading: ["Hiring permissions.", "Access with purpose."], relatedHeading: "Support the people doing the review.",
    ctaEyebrow: "Coordinate your hiring team", ctaTitle: ["Define the role.", "Set the access."], ctaDescription: "Review who participates in hiring and align available permissions with the work they need to do.",
  },
  "hiring-analytics": {
    cardIntro: "Check recruitment counts and the hiring funnel to decide where your team should focus its next pipeline discussion.",
    workflowHeading: "Read the counts. Check the funnel. Discuss.", faqHeading: ["Hiring analytics.", "Reading the picture."], relatedHeading: "Explore what sits behind the counts.",
    ctaEyebrow: "Prepare your hiring check-in", ctaTitle: ["See the activity.", "Focus the discussion."], ctaDescription: "Use the dashboard and recruitment funnel to choose which openings or stages need a closer review.",
  },
};

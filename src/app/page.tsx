import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, CalendarDays, ChartNoAxesCombined, Check, GitBranch, ScanText, SlidersHorizontal, Sparkles, UsersRound } from "lucide-react";
import { AppLink, SectionHeading } from "@/components/ui";
import { PipelineVisual } from "@/components/product-visuals";
import { MatchingDemo } from "@/components/matching-demo";
import { HomeHeroArt } from "@/components/home-hero-art";
import { HiringStudio } from "@/components/hiring-studio";
import "./home-refresh.css";
import { ConnectedWorkflow } from "@/components/connected-workflow";
import { Benefits } from "@/components/benefits";
import { Reveal } from "@/components/reveal";
import { FaqAccordion } from "@/components/faq-accordion";
import { ProductProgress } from "@/components/product-motion";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const steps = [
  { number: "01", title: "Define the role", text: "Set your role requirements and publish to your career page in one click.", icon: BriefcaseBusiness, outcome: "A published role with its own matching criteria." },
  { number: "02", title: "Welcome applicants", text: "Collect resumes from your career page or email and turn them into candidate profiles.", icon: ScanText, outcome: "One candidate view across application channels." },
  { number: "03", title: "Find the fit", text: "Review match scores and shortlists, then send candidates an automated update.", icon: Sparkles, outcome: "A focused shortlist with evidence to review." },
  { number: "04", title: "Move hiring forward", text: "Schedule Meet or Zoom interviews and send offer letters or application updates.", icon: GitBranch, outcome: "A clear next step for the team and candidate." },
];

export default function Home() {
  return (
    <main id="main">
      <ProductProgress />
      <section id="top" className="hero section-anchor home-editorial-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true" />People first. Process connected.</p>
            <h1>Great <span>hiring.</span><br />Less busywork.</h1>
            <p className="hero-description">From the first resume to the final offer. Publish jobs, match candidates, schedule interviews, and automate hiring emails in one workspace.</p>
            <div className="hero-actions">
              <AppLink>Access Dashboard</AppLink>
              <a className="text-link" href="#how-it-works">See how it works <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
            <div className="hero-capabilities">
              <span>AI matching</span>
              <span>Meet + Zoom</span>
              <span>Hiring emails</span>
            </div>
            <p className="hero-footnote">AI-powered. Human-led.</p>
          </div>
          <HomeHeroArt />
        </div>
      </section>

      <section id="features" className="section section-anchor">
        <div className="container">
          <Reveal>
            <div className="section-intro">
              <SectionHeading eyebrow="The entire picture" title={<>Less chasing.<br /><span>More connecting.</span></>}>
                Applications, candidate context, and communication belong in the same journey. Give every role a clear process and every candidate a considered next step.
              </SectionHeading>
              <span className="section-index" aria-hidden="true">01 / CAPABILITIES</span>
            </div>
          </Reveal>
          <Reveal><HiringStudio /></Reveal>
          <div className="features-grid editorial-capabilities">
            <Reveal className="feature-card compact-card" delay={0.15}>
              <span className="feature-icon"><BriefcaseBusiness size={21} /></span>
              <h3>A home for every opening.</h3>
              <p>Create and manage openings with skills, experience, and education requirements. Set matching rules for each job and publish it to your career portal with one click.</p>
              <div className="mini-job">
                <span className="tiny-dot" />
                <span>Frontend engineer</span>
                <span>Published</span>
              </div>
            </Reveal>

            <Reveal className="feature-card compact-card" delay={0.2}>
              <span className="feature-icon"><CalendarDays size={21} /></span>
              <h3>Make the next step clear.</h3>
              <p>Coordinate online interviews through Google Meet or Zoom. Keep the candidate, interviewer, date, time, and meeting link connected to the hiring workflow.</p>
              <div className="mini-interview">
                <span className="calendar-date">12<span>OCT</span></span>
                <div>
                  <strong>Design conversation</strong>
                  <span>Illustrative interview</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="feature-card compact-card" delay={0.25}>
              <span className="feature-icon"><ChartNoAxesCombined size={21} /></span>
              <h3>See hiring in perspective.</h3>
              <p>See active roles, candidate applications, and upcoming interviews together. Follow the recruitment funnel to understand where people are and which stages need your team’s attention.</p>
              <div className="mini-chart" aria-hidden="true">
                {[28, 49, 38, 70, 56, 86, 74, 100].map((height, i) => (
                  <span key={i} style={{ height: `${height}%` }} />
                ))}
              </div>
              <small className="chart-label">Illustrative analytics</small>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section workflow-section section-anchor editorial-workflow">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="From hello to hired" title={<>One role.<br /><span>One connected journey.</span></>}>
              Start with the role, welcome applications through your career page or email, and keep matching, meetings, and messages connected all the way through.
            </SectionHeading>
          </Reveal>
          <div className="steps editorial-steps">
            {steps.map((step, idx) => (
              <Reveal className="step" key={step.number} delay={idx * 0.08}>
                <div className="step-top">
                  <span>{step.number}</span>
                  <span className="journey-symbol"><step.icon size={42} strokeWidth={1.2} aria-hidden="true" /><span className="journey-symbol-spark" aria-hidden="true">✦</span></span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <div className="step-outcome">
                  <Check size={14} aria-hidden="true" />
                  <span>{step.outcome}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="ai-matching" className="section matching-section section-anchor">
        <div className="container">
          <Reveal>
            <div className="matching-intro">
              <SectionHeading light eyebrow="Intelligence with intention" title={<>Less sifting.<br /><span>More seeing potential.</span></>}>
                Match candidates against what your role actually needs. Weight skills, experience, and education, then set a shortlist threshold for that opening. Explore the evidence behind the score before choosing the next conversation.
              </SectionHeading>
              <div className="matching-principles">
                <p><SlidersHorizontal size={18} />Your criteria. Your weights.</p>
                <p><Sparkles size={18} />Automatic shortlisting.</p>
                <p><UsersRound size={18} />Your team makes the call.</p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <MatchingDemo />
          </Reveal>
        </div>
      </section>

      <section id="pipeline" className="section pipeline-section section-anchor">
        <div className="container">
          <Reveal>
            <div className="section-intro">
              <SectionHeading eyebrow="Every person. Every stage." title={<>A pipeline with<br /><span>a clear point of view.</span></>}>
                Move from new applications to shortlists, interviews, offers, and hiring outcomes with a Kanban view. Keep parsed profiles and recruitment stages connected, and pair each next step with the candidate communication it needs.
              </SectionHeading>
              <span className="section-index" aria-hidden="true">02 / THE JOURNEY</span>
            </div>
          </Reveal>
          <Reveal>
            <PipelineVisual />
          </Reveal>
          <div className="pipeline-notes">
            <span><Check size={16} />Kanban recruitment stages</span>
            <span><Check size={16} />Centralized candidate profiles</span>
            <span><Check size={16} />Interview coordination</span>
          </div>
          <div className="pipeline-context">
            <article>
              <span>01 / CANDIDATE CONTEXT</span>
              <h3>Keep the person in the picture.</h3>
              <p>Review parsed experience and relevant skills alongside the application stage, so the next conversation starts with context.</p>
            </article>
            <article>
              <span>02 / TEAM FOCUS</span>
              <h3>Know what needs attention.</h3>
              <p>Use the recruitment pipeline to see who is ready for review, who is interviewing, and where a hiring decision is next.</p>
            </article>
            <article>
              <span>03 / FOLLOW-THROUGH</span>
              <h3>Connect progress to communication.</h3>
              <p>Carry the journey forward with shortlist updates, interview details, offer letters, and rejection emails.</p>
            </article>
          </div>
        </div>
      </section>

      <ConnectedWorkflow />

      <section id="why-wellgenz" className="section benefits-section section-anchor">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Built around your people" title={<>For the teams<br /><span>building what’s next.</span></>}>
              For HR teams coordinating the process, recruiters reviewing the fit, and companies opening their next chapter. Bring the work, context, and communication together.
            </SectionHeading>
          </Reveal>
          <Reveal>
            <Benefits />
          </Reveal>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <Reveal className="cta-card">
            <div className="cta-orbit" aria-hidden="true" />
            <p className="eyebrow"><span aria-hidden="true" />People today. Possibilities tomorrow.</p>
            <h2>Your next great hire<br />starts with <em>a clearer view.</em></h2>
            <p>Publish your next opening, welcome resumes from your portal or inbox, and bring matching, interviews, and candidate emails into one connected journey.</p>
            <AppLink light>Access Dashboard</AppLink>
            <span className="cta-note">Continue to app.wellgenz.com <ArrowUpRight size={13} aria-hidden="true" /></span>
          </Reveal>
        </div>
      </section>

      <section id="faqs" className="section faq-section section-anchor">
        <div className="container faq-layout">
          <SectionHeading eyebrow="A little more clarity" title={<>Good questions.<br /><span>Clear answers.</span></>}>
            Understand how applications, matching, interviews, emails, and career portals fit together.
          </SectionHeading>
          <div className="faq-list">
            <FaqAccordion items={faqs} defaultFirstOpen />
            <a className="text-link faq-app-link" href={site.appUrl}>
              Explore the application <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

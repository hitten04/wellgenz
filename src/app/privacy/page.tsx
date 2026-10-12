import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Wellgenz",
  description: "This policy explains what Wellgenz collects, why, and the choices you have regarding your data.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="13 October 2026">
      <p>
        This policy explains what Wellgenz collects, why, and the choices you have. It is written for the individuals who use Wellgenz at work and for the candidates whose information our customers manage in our platform.
      </p>

      <section>
        <h2>1. Who we are</h2>
        <p>
          Wellgenz provides cloud-based recruitment, candidate screening, and hiring workflow software. For any questions or inquiries about our privacy practices, please contact our team at{" "}
          <a href="mailto:privacy@wellgenz.com">privacy@wellgenz.com</a>.
        </p>
      </section>

      <section>
        <h2>2. Two roles: controller and processor</h2>
        <p>
          For the accounts of individuals who sign in directly to manage hiring (recruiters, interviewers, hiring managers, administrators), Wellgenz acts as the data fiduciary / controller.
        </p>
        <p>
          For candidate data that our customers upload, import from career pages, or receive into their hiring workspace, the customer is the data controller and Wellgenz acts as a data processor: we process that data strictly under our customer's instructions and our{" "}
          <Link href="/terms">Terms of Service</Link>.
        </p>
      </section>

      <section>
        <h2>3. What we collect</h2>
        <h3>Account data</h3>
        <p>
          Name, work email, encrypted credentials, organisation name, role, and optional single sign-on identifiers.
        </p>
        <p>
          Sign-in metadata: IP address, device browser type, and timestamps maintained for security and audit integrity.
        </p>

        <h3>Candidate data (processed on behalf of customers)</h3>
        <p>
          Information added or imported by our customers: candidate names, contact details, resume documents, work experience, education history, skills, notes, interview feedback, and recruitment pipeline stages.
        </p>
        <p>
          Structured profile attributes derived from uploaded resumes via AI parsing, stored alongside original files.
        </p>

        <h3>Usage and billing</h3>
        <p>
          Feature usage metrics and diagnostic logs used to maintain platform stability and improve performance.
        </p>
        <p>
          Billing information and transaction invoices. Card and payment credentials are processed directly by verified payment partners and are never stored on our servers.
        </p>
      </section>

      <section>
        <h2>4. How we use data</h2>
        <p>
          To provide core platform features: candidate pipelines, resume search, interview scheduling, notifications, and candidate communication triggered by your team.
        </p>
        <p>
          To deliver AI capabilities: resume text is processed through secure AI APIs solely to extract structured fields and score alignment against job requirements. Customer data is never used to train public AI models.
        </p>
        <p>
          To send transactional communications: invitation links, verification messages, interview confirmations, and automated candidate updates.
        </p>
        <p>
          To maintain security: anomaly detection, access controls, audit tracking, and system backups.
        </p>
        <p>
          We do not sell personal information, and we do not pool candidate records across customer accounts. Each organisation's workspace is strictly isolated.
        </p>
      </section>

      <section>
        <h2>5. Infrastructure and sub-processors</h2>
        <p>
          Wellgenz utilizes enterprise cloud infrastructure with encrypted data storage, automated backups, and established cloud sub-processors for hosting, secure AI processing, and transactional messaging.
        </p>
      </section>

      <section>
        <h2>6. Retention</h2>
        <p>
          Customer workspaces are maintained for the active duration of the account. Upon account closure, workspace data is retained for 90 days before permanent deletion unless earlier removal is requested.
        </p>
        <p>
          Deleted candidate records remain recoverable within your workspace for 30 days before permanent purging.
        </p>
        <p>
          Audit logs are retained for 12 months for security compliance; rolling backups are kept for 14 days.
        </p>
      </section>

      <section>
        <h2>7. Your rights</h2>
        <p>
          Account holders can review, edit, or export their profile and workspace data at any time from Settings, or request account closure. Candidates wishing to access, rectify, or erase information held about them by one of our customers should contact that customer directly; where requests reach us, we assist in forwarding them to the relevant organisation. You may also contact our team at{" "}
          <a href="mailto:privacy@wellgenz.com">privacy@wellgenz.com</a>.
        </p>
      </section>

      <section>
        <h2>8. Cookies</h2>
        <p>
          We use strictly necessary cookies to maintain secure sign-in sessions (scoped to wellgenz.com) and user interface preferences. We do not use third-party cross-site advertising cookies.
        </p>
      </section>

      <section>
        <h2>9. Security</h2>
        <p>
          We employ industry-standard security measures including TLS 1.2+ encryption in transit, encryption at rest, organisation-level tenant isolation, role-based permissions, signed time-limited file links, and immutable audit logging. Learn more on our{" "}
          <Link href="/features">Features & Security</Link> page.
        </p>
      </section>

      <section>
        <h2>10. Children</h2>
        <p>
          Wellgenz is an enterprise recruitment platform designed exclusively for professional workplaces and adults.
        </p>
      </section>

      <section>
        <h2>11. Changes to this policy</h2>
        <p>
          We may update this policy periodically to reflect platform enhancements or legal requirements. Material modifications will be posted here and notified to workspace administrators.
        </p>
      </section>
    </LegalPage>
  );
}

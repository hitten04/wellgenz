import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: "Terms of Service | Wellgenz",
  description: "These terms govern the use of the Wellgenz recruitment platform by organisations and authorised users.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="13 October 2026">
      <p>
        These terms govern the use of Wellgenz by organisations and the individuals they authorise. By creating an organisation account, accessing the platform, or accepting an invitation, you agree to these terms on behalf of your organisation.
      </p>

      <section>
        <h2>1. The service</h2>
        <p>
          Wellgenz (“the Service”, “we”, “us”, or “our”) is an end-to-end recruitment platform. It includes candidate databases, hiring pipelines, AI resume parsing, candidate scoring and matching, online interview scheduling (Google Meet and Zoom), automated hiring communication, branded company career pages, and related recruitment capabilities described on{" "}
          <Link href="/">wellgenz.com</Link> and{" "}
          <a href="https://app.wellgenz.com" target="_blank" rel="noopener noreferrer">app.wellgenz.com</a>.
        </p>
      </section>

      <section>
        <h2>2. Accounts and organisations</h2>
        <p>
          An organisation workspace is created by its Owner or Administrator, who is responsible for the organisation's use of the Service and for the team members invited to the workspace.
        </p>
        <p>
          Each team member must use their own unique credentials. Keep them strictly confidential and notify us immediately of any suspected unauthorised access.
        </p>
        <p>
          You must be at least 18 years of age and legally authorised to bind your organisation to these terms.
        </p>
      </section>

      <section>
        <h2>3. Plans, trials and payment</h2>
        <p>
          New organisations receive a 14-day trial. When the trial period ends without an active paid plan, the workspace transitions to read-only access, with data retained for 90 days before deletion.
        </p>
        <p>
          Paid plans are billed monthly or annually in advance for your selected tier, seats, and candidate processing quotas. Pricing details are confirmed on your invoice or billing dashboard and may be updated with at least 30 days' notice prior to renewal.
        </p>
        <p>
          Seats or quotas added mid-billing cycle are billed pro-rata at the next renewal. Online payments are handled via secure third-party payment gateways; we do not store sensitive payment card information on our servers.
        </p>
        <p>
          Refund requests are reviewed by our team under our{" "}
          <Link href="/contact-us">Customer Support Policy</Link>.
        </p>
      </section>

      <section>
        <h2>4. Your data</h2>
        <p>
          You retain full ownership and intellectual property rights in all data, files, job descriptions, and candidate records you upload or receive into the Service. You grant us a limited, worldwide licence to host, store, process, and back up that data strictly to operate and deliver the Service.
        </p>
        <p>
          You are responsible for ensuring a valid legal basis to collect and store candidate information, including providing required candidate notices under applicable privacy legislation, and for responding to candidate requests. We act as your data processor under our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <p>
          You may export your candidate records and workspace data at any time from workspace Settings and may request complete deletion upon closing your account.
        </p>
      </section>

      <section>
        <h2>5. Acceptable use</h2>
        <p>
          You agree not to use the Service to: store or process personal data without appropriate legal authorisation; send unsolicited bulk messages (spam); scrape or extract third-party content in breach of external terms; upload viruses or harmful code; attempt unauthorised access to other organisations' workspaces; resell or sublicense the Service without written approval; or violate any applicable laws or regulations. We reserve the right to suspend or terminate accounts that violate this section upon notice, or immediately if ongoing harm is detected.
        </p>
      </section>

      <section>
        <h2>6. AI features and matching</h2>
        <p>
          AI resume parsing and candidate matching algorithms generate suggestions and scoring indicators designed to assist human recruiters. They do not constitute automated decision-making or hiring decisions. Your team retains full discretion over hiring outcomes, which must comply with all equal-opportunity and employment laws. We do not use your proprietary candidate records to train public AI models.
        </p>
      </section>

      <section>
        <h2>7. Availability and support</h2>
        <p>
          We target 99.9% monthly service uptime, excluding scheduled maintenance announced in advance. Product support is available by email at{" "}
          <a href="mailto:support@wellgenz.com">support@wellgenz.com</a> on regular business days, with priority assistance for active subscription tiers.
        </p>
      </section>

      <section>
        <h2>8. Intellectual property</h2>
        <p>
          The Service, website, branding, design, software, and documentation remain the exclusive intellectual property of Wellgenz and its licensors. You may not copy, modify, distribute, or reverse-engineer any part of the platform. Any product feedback or recommendations provided to us may be implemented without restriction or compensation.
        </p>
      </section>

      <section>
        <h2>9. Warranties and liability</h2>
        <p>
          The Service is provided on an “as is” and “as available” basis. To the maximum extent permitted by law, we disclaim all implied warranties. Our total aggregate liability for claims arising under these terms in any 12-month period is limited to the fees paid by your organisation to Wellgenz during that period. We are not liable for indirect, incidental, or consequential damages, or for losses arising from candidate hiring choices or third-party service interruptions.
        </p>
      </section>

      <section>
        <h2>10. Termination</h2>
        <p>
          You may cancel your subscription and close your organisation workspace at any time via Settings. We may terminate service for material breach of these terms not remedied within 15 days of written notice, or for non-payment after notice. Upon termination, data is deleted in accordance with our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </section>

      <section>
        <h2>11. Law and disputes</h2>
        <p>
          These terms are governed by applicable law. Any dispute arising out of or related to these terms shall first be subject to good-faith mutual consultation for at least 30 days following written notice before initiating formal legal proceedings.
        </p>
      </section>

      <section>
        <h2>12. Changes to terms</h2>
        <p>
          We may update these terms from time to time. Material updates will be communicated to account Owners via email or dashboard notice at least 14 days before taking effect. Continued use of Wellgenz following the effective date constitutes agreement to the updated terms.
        </p>
      </section>
    </LegalPage>
  );
}

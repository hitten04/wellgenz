import type { ReactNode } from "react";

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}) {
  return (
    <main id="main" className="container legal-page">
      <p className="eyebrow"><span />Legal Notice</p>
      <h1>{title}</h1>
      {lastUpdated && <p className="legal-updated">Last updated {lastUpdated}</p>}
      <div className="legal-notice">
        <strong>Draft — not yet effective.</strong> This placeholder must be completed and approved by the Wellgenz owner before public launch. The operator’s legal identity, contact details, effective date, and applicable terms remain to be confirmed.
      </div>
      {children}
    </main>
  );
}

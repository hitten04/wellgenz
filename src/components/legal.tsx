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
      {children}
    </main>
  );
}

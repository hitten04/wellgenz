// Replace these platform homepages with Wellgenz profile URLs when available.
const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { name: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
  { name: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
];

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "instagram") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
  if (icon === "linkedin") return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5.1" cy="5.2" r="1.8"/><path d="M3.5 8.5h3.2V21H3.5zM9.3 8.5h3.1v1.7c.8-1.3 1.9-2 3.7-2 3.1 0 4.4 1.8 4.4 5.1V21h-3.3v-7c0-1.7-.5-2.8-2-2.8-1.8 0-2.6 1.2-2.6 3.1V21H9.3z"/></svg>;
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.2 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.7 1.8-1.7h1.9V2.5c-.3 0-1.5-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.8v2.4H7.3V13h3.1v9z"/></svg>;
}

export function FooterSocials() {
  return <div className="footer-socials" role="group" aria-label="Social links — profile URLs pending">{socials.map(s => <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" data-placeholder="true" aria-label={`${s.name} (placeholder link; opens in a new tab)`} title={`${s.name} — profile link coming soon`}><SocialIcon icon={s.icon}/></a>)}</div>;
}

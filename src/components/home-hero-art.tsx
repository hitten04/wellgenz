import Image from "next/image";

export function HomeHeroArt() {
  return <figure className="hero-simple-art" aria-label="People and hiring workflows, connected">
    <div className="hero-simple-picture"><Image src="/images/home-hiring-ink-panorama.webp" alt="Four hiring colleagues reviewing a resume and discussing candidates around a flowing paper table, drawn in graphite with subtle violet details" width={2172} height={724} sizes="(max-width: 759px) calc(100vw - 24px), (max-width: 1368px) calc(100vw - 48px), 1320px" priority/></div>
  </figure>;
}

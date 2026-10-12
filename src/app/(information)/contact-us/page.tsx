import type { Metadata } from "next";
import Link from "next/link";
import { Mail, HelpCircle, LayoutDashboard, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { InformationPage } from "@/components/information-page";
import { ProductCard, ProductSection } from "@/components/product-motion";
import { ContactForm } from "@/components/contact-form";
import { ContactHeroHub } from "@/components/contact-hero-hub";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Get in touch with the Wellgenz team. Ask questions about our AI-powered recruitment workspace, schedule a walkthrough, or get support.",
  alternates: { canonical: "/contact-us" },
  openGraph: { title: "Contact us | Wellgenz", url: "/contact-us" },
};

const channels = [
  {
    icon: Mail,
    label: "GENERAL & SUPPORT INQUIRIES",
    title: "Email our team directly.",
    desc: "Have a question about the platform or need help with your setup? Write to us and we’ll get back to you promptly.",
    action: (
      <a href={`mailto:${site.contactEmail}`} className="contact-card-link">
        {site.contactEmail}
        <ArrowUpRight size={15} />
      </a>
    ),
  },
  {
    icon: HelpCircle,
    label: "FREQUENTLY ASKED QUESTIONS",
    title: "Looking for quick answers?",
    desc: "Browse our detailed answers covering resume parsing, candidate scoring, interview links, and company portals.",
    action: (
      <Link href="/faqs" className="contact-card-link">
        Explore FAQs
        <ArrowRight size={15} />
      </Link>
    ),
  },
  {
    icon: LayoutDashboard,
    label: "ACTIVE USERS & RECRUITERS",
    title: "Access your dashboard.",
    desc: "If your organization already has an active hiring workspace, manage your jobs and applicant pipelines directly.",
    action: (
      <a href={site.appUrl} className="contact-card-link">
        Open app.wellgenz.com
        <ArrowUpRight size={15} />
      </a>
    ),
  },
];

export default function ContactUs() {
  return (
    <InformationPage
      name="Contact us"
      eyebrow="GET IN TOUCH"
      title={
        <>
          Let’s talk hiring.
          <br />
          <em>We’re here to help.</em>
        </>
      }
      intro="Have questions about Wellgenz, want to explore how our recruitment tools fit your team, or need help with your hiring workspace? Reach out to our team—we’re here to help."
      heroArt={<ContactHeroHub />}
    >
      <ProductSection className="contact-channels-grid">
        {channels.map((channel, index) => {
          const Icon = channel.icon;
          return (
            <ProductCard key={channel.title} index={index}>
              <article className="contact-channel-card">
                <div className="contact-channel-icon">
                  <Icon size={20} />
                </div>
                <span>{channel.label}</span>
                <h2>{channel.title}</h2>
                <p>{channel.desc}</p>
                {channel.action}
              </article>
            </ProductCard>
          );
        })}
      </ProductSection>

      <ProductSection className="contact-form-section" id="contact-form">
        <div className="contact-main-grid">
          <div className="contact-form-wrap">
            <div className="contact-form-header">
              <p className="eyebrow"><span />SEND US A NOTE</p>
              <h2>How can we assist your team?</h2>
              <p>Fill out the details below and a member of our team will respond within 24 business hours.</p>
            </div>
            <ContactForm />
          </div>

          <div className="contact-location-wrap">
            <div className="contact-location-header">
              <p className="eyebrow"><span />OUR LOCATION</p>
              <h2>Find us in Ahmedabad.</h2>
              <p className="contact-location-address">
                <MapPin size={16} />
                <span>Ahmedabad, Gujarat, India</span>
              </p>
            </div>
            <div className="contact-map-frame">
              <iframe
                title="Wellgenz Location in Ahmedabad"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117506.77209355152!2d72.48398457788448!3d23.02024340798154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="contact-location-footer">
              <span>Connect in person or schedule a video consultation.</span>
            </div>
          </div>
        </div>
      </ProductSection>
    </InformationPage>
  );
}

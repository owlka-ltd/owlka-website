import type { Metadata } from "next";
import { CaseStudies } from "@/components/CaseStudies";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Pricing } from "@/components/Pricing";
import { Waitlist } from "@/components/Waitlist";
import { WhyOwlka } from "@/components/WhyOwlka";
import {
  DEFAULT_TITLE,
  HOME_DESCRIPTION,
  HOME_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

// Homepage overrides the layout description with a richer copy. Next 16
// REPLACES (does not merge) the openGraph and twitter blocks when a
// child route defines them, so we must spell out the full configs here
// or the layout defaults silently drop. Constants come from
// @/lib/seo to keep layout.tsx and page.tsx in lockstep.

export const metadata: Metadata = {
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/",
    title: DEFAULT_TITLE,
    description: HOME_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: HOME_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: DEFAULT_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: HOME_DESCRIPTION,
    images: [HOME_OG_IMAGE],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/owlka-mark.svg`,
  description: HOME_DESCRIPTION,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: HOME_DESCRIPTION,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <CaseStudies />
        <WhyOwlka />
        <Pricing />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}

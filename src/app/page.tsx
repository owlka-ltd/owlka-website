import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import {
  DEFAULT_TITLE,
  HOME_DESCRIPTION,
  HOME_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

// Below-the-fold sections are loaded lazily to keep the initial JS
// hydration bundle small. Each is still SSR'd (no `ssr: false`) so the
// HTML is present for SEO; only the JS chunk is split off.
const CaseStudies = dynamic(() =>
  import("@/components/CaseStudies").then((m) => ({ default: m.CaseStudies })),
);
const WhyOwlka = dynamic(() =>
  import("@/components/WhyOwlka").then((m) => ({ default: m.WhyOwlka })),
);
const Pricing = dynamic(() =>
  import("@/components/Pricing").then((m) => ({ default: m.Pricing })),
);
const Waitlist = dynamic(() =>
  import("@/components/Waitlist").then((m) => ({ default: m.Waitlist })),
);
const Footer = dynamic(() =>
  import("@/components/Footer").then((m) => ({ default: m.Footer })),
);

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

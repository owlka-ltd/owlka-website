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

const HOME_TITLE = "Owlka — Claude Code on your phone";
const HOME_DESCRIPTION =
  "Owlka gives you the full power of Claude Code on your phone. Build websites, build apps, set up persistent monitoring, connect to APIs and databases, do anything a developer could do, all from the comfort of your sofa.";
const OG_IMAGE = "/api/og?title=Owlka&subtitle=Claude+Code+on+your+phone";

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: HOME_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Owlka",
  url: "https://owlka.com",
  logo: "https://owlka.com/owlka-mark.svg",
  description: HOME_DESCRIPTION,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Owlka",
  url: "https://owlka.com",
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

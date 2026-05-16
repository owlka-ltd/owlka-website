import { CaseStudies } from "@/components/CaseStudies";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Pricing } from "@/components/Pricing";
import { Waitlist } from "@/components/Waitlist";
import { WhyOwlka } from "@/components/WhyOwlka";

export default function Home() {
  return (
    <>
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

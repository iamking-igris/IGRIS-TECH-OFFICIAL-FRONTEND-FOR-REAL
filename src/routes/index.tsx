import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/about/about-section";
import { CtaBand } from "@/components/contact/cta-band";
import { EcosystemSection } from "@/components/ecosystem/ecosystem-section";
import { HomeHero } from "@/components/hero/home-hero";
import { ProcessSection } from "@/components/process/process-section";
import { WorkSection } from "@/components/projects/work-section";
import { JsonLd } from "@/components/seo/json-ld";
import { ServicesSection } from "@/components/services/services-section";
import { ReviewsSection } from "@/components/testimonials/reviews-section";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import Seo from "@/components/seo/Seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "IGRIS Tech — Digital Products, Web Development & Software",
      description:
        "IGRIS Tech builds websites, software, AI solutions, and automation for individuals, brands, and businesses.",
      path: "/",
    }),
  component: Home,
});

function Home() {
  return (
    <main id="main">
      <Seo />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <HomeHero />
      <ServicesSection />
      <WorkSection />
      <ReviewsSection />
      <ProcessSection />
      <EcosystemSection />
      <AboutSection />
      <CtaBand kicker="Contact / 07" />
    </main>
  );
}

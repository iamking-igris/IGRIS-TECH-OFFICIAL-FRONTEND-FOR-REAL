import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand } from "@/components/contact/cta-band";
import { Container } from "@/components/page/container";
import { PageHeader } from "@/components/page/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { TeamSection } from "@/components/team/team-section";
import { aboutChapters } from "@/data/about";
import { breadcrumbJsonLd, organizationJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About IGRIS Tech",
      description:
        "IGRIS Tech helps people and businesses turn ideas into digital products while building technology of its own.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main id="main">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHeader
        kicker="About"
        title="A technology company that builds — for clients, and for itself."
        description="IGRIS Tech helps people and businesses turn ideas into digital products while building the experience and foundation needed to eventually create technology of its own."
      />
      <section className="border-b border-hairline">
        <Container className="py-16 md:py-24">
          <ol className="grid gap-0">
            {aboutChapters.map((chapter) => (
              <li
                key={chapter.index}
                className="grid gap-4 border-t border-hairline py-10 last:border-b md:grid-cols-12 md:gap-10"
              >
                <div className="md:col-span-4">
                  <p className="font-mono text-xs tracking-widest text-faint">
                    {chapter.index}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
                    {chapter.name}
                  </h2>
                </div>
                <p className="text-base leading-relaxed text-quiet md:col-span-7 md:text-lg">
                  {chapter.text}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-6 text-sm">
            <Link to="/services" className="underline-offset-4 hover:underline">
              Services
            </Link>
            <Link to="/work" className="underline-offset-4 hover:underline">
              Work
            </Link>
            <Link to="/ecosystem" className="underline-offset-4 hover:underline">
              Ecosystem
            </Link>
            <Link to="/contact" className="underline-offset-4 hover:underline">
              Contact
            </Link>
          </div>
        </Container>
      </section>
      <TeamSection />
      <CtaBand />
    </main>
  );
}

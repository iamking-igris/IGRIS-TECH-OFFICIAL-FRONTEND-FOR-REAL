import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand } from "@/components/contact/cta-band";
import { Container } from "@/components/page/container";
import { PageHeader } from "@/components/page/page-header";
import { ProcessSection } from "@/components/process/process-section";
import { JsonLd } from "@/components/seo/json-ld";
import { servicesFaq } from "@/data/faq";
import { services, supportingCapabilities } from "@/data/services";
import { useFeaturedProjects } from "@/lib/content";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () =>
    pageHead({
      title: "Services — Web Development, Software, AI & Automation | IGRIS Tech",
      description:
        "Web development, software development, AI solutions, and automation from IGRIS Tech. Hire a team to design, build, and launch digital products.",
      path: "/services",
    }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const work = useFeaturedProjects();

  return (
    <main id="main">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHeader
        kicker="Services"
        title="Capabilities, not a catalogue of buzzwords."
        description="Four focused services. Hire IGRIS Tech to design, build, and launch digital products."
      />

      <section className="border-b border-hairline">
        <Container className="py-16">
          <ul>
            {services.map((service) => (
              <li key={service.slug} className="border-t border-hairline last:border-b">
                <Link
                  to={service.href}
                  className="group grid gap-4 py-10 md:grid-cols-12 md:items-start"
                >
                  <span className="font-mono text-xs tracking-widest text-faint md:col-span-2">
                    {service.index}
                  </span>
                  <span className="md:col-span-4">
                    <span className="font-display text-3xl font-semibold tracking-[-0.03em]">
                      {service.name}
                    </span>
                  </span>
                  <span className="text-sm leading-relaxed text-quiet md:col-span-5">
                    {service.short}
                    <span className="mt-2 block text-faint">{service.problem}</span>
                  </span>
                  <span className="text-sm text-ink md:col-span-1 md:text-right">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-hairline">
        <Container className="py-16">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
            Around the work
          </h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {supportingCapabilities.map((item) => (
              <li key={item.name} className="border-t border-hairline pt-6">
                <h3 className="font-display text-xl font-semibold">{item.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-quiet">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ProcessSection />

      {work.length > 0 && (
        <section className="border-b border-hairline">
          <Container className="py-16">
            <h2 className="font-display text-2xl font-semibold">Relevant work</h2>
            <ul className="mt-8">
              {work.map((project) => (
                <li key={project.slug} className="border-t border-hairline py-5 last:border-b">
                  <Link
                    to="/work/$slug"
                    params={{ slug: project.slug }}
                    className="flex flex-wrap items-baseline justify-between gap-3"
                  >
                    <span className="font-display text-xl font-semibold">{project.title}</span>
                    <span className="text-sm text-quiet">{project.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="border-b border-hairline">
        <Container className="py-16">
          <h2 className="font-display text-2xl font-semibold">Questions</h2>
          <dl className="mt-8">
            {servicesFaq.map((item) => (
              <div key={item.q} className="border-t border-hairline py-6 last:border-b">
                <dt className="font-display text-lg font-semibold">{item.q}</dt>
                <dd className="mt-3 max-w-2xl text-sm leading-relaxed text-quiet">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CtaBand />
    </main>
  );
}

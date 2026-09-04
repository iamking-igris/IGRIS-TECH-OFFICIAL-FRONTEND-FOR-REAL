import { Link } from "@tanstack/react-router";
import { ButtonLink } from "@/components/ui/button-link";
import { CtaBand } from "@/components/contact/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/page/page-header";
import { Container } from "@/components/page/container";
import { ProcessSection } from "@/components/process/process-section";
import type { Service } from "@/data/services";
import { useFeaturedProjects } from "@/lib/content";
import { servicesFaq } from "@/data/faq";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

export function ServicePage({ service }: { service: Service }) {
  const related = useFeaturedProjects().filter((p) =>
    p.services.includes(service.slug),
  );

  return (
    <main id="main">
      <JsonLd
        data={serviceJsonLd(
          service.name,
          service.description,
          absoluteUrl(service.href),
        )}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: service.href },
        ])}
      />
      <PageHeader
        kicker={`Services / ${service.index}`}
        title={service.name}
        description={service.description}
      />
      <section className="border-b border-hairline">
        <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-7">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">
              The problem
            </h2>
            <p className="mt-4 leading-relaxed text-quiet">{service.problem}</p>
            <h2 className="mt-12 font-display text-2xl font-semibold tracking-[-0.03em]">
              Who it’s for
            </h2>
            <p className="mt-4 leading-relaxed text-quiet">{service.forWhom}</p>
            <h2 className="mt-12 font-display text-2xl font-semibold tracking-[-0.03em]">
              What’s included
            </h2>
            <ul className="mt-6">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="border-t border-hairline py-4 text-sm text-ink last:border-b"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <aside className="md:col-span-5">
            <div className="border border-hairline p-6 md:sticky md:top-28">
              <p className="text-sm leading-relaxed text-quiet">
                If this is the work you need, start a project and we’ll review
                the brief with you.
              </p>
              <ButtonLink to="/contact" variant="primary" className="mt-6">
                Start a Project
              </ButtonLink>
              <Link
                to="/work"
                className="mt-4 inline-flex items-center gap-2 text-sm text-ink"
              >
                Explore our work
                <span className="btn-arrow" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </aside>
        </Container>
      </section>

      <ProcessSection />

      {related.length > 0 && (
        <section className="border-b border-hairline">
          <Container className="py-16">
            <h2 className="font-display text-2xl font-semibold">Related work</h2>
            <ul className="mt-8">
              {related.map((project) => (
                <li key={project.slug} className="border-t border-hairline py-5 last:border-b">
                  <Link
                    to="/work/$slug"
                    params={{ slug: project.slug }}
                    className="flex items-center justify-between gap-4"
                  >
                    <span>
                      <span className="block font-display text-xl font-semibold">
                        {project.title}
                      </span>
                      <span className="text-sm text-quiet">{project.category}</span>
                    </span>
                    <span className="btn-arrow" aria-hidden>
                      →
                    </span>
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

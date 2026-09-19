import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand } from "@/components/contact/cta-band";
import { Container } from "@/components/page/container";
import { PageHeader } from "@/components/page/page-header";
import { StatusChip } from "@/components/page/status-chip";
import { JsonLd } from "@/components/seo/json-ld";
import Seo from "@/components/seo/Seo";
import { FUTURE_PRODUCTS_NOTE, usePublishedEcosystem } from "@/lib/content";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/ecosystem")({
  head: () =>
    pageHead({
      title: "The IGRIS Ecosystem — IGRIS Tech",
      description:
        "Products built by IGRIS Tech, including IGRIS Hosting and IGRIS Studio. IGRIS Tech is the parent technology brand.",
      path: "/ecosystem",
    }),
  component: EcosystemPage,
});

function EcosystemPage() {
  const ecosystemProducts = usePublishedEcosystem();

  return (
    <main id="main">
      <Seo path="/ecosystem" title="Ecosystem — IGRIS Tech" description="Products built by IGRIS Tech, including IGRIS Hosting and IGRIS Studio." />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Ecosystem", path: "/ecosystem" },
        ])}
      />
      <PageHeader
        kicker="Ecosystem"
        title="Products we build for ourselves."
        description="IGRIS Tech is the parent technology brand. Client work keeps us close to real problems. In parallel we are building products of our own — each will live on its own subdomain when it is ready."
      />
      <section className="border-b border-hairline">
        <Container className="py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="border-t border-hairline pt-6 md:col-span-4">
              <p className="label-tech mb-4">Parent</p>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.03em]">
                IGRIS Tech
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-quiet">
                igristech.com — the company, the client work, and the public
                face of the ecosystem.
              </p>
            </div>
            <ol className="md:col-span-8">
              {ecosystemProducts.length === 0 ? (
                <li className="border-t border-hairline py-8 last:border-b">
                  <p className="text-sm leading-relaxed text-quiet">
                    Ecosystem products will appear here when they are ready to
                    share.
                  </p>
                </li>
              ) : (
                ecosystemProducts.map((product, i) => {
                  const href = product.url;
                  return (
                    <li
                      key={product.slug}
                      id={product.slug}
                      className="border-t border-hairline py-8 last:border-b"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <p className="font-mono text-xs tracking-widest text-faint">
                          {String(i + 1).padStart(2, "0")} / {product.category.toUpperCase()}
                        </p>
                        {product.url ? (
                          <StatusChip>LIVE</StatusChip>
                        ) : (
                          <StatusChip>NOT LIVE YET</StatusChip>
                        )}
                      </div>
                      <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em]">
                        {product.name}
                      </h2>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-quiet">
                        {product.description}
                      </p>
                      <p className="mt-5 font-mono text-xs tracking-wider text-faint">
                        {href ? (
                          <a href={href} className="text-ink hover:underline">
                            {href.replace(/^https?:\/\//, "")} →
                          </a>
                        ) : (
                          <>{product.subdomain} — not live yet</>
                        )}
                      </p>
                    </li>
                  );
                })
              )}
              <li className="border-t border-hairline py-8 last:border-b">
                <p className="font-mono text-xs tracking-widest text-faint">
                  {String(ecosystemProducts.length + 1).padStart(2, "0")} / FUTURE
                </p>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em]">
                  Future products
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-quiet">
                  {FUTURE_PRODUCTS_NOTE}
                </p>
              </li>
            </ol>
          </div>
          <p className="mt-10 max-w-xl text-sm leading-relaxed text-quiet">
            Client work and the ecosystem are connected. One does not replace
            the other.{" "}
            <Link to="/about" className="text-ink underline-offset-4 hover:underline">
              How IGRIS thinks
            </Link>
            .
          </p>
        </Container>
      </section>
      <CtaBand />
    </main>
  );
}

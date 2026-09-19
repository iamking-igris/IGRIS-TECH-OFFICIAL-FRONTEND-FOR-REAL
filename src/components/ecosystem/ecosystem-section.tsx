import { Link } from "@tanstack/react-router";
import { Container } from "@/components/page/container";
import { Reveal } from "@/components/page/reveal";
import { SectionHeader } from "@/components/page/section-header";
import { StatusChip } from "@/components/page/status-chip";
import { FUTURE_PRODUCTS_NOTE, usePublishedEcosystem } from "@/lib/content";

export function EcosystemSection() {
  const ecosystemProducts = usePublishedEcosystem();
  return (
    <section className="border-b border-hairline" id="ecosystem">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionHeader
            kicker="Ecosystem / 05"
            title="The IGRIS ecosystem"
            description="Client work is what we build for others. The ecosystem is what we build for ourselves. Connected — not the same catalogue."
          />
        </Reveal>

        <div className="grid gap-10 md:grid-cols-12">
          <div className="border-t border-hairline pt-6 md:col-span-4">
            <p className="font-mono text-xs tracking-widest text-faint">PARENT</p>
            <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em]">
              IGRIS Tech
            </p>
            <p className="mt-3 text-sm leading-relaxed text-quiet">
              The company. Client work, and the public face of the products that
              follow.
            </p>
            <p className="mt-4 font-mono text-xs tracking-wider text-faint">
              igris.com.ng
            </p>
          </div>
          <ol className="md:col-span-8">
            {ecosystemProducts.map((product, i) => (
              <li
                key={product.slug}
                id={product.slug}
                className="border-t border-hairline py-7 last:border-b"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="font-mono text-xs tracking-widest text-faint">
                    {String(i + 1).padStart(2, "0")} / {product.category.toUpperCase()}
                  </p>
                  {product.url && (product.published === true || /live/i.test(String(product.status))) ? (
                    <StatusChip>LIVE</StatusChip>
                  ) : (
                    <StatusChip>{String(product.status || "").toUpperCase()}</StatusChip>
                  )}
                </div>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em]">
                  {product.name}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-quiet">
                  {product.description}
                </p>
                <p className="mt-4 font-mono text-xs tracking-wider text-faint">
                  {product.url ? (
                    <a href={product.url} className="text-ink hover:underline">
                      {product.url.replace(/^https?:\/\//, "")} →
                    </a>
                  ) : (
                    <>{product.subdomain} — not live yet</>
                  )}
                </p>
              </li>
            ))}
            <li className="border-t border-hairline py-7 last:border-b">
              <p className="font-mono text-xs tracking-widest text-faint">
                03 / FUTURE
              </p>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em]">
                Future products
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-quiet">
                {FUTURE_PRODUCTS_NOTE}
              </p>
            </li>
          </ol>
        </div>

        <Link
          to="/ecosystem"
          className="mt-10 inline-flex items-center gap-2 text-sm text-ink"
        >
          The ecosystem
          <span className="btn-arrow" aria-hidden>
            →
          </span>
        </Link>
      </Container>
    </section>
  );
}

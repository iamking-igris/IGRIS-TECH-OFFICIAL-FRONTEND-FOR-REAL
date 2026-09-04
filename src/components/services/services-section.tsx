import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/page/container";
import { Reveal } from "@/components/page/reveal";
import { SectionHeader } from "@/components/page/section-header";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const current = services[active] ?? services[0];

  return (
    <section className="border-b border-hairline" id="services">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionHeader
            kicker="Services / 01"
            title="What we build"
            description="Four capabilities. One company you can hire to take an idea into a working product."
          />
        </Reveal>

        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <ul className="md:col-span-7">
            {services.map((service, i) => (
              <li key={service.slug} className="border-t border-hairline last:border-b">
                <Link
                  to={service.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={cn(
                    "group flex items-baseline justify-between gap-6 py-6 transition-colors duration-150 md:py-7",
                    i === active ? "text-ink" : "text-quiet hover:text-ink",
                  )}
                >
                  <span className="flex min-w-0 items-baseline gap-5 md:gap-8">
                    <span className="font-mono text-xs tracking-widest text-faint">
                      {service.index}
                    </span>
                    <span className="font-display text-2xl font-semibold tracking-[-0.03em] md:text-4xl">
                      {service.name}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "hidden shrink-0 text-sm transition-opacity duration-150 md:inline",
                      i === active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    )}
                  >
                    View →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <aside className="md:col-span-5 md:border-l md:border-hairline md:pl-10 md:pt-6" aria-live="polite">
            <p className="font-mono text-xs tracking-widest text-faint">
              {current.index} / {current.name.toUpperCase()}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink">{current.short}</p>
            <p className="mt-4 text-sm leading-relaxed text-quiet">{current.problem}</p>
            <p className="mt-4 text-sm leading-relaxed text-quiet">
              <span className="text-ink">For. </span>
              {current.forWhom}
            </p>
            <Link
              to={current.href}
              className="mt-8 inline-flex items-center gap-2 text-sm text-ink"
            >
              Explore {current.name}
              <span className="btn-arrow" aria-hidden>
                →
              </span>
            </Link>
          </aside>
        </div>
      </Container>
    </section>
  );
}

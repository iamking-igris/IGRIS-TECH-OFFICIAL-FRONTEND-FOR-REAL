import { Link } from "@tanstack/react-router";
import { BrandLockup } from "@/components/brand/logo";
import { Container } from "@/components/page/container";
import { usePublishedEcosystem } from "@/lib/content";
import { services } from "@/data/services";

export function SiteFooter() {
  const ecosystemProducts = usePublishedEcosystem();
  return (
    <footer className="border-t border-hairline bg-canvas">
      <Container className="grid gap-16 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <BrandLockup />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-quiet">
            Building digital products for clients. Building an ecosystem of our
            own. The two are connected — they are not the same thing.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 text-sm text-ink"
          >
            Start a Project
            <span className="btn-arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
          <div>
            <p className="label-tech mb-4">Company</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/work" className="text-ink/90 hover:text-ink">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/ecosystem" className="text-ink/90 hover:text-ink">
                  Ecosystem
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-ink/90 hover:text-ink">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-ink/90 hover:text-ink">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/review" className="text-ink/90 hover:text-ink">
                  Leave a Review
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="label-tech mb-4">Services</p>
            <ul className="space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={s.href} className="text-ink/90 hover:text-ink">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-tech mb-4">Ecosystem</p>
            <ul className="space-y-3 text-sm">
              {ecosystemProducts.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/ecosystem"
                    hash={p.slug}
                    className="text-ink/90 hover:text-ink"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-hairline">
        <Container className="flex flex-col gap-3 py-6 text-xs text-faint md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} IGRIS Tech. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/privacy" className="hover:text-quiet">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-quiet">
              Terms
            </Link>
            <span className="font-mono tracking-wider">BUILDING · AUTOMATING</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}

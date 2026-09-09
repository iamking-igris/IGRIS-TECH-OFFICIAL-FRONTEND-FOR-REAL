import { GlobalNetworkGlobe } from "@/components/hero/global-network-globe";
import { ButtonLink } from "@/components/ui/button-link";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <div className="pointer-events-none absolute inset-0 hex-grid opacity-40 md:opacity-20" />

      <div className="relative mx-auto grid max-w-[1440px] items-end gap-6 px-5 pb-16 pt-20 sm:px-8 md:min-h-[100dvh] md:grid-cols-12 md:items-center md:gap-8 md:pb-20 md:pt-28 lg:px-12 xl:px-16">
        <div className="md:col-span-6 lg:col-span-6">
          <p className="label-tech hero-rise mb-5 md:mb-7">IGRIS / 00</p>
          <h1
            className="hero-rise max-w-[7.2ch] font-display text-[clamp(3rem,16vw,6.8rem)] font-semibold leading-[0.8] tracking-[-0.055em] text-ink md:max-w-none md:text-[clamp(2.6rem,8vw,6.8rem)] md:leading-[0.92]"
            style={{ animationDelay: "80ms" }}
          >
            We build
            <br />
            what’s next.
          </h1>
          <p
            className="hero-rise mt-5 max-w-none text-base leading-relaxed text-quiet md:mt-8 md:max-w-md md:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            IGRIS Tech builds digital products, websites, software, and
            intelligent solutions for individuals, brands, and businesses.
          </p>
          <div
            className="hero-rise mt-8 flex flex-col items-stretch gap-3 md:mt-10 md:flex-row md:items-center md:gap-4"
            style={{ animationDelay: "240ms" }}
          >
            <ButtonLink to="/contact" variant="primary" className="w-full md:w-auto">
              Start a Project
            </ButtonLink>
            <ButtonLink to="/work" variant="ghost" className="w-full md:w-auto">
              Explore Our Work
            </ButtonLink>
          </div>
        </div>

        <div className="mt-8 md:mt-0 md:col-span-6 lg:col-span-6">
          <div className="mb-3 flex items-center justify-between gap-3 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-faint md:hidden">
            <span>SYSTEM / IGRIS</span>
            <span>NETWORK / GLOBAL</span>
          </div>

          <div className="relative mx-auto h-[250px] w-[min(88vw,420px)] max-w-full sm:h-[280px] sm:w-[min(82vw,450px)] md:h-[min(68vh,620px)] md:w-full">
            <GlobalNetworkGlobe className="h-full w-full" />
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-faint md:hidden">
            <span>BUILD / EVOLVE</span>
            <span>IDEAS → IMPACT</span>
          </div>
        </div>
      </div>
    </section>
  );
}

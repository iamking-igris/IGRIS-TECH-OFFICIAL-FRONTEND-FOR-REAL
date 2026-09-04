import { Link } from "@tanstack/react-router";
import { Container } from "@/components/page/container";
import { Reveal } from "@/components/page/reveal";

export function AboutSection() {
  return (
    <section className="border-b border-hairline bg-paper text-coal">
      <Container className="grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-5">
          <p className="label-tech mb-4 !text-coal/50">About / 06</p>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] text-coal md:text-5xl">
            Built for the long term.
          </h2>
        </Reveal>
        <Reveal className="md:col-span-7" delay={80}>
          <p className="text-lg leading-relaxed text-coal/80">
            IGRIS Tech helps people and businesses turn ideas into digital
            products while building the experience and foundation needed to
            eventually create technology of its own.
          </p>
          <ul className="mt-10 space-y-4 font-display text-2xl font-semibold tracking-[-0.03em] text-coal md:text-3xl">
            <li>Build for clients.</li>
            <li>Learn from every project.</li>
            <li>Create what comes next.</li>
          </ul>
          <Link
            to="/about"
            className="mt-10 inline-flex items-center gap-2 text-sm text-coal"
          >
            About the company
            <span className="btn-arrow" aria-hidden>
              →
            </span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

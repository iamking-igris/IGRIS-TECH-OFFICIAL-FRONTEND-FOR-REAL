import { Container } from "@/components/page/container";
import { Reveal } from "@/components/page/reveal";
import { processStages } from "@/data/process";

export function ProcessSection() {
  return (
    <section className="border-b border-hairline">
      <Container className="py-20 md:py-28">
        <Reveal>
          <p className="label-tech mb-4">Process / 04</p>
          <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            What happens after you reach out.
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-0 md:grid-cols-5">
          {processStages.map((stage) => (
            <li
              key={stage.index}
              className="relative border-t border-hairline py-8 md:border-t-0 md:border-l md:px-5 md:py-0 first:md:border-l-0 first:md:pl-0"
            >
              <span className="font-mono text-xs tracking-widest text-faint">
                {stage.index}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em]">
                {stage.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-quiet">{stage.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/page/container";

export function CtaBand({
  kicker = "Contact",
  title = "Have a project in mind?",
  text = "Tell us what you want to build. We’ll review it and get back to you.",
}: {
  kicker?: string;
  title?: string;
  text?: string;
}) {
  return (
    <section className="border-b border-hairline">
      <Container className="grid gap-10 py-24 md:grid-cols-12 md:items-end md:py-32">
        <div className="md:col-span-8">
          <p className="label-tech mb-4">{kicker}</p>
          <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-quiet">{text}</p>
        </div>
        <div className="md:col-span-4 md:justify-self-end">
          <ButtonLink to="/contact" variant="primary">
            Start a Project
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

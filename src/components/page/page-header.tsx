import { Container } from "@/components/page/container";

export function PageHeader({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="relative border-b border-hairline">
      <Container className="pb-16 pt-28 md:pb-20 md:pt-36">
        <p className="label-tech mb-5">{kicker}</p>
        <h1 className="max-w-4xl font-display text-4xl font-semibold tracking-[-0.035em] md:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-quiet md:text-lg">
            {description}
          </p>
        ) : null}
      </Container>
    </header>
  );
}

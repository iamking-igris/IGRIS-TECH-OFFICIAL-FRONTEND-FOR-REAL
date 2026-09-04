import { cn } from "@/lib/utils";

export function SectionHeader({
  kicker,
  title,
  description,
  invert = false,
  className,
}: {
  kicker: string;
  title: string;
  description?: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end",
        className,
      )}
    >
      <div className="md:col-span-7">
        <p className={cn("label-tech mb-4", invert && "!text-coal/45")}>
          {kicker}
        </p>
        <h2
          className={cn(
            "max-w-2xl font-display text-4xl font-semibold tracking-[-0.03em] md:text-5xl",
            invert ? "text-coal" : "text-ink",
          )}
        >
          {title}
        </h2>
      </div>
      {description ? (
        <p
          className={cn(
            "max-w-sm text-sm leading-relaxed md:col-span-5 md:justify-self-end md:text-base",
            invert ? "text-coal/70" : "text-quiet",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

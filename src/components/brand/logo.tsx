import { cn } from "@/lib/utils";

type MarkProps = {
  className?: string;
  alt?: string;
  onDark?: boolean;
};

export function LogoMark({
  className,
  alt = "",
  onDark = true,
}: MarkProps) {
  return (
    <img
      src={onDark ? "/brand/igris-mark-on-dark.png" : "/brand/igris-mark.png"}
      alt={alt}
      width={707}
      height={755}
      className={cn("h-8 w-auto", className)}
      decoding="async"
    />
  );
}

export function BrandLockup({
  className,
  onDark = true,
  compact = false,
}: {
  className?: string;
  onDark?: boolean;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5 md:gap-3", className)}>
      <LogoMark
        onDark={onDark}
        className={cn(
          "h-[1.7rem] w-auto translate-y-px md:h-8",
          compact && "h-7",
        )}
        alt=""
      />
      <span
        className={cn(
          "wordmark translate-y-px text-[0.62rem] text-current md:text-[0.72rem]",
          onDark ? "text-ink" : "text-coal",
        )}
      >
        IGRIS TECH
      </span>
    </span>
  );
}

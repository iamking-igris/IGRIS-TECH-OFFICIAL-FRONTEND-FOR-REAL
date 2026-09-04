import { cn } from "@/lib/utils";

export function StatusChip({
  children,
  invert = false,
  className,
}: {
  children: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block border px-2 py-1 font-mono text-[10px] tracking-widest",
        invert
          ? "border-coal/20 text-coal/70"
          : "border-hairline text-quiet",
        className,
      )}
    >
      {children}
    </span>
  );
}

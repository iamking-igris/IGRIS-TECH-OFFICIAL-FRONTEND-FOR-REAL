import type { ErrorComponentProps } from "@tanstack/react-router";
import { ButtonLink } from "@/components/ui/button-link";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main
      id="main"
      className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-canvas px-6 text-center text-ink"
    >
      <p className="label-tech">Error</p>
      <h1 className="font-display text-2xl font-semibold tracking-[-0.03em]">
        Something went wrong
      </h1>
      <p className="max-w-md text-sm break-words text-quiet">
        {error.message || "An unexpected error occurred. Try reloading the page."}
      </p>
      <ButtonLink to="/" variant="ghost">
        Return Home
      </ButtonLink>
    </main>
  );
}

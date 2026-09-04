import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/page/container";

export function NotFoundPage() {
  useEffect(() => {
    document.title = "Page not found — IGRIS Tech";
  }, []);

  return (
    <main id="main" className="relative overflow-hidden border-b border-hairline">
      <div className="pointer-events-none absolute inset-0 hex-grid opacity-50" />
      <Container className="relative py-32 md:py-40">
        <p className="label-tech mb-6">404</p>
        <div className="mb-10 h-24 w-24" aria-hidden>
          <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
            <polygon
              points="50,6 93,31 93,69 50,94 7,69 7,31"
              stroke="rgba(243,243,240,0.35)"
              strokeWidth="1.4"
            />
            <polygon
              points="50,24 76,39 76,61 50,76 24,61 24,39"
              stroke="rgba(243,243,240,0.55)"
              strokeWidth="1.4"
            />
            <rect x="47" y="47" width="6" height="6" fill="rgba(243,243,240,0.8)" />
          </svg>
        </div>
        <h1 className="max-w-2xl font-display text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
          Looks like this route doesn’t exist.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-quiet">
          The path you asked for isn’t part of the IGRIS system. Head home, or
          start a project.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink to="/" variant="primary">
            Return Home
          </ButtonLink>
          <ButtonLink to="/contact" variant="ghost">
            Start a Project
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}

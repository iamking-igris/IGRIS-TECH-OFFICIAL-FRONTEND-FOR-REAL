import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteNav } from "@/components/navigation/site-nav";
import { SiteGrid } from "@/components/page/site-grid";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-dvh bg-canvas text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
      >
        Skip to content
      </a>
      <SiteGrid />
      <SiteNav />
      {children}
      <SiteFooter />
    </div>
  );
}

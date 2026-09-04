import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BrandLockup } from "@/components/brand/logo";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const y = window.scrollY;
      const view = window.innerHeight;
      const max = Math.max(0, document.documentElement.scrollHeight - view);
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
      setScrolled(y > 8);

      const delta = y - lastY.current;
      const atBottom = y >= max - 4;
      if (reduced || open || y < 56) {
        setHidden(false);
      } else if (atBottom && delta < 0) {
        // Ignore rubber-band overscroll at the bottom.
      } else if (delta > 12 && y > 96) {
        setHidden(true);
      } else if (delta < -10) {
        setHidden(false);
      }
      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onFocus = (event: FocusEvent) => {
      if (headerRef.current?.contains(event.target as Node)) {
        setHidden(false);
      }
    };
    document.addEventListener("focusin", onFocus);
    return () => document.removeEventListener("focusin", onFocus);
  }, []);

  const collapsed = hidden && !open;

  return (
    <header
      ref={headerRef}
      inert={collapsed ? true : undefined}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        collapsed ? "-translate-y-full pointer-events-none" : "translate-y-0",
        scrolled || open
          ? "border-b border-hairline bg-canvas/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className="scroll-progress pointer-events-none absolute inset-x-0 bottom-0 h-px bg-ink/70"
        style={{ ["--progress" as string]: progress }}
        aria-hidden
      />

      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 md:h-[4.5rem] lg:px-12 xl:px-16">
        <Link
          to="/"
          className="min-w-0 shrink text-ink"
          aria-label="IGRIS Tech home"
        >
          <BrandLockup />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active =
              pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative text-[0.8125rem] tracking-wide transition-colors duration-150 hover:text-ink",
                  active ? "text-ink" : "text-quiet",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px w-full origin-left bg-ink transition-transform duration-200",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                  aria-hidden
                />
              </Link>
            );
          })}
          <Link
            to="/contact"
            className="inline-flex h-10 items-center gap-2 border border-ink bg-ink px-4 text-[0.8125rem] font-medium text-canvas transition-[background-color,color] duration-150 hover:bg-paper hover:text-coal"
          >
            Start a Project
            <span className="btn-arrow" aria-hidden>
              →
            </span>
          </Link>
        </nav>

        <button
          type="button"
          className="relative flex h-11 w-11 shrink-0 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={cn(
              "absolute h-px w-5 bg-ink transition-transform duration-200",
              open ? "translate-y-0 rotate-45" : "-translate-y-1.5",
            )}
          />
          <span
            className={cn(
              "absolute h-px w-5 bg-ink transition-opacity duration-150",
              open ? "opacity-0" : "opacity-100",
            )}
          />
          <span
            className={cn(
              "absolute h-px w-5 bg-ink transition-transform duration-200",
              open ? "translate-y-0 -rotate-45" : "translate-y-1.5",
            )}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-hairline bg-canvas lg:hidden"
      >
        <nav
          className="flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto px-5 py-8 sm:px-8"
          aria-label="Mobile"
        >
          {NAV.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-baseline justify-between border-b border-hairline py-5"
            >
              <span className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink">
                {item.label}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 bg-ink text-sm font-medium text-canvas"
          >
            Start a Project
            <span aria-hidden>→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

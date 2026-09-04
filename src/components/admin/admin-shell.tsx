import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { BrandLockup } from "@/components/brand/logo";
import { logoutAdmin } from "@/lib/admin-auth";
import { useReviews } from "@/lib/content";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/admin", label: "Dashboard", index: "01" },
  { to: "/admin/projects", label: "Projects", index: "02" },
  { to: "/admin/ecosystem", label: "Ecosystem", index: "03" },
  { to: "/admin/reviews", label: "Reviews", index: "04" },
  { to: "/admin/inquiries", label: "Inquiries", index: "05" },
] as const;

export function AdminShell({
  children,
  onLogout,
}: {
  children: ReactNode;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reviews = useReviews();
  const pending = reviews.filter((r) => r.status === "pending").length;

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function logout() {
    logoutAdmin();
    onLogout();
  }

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#0e0e10",
            border: "1px solid #1d1d21",
            color: "#f3f3f0",
            borderRadius: 0,
            fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif",
          },
        }}
      />

      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-hairline bg-canvas px-5 lg:hidden">
        <Link to="/admin" aria-label="Admin home">
          <BrandLockup compact />
        </Link>
        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center"
          aria-expanded={open}
          aria-controls="admin-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={cn(
              "absolute h-px w-5 bg-ink transition-transform duration-200",
              open ? "rotate-45" : "-translate-y-1.5",
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
              open ? "-rotate-45" : "translate-y-1.5",
            )}
          />
        </button>
      </header>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-canvas/70 lg:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        id="admin-nav"
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-hairline bg-canvas transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="hidden h-16 items-center border-b border-hairline px-6 lg:flex">
          <Link to="/admin" aria-label="Admin home">
            <BrandLockup compact />
          </Link>
        </div>
        <p className="label-tech px-6 pt-16 pb-4 lg:pt-6">Internal</p>
        <nav className="flex flex-1 flex-col px-3" aria-label="Admin">
          {NAV.map((item) => {
            const exact = item.to === "/admin";
            const active = exact
              ? pathname === item.to || pathname === `${item.to}/`
              : pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-baseline justify-between gap-3 px-3 py-3 text-sm transition-colors duration-150",
                  active ? "text-ink" : "text-quiet hover:text-ink",
                )}
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] tracking-widest text-faint">
                    {item.index}
                  </span>
                  {item.label}
                </span>
                {item.to === "/admin/reviews" && pending > 0 ? (
                  <span className="font-mono text-[10px] tracking-widest text-ink">
                    {String(pending).padStart(2, "0")}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-hairline p-3">
          <button
            type="button"
            onClick={logout}
            className="flex w-full px-3 py-3 text-left text-sm text-quiet transition-colors duration-150 hover:text-ink"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <div className="px-5 pt-20 pb-16 sm:px-8 lg:px-12 lg:pt-12">
          {children}
        </div>
      </div>
    </div>
  );
}

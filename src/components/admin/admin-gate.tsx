import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { BrandLockup } from "@/components/brand/logo";
import { Button } from "@/components/ui/button-link";
import { TextInput } from "@/components/admin/fields";
import { AdminShell } from "@/components/admin/admin-shell";
import { isAdminAuthenticated, loginAdmin } from "@/lib/admin-auth";

export function AdminGate() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setAuthed(isAdminAuthenticated());
    setReady(true);
  }, [pathname]);

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-canvas text-ink">
        <p className="label-tech">IGRIS / ADMIN</p>
      </div>
    );
  }

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return (
    <AdminShell onLogout={() => setAuthed(false)}>
      <Outlet />
    </AdminShell>
  );
}

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (loginAdmin(value)) {
      setError("");
      onSuccess();
      return;
    }
    setError("That password isn’t right.");
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-canvas text-ink">
      <div className="site-frame" aria-hidden>
        <div className="site-frame-inner" />
      </div>
      <div className="relative z-[1] mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-16">
        <BrandLockup />
        <p className="label-tech mt-10">Internal / Development</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.035em]">
          Admin
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-quiet">
          This is a development gate so the internal tools can be prototyped. It
          is not production authentication and will be replaced by a real
          session on the IGRIS Tech backend.
        </p>
        <form onSubmit={onSubmit} className="mt-10 grid gap-4">
          <label className="grid gap-2 text-sm">
            <span>Password</span>
            <TextInput
              type="password"
              name="password"
              autoComplete="current-password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </label>
          {error ? (
            <p className="text-sm text-danger" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" variant="primary" arrow>
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}

export function AdminPending({ children }: { children?: ReactNode }) {
  return (
    <div className="py-16">
      <p className="label-tech">{children ?? "Loading"}</p>
    </div>
  );
}

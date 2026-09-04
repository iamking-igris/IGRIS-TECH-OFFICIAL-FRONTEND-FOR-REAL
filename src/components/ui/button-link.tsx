import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-ink text-canvas border border-ink hover:bg-paper hover:text-coal",
  inverse:
    "bg-canvas text-ink border border-canvas hover:bg-raised",
  ghost:
    "bg-transparent text-ink border border-hairline hover:border-quiet hover:bg-raised/40",
  text: "bg-transparent text-ink hover:text-paper px-0 h-auto min-h-0 border-0",
};

type Variant = keyof typeof variants;

const base =
  "inline-flex items-center justify-center gap-2.5 h-12 min-h-12 px-6 text-sm font-medium tracking-wide transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none";

function withArrow(children: ReactNode, arrow?: boolean) {
  if (!arrow) return children;
  return (
    <>
      <span>{children}</span>
      <span className="btn-arrow" aria-hidden>
        →
      </span>
    </>
  );
}

export function ButtonLink({
  to,
  href,
  variant = "primary",
  className,
  children,
  external,
  arrow = true,
}: {
  to?: string;
  href?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  external?: boolean;
  arrow?: boolean;
}) {
  const classes = cn(base, variants[variant], className);
  const content = withArrow(children, arrow && variant !== "text");

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={to ?? "/"} className={classes}>
      {content}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  type = "button",
  arrow = false,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  arrow?: boolean;
}) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {withArrow(children, arrow && variant !== "text")}
    </button>
  );
}

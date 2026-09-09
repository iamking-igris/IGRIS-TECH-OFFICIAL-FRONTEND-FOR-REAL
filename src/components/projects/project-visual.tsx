import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { cn } from "@/lib/utils";
import type { ProjectVisualId } from "@/lib/content";

function normalizeProjectImageUrl(url?: string | null) {
  if (!url) return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    return trimmed;
  } catch {
    return null;
  }
}

export function ProjectVisual({
  visual,
  imageUrl,
  className,
  interactive = true,
  caption,
}: {
  visual: ProjectVisualId;
  imageUrl?: string | null;
  className?: string;
  interactive?: boolean;
  caption?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const resolvedImageUrl = useMemo(() => normalizeProjectImageUrl(imageUrl), [imageUrl]);

  useEffect(() => {
    setImgError(false);
    setImgLoaded(false);
  }, [resolvedImageUrl]);

  const onMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!interactive) return;
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    },
    [interactive],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "project-frame relative isolate overflow-hidden border border-hairline bg-panel",
        className,
      )}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-hidden
    >
      <div className="project-stage absolute inset-0">
        <div className="absolute inset-0 hex-grid opacity-30" />
        {visual === "alpha" && <Alpha />}
        {visual === "beta" && <Beta />}
        {visual === "gamma" && <Gamma />}

        {resolvedImageUrl && !imgError && (
          <img
            src={resolvedImageUrl}
            alt=""
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
              imgLoaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-3 py-2.5">
        <span className="font-mono text-[10px] tracking-widest text-faint">
          {visual === "alpha"
            ? "WEB / PREVIEW"
            : visual === "beta"
              ? "SYSTEM / PREVIEW"
              : "PRODUCT / PREVIEW"}
        </span>
        <span className="font-mono text-[10px] tracking-widest text-faint">
          {caption ?? "PREPARING"}
        </span>
      </div>
    </div>
  );
}

function Alpha() {
  return (
    <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full" fill="none">
      <rect x="88" y="72" width="624" height="356" stroke="rgba(243,243,240,0.16)" />
      <rect x="88" y="72" width="624" height="28" fill="rgba(243,243,240,0.04)" stroke="rgba(243,243,240,0.16)" />
      <circle cx="108" cy="86" r="4" fill="rgba(243,243,240,0.28)" />
      <circle cx="124" cy="86" r="4" fill="rgba(243,243,240,0.18)" />
      <circle cx="140" cy="86" r="4" fill="rgba(243,243,240,0.12)" />
      <rect x="112" y="124" width="180" height="280" stroke="rgba(243,243,240,0.14)" />
      <rect x="312" y="124" width="376" height="48" stroke="rgba(243,243,240,0.22)" />
      <rect x="312" y="188" width="180" height="216" stroke="rgba(243,243,240,0.14)" />
      <rect x="508" y="188" width="180" height="100" stroke="rgba(243,243,240,0.18)" />
      <rect x="508" y="304" width="180" height="100" stroke="rgba(243,243,240,0.12)" />
      <line x1="132" y1="160" x2="272" y2="160" stroke="rgba(243,243,240,0.2)" />
      <line x1="132" y1="184" x2="248" y2="184" stroke="rgba(243,243,240,0.12)" />
      <line x1="132" y1="208" x2="260" y2="208" stroke="rgba(243,243,240,0.12)" />
      <polygon
        points="400,210 430,227 430,262 400,279 370,262 370,227"
        stroke="rgba(243,243,240,0.45)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function Beta() {
  return (
    <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full" fill="none">
      <rect x="64" y="64" width="672" height="372" stroke="rgba(243,243,240,0.14)" />
      <rect x="64" y="64" width="168" height="372" stroke="rgba(243,243,240,0.16)" />
      <rect x="256" y="88" width="200" height="72" stroke="rgba(243,243,240,0.22)" />
      <rect x="472" y="88" width="200" height="72" stroke="rgba(243,243,240,0.16)" />
      <rect x="256" y="176" width="416" height="220" stroke="rgba(243,243,240,0.18)" />
      <line x1="256" y1="232" x2="672" y2="232" stroke="rgba(243,243,240,0.12)" />
      <line x1="256" y1="288" x2="672" y2="288" stroke="rgba(243,243,240,0.1)" />
      <line x1="256" y1="344" x2="672" y2="344" stroke="rgba(243,243,240,0.1)" />
      <line x1="88" y1="120" x2="208" y2="120" stroke="rgba(243,243,240,0.28)" />
      <line x1="88" y1="152" x2="188" y2="152" stroke="rgba(243,243,240,0.14)" />
      <line x1="88" y1="184" x2="200" y2="184" stroke="rgba(243,243,240,0.14)" />
      <line x1="88" y1="216" x2="176" y2="216" stroke="rgba(243,243,240,0.1)" />
      <rect x="392" y="268" width="12" height="12" fill="rgba(243,243,240,0.7)" />
    </svg>
  );
}

function Gamma() {
  return (
    <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full" fill="none">
      <polygon
        points="400,70 670,226 670,374 400,530 130,374 130,226"
        stroke="rgba(243,243,240,0.12)"
        strokeWidth="1"
        transform="translate(0 -50)"
      />
      <polygon
        points="400,140 575,241 575,359 400,460 225,359 225,241"
        stroke="rgba(243,243,240,0.28)"
        strokeWidth="1.15"
        transform="translate(0 -50)"
      />
      <polygon
        points="400,210 490,262 490,338 400,390 310,338 310,262"
        stroke="rgba(243,243,240,0.55)"
        strokeWidth="1.2"
        transform="translate(0 -50)"
      />
      <line x1="130" y1="176" x2="310" y2="238" stroke="rgba(243,243,240,0.16)" />
      <line x1="670" y1="176" x2="490" y2="238" stroke="rgba(243,243,240,0.16)" />
      <line x1="400" y1="90" x2="400" y2="186" stroke="rgba(243,243,240,0.2)" />
      <circle cx="130" cy="176" r="3" fill="rgba(243,243,240,0.5)" />
      <circle cx="670" cy="176" r="3" fill="rgba(243,243,240,0.5)" />
      <circle cx="400" cy="90" r="3" fill="rgba(243,243,240,0.5)" />
      <rect x="394" y="244" width="12" height="12" fill="rgba(243,243,240,0.8)" />
    </svg>
  );
}

export const SITE = {
  name: "IGRIS Tech",
  legalName: "IGRIS Tech",
  domain: "https://igris.com.ng",
  tagline: "We build what's next.",
  description:
    "IGRIS Tech builds digital products, software, websites, and intelligent solutions for individuals, brands, and businesses.",
  keywords: [
    "software development",
    "web development",
    "digital products",
    "AI solutions",
    "custom software agency",
    "brand systems",
    "automation",
    "web design & build",
  ],
  email: null as string | null,
  social: [] as { label: string; href: string }[],
} as const;

export const NAV = [
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Ecosystem", to: "/ecosystem" },
  { label: "About", to: "/about" },
] as const;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.domain}${normalized}`;
}

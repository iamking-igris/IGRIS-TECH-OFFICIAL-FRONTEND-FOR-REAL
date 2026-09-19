export const SITE = {
  name: "IGRIS Tech",
  legalName: "IGRIS Tech",
  domain: "https://igris.com.ng",
  tagline: "We build what's next.",
  description:
    "IGRIS Tech builds modern software, AI solutions, automation systems, and digital products that turn ideas into reality.",
  keywords: [
    "IGRIS Tech",
    "software development",
    "AI solutions",
    "automation",
    "web development",
    "software engineering",
    "digital products",
    "AI development",
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

import { absoluteUrl, SITE } from "@/lib/site";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

export function pageHead({ title, description, path = "/", noIndex }: SeoInput) {
  const url = absoluteUrl(path);
  const imageUrl = `${SITE.domain}/og-image.png`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: SITE.keywords.join(", ") },
      { name: "robots", content: noIndex ? "noindex, nofollow" : "index, follow" },
      { name: "theme-color", content: "#05060A" },
      { name: "application-name", content: SITE.name },
      { name: "author", content: SITE.name },
      { name: "publisher", content: SITE.name },
      { name: "generator", content: "IGRIS Tech" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_NG" },
      { property: "og:image", content: `${SITE.domain}/brand/igris-mark-search.png` },
      { property: "og:image:secure_url", content: `${SITE.domain}/brand/igris-mark-search.png` },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${SITE.name} brand preview` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@igristech" },
      { name: "twitter:creator", content: "@igristech" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${SITE.domain}/brand/igris-mark-search.png` },
      { name: "twitter:image:alt", content: `${SITE.name} brand preview` },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.domain,
    description: SITE.description,
    logo: `${SITE.domain}/brand/igris-mark.png`,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.domain,
    description: SITE.description,
  };
}

export function serviceJsonLd(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.domain,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function creativeWorkJsonLd(input: {
  name: string;
  description: string;
  url: string;
  dateCreated?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: input.url,
    creator: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.domain,
    },
    ...(input.dateCreated ? { dateCreated: input.dateCreated } : {}),
  };
}

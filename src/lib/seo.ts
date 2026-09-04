import { absoluteUrl, SITE } from "@/lib/site";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

export function pageHead({ title, description, path = "/", noIndex }: SeoInput) {
  const url = absoluteUrl(path);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "theme-color", content: "#070708" },
      { name: "application-name", content: SITE.name },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(noIndex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
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

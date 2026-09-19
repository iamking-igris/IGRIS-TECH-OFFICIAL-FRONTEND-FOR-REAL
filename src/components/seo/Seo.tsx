import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { SITE, absoluteUrl } from "@/lib/site";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

export function Seo({ title, description, path = "/", noIndex }: SeoProps) {
  const fullTitle = title || "IGRIS Tech | We Build Digital Products, Websites & Intelligent Software";
  const desc = description || "IGRIS Tech builds digital products, websites, software and intelligent solutions for individuals, brands and businesses. Start your project today.";
  const url = absoluteUrl(path);
  const image = `${SITE.domain}/brand/igris-og.png`;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={desc} />
        <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    </HelmetProvider>
  );
}

export default Seo;

import React from "react";
import { SITE } from "@/lib/site";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

// Minimal client-side SEO component. Server-side meta is handled by `pageHead` in routes.
export function Seo({ title, description }: SeoProps) {
  React.useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let el = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.name = "description";
        document.head.appendChild(el);
      }
      el.content = description;
    }
  }, [title, description]);

  return null;
}

export default Seo;

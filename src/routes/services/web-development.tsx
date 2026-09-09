import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/services/service-page";
import { getService } from "@/data/services";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/web-development")({
  head: () => {
    const service = getService("web-development");
    return pageHead({
      title: service?.seoTitle ?? "Web Development Services — IGRIS Tech",
      description:
        service?.seoDescription ??
        "IGRIS Tech builds modern websites and web applications around real business goals — fast, accessible, and ready to grow.",
      path: service?.href ?? "/services/web-development",
    });
  },
  component: () => {
    const service = getService("web-development");
    if (!service) return null;
    return <ServicePage service={service} />;
  },
});

import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/services/service-page";
import { getService } from "@/data/services";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/software-development")({
  head: () => {
    const service = getService("software-development");
    return pageHead({
      title: service?.seoTitle ?? "Software Development — IGRIS Tech",
      description:
        service?.seoDescription ??
        "Custom software and digital products from IGRIS Tech — systems designed around how your business actually works.",
      path: service?.href ?? "/services/software-development",
    });
  },
  component: () => {
    const service = getService("software-development");
    if (!service) return null;
    return <ServicePage service={service} />;
  },
});

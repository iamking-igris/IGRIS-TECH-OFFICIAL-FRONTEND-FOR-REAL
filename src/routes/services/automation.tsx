import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/services/service-page";
import { getService } from "@/data/services";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/automation")({
  head: () => {
    const service = getService("automation");
    return pageHead({
      title: service?.seoTitle ?? "Automation Services — IGRIS Tech",
      description:
        service?.seoDescription ??
        "IGRIS Tech designs automation systems that reduce repetitive work and make operations more reliable.",
      path: service?.href ?? "/services/automation",
    });
  },
  component: () => {
    const service = getService("automation");
    if (!service) return null;
    return <ServicePage service={service} />;
  },
});

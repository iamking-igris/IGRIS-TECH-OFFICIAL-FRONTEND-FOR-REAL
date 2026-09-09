import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/services/service-page";
import { getService } from "@/data/services";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/ai-solutions")({
  head: () => {
    const service = getService("ai-solutions");
    return pageHead({
      title: service?.seoTitle ?? "AI Solutions — IGRIS Tech",
      description:
        service?.seoDescription ??
        "IGRIS Tech builds AI-powered experiences and intelligent tools that work in real products, not just prototypes.",
      path: service?.href ?? "/services/ai-solutions",
    });
  },
  component: () => {
    const service = getService("ai-solutions");
    if (!service) return null;
    return <ServicePage service={service} />;
  },
});

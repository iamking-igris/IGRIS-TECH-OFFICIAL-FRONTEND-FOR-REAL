import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/services/service-page";
import { getService } from "@/data/services";
import { pageHead } from "@/lib/seo";

const service = getService("automation")!;

export const Route = createFileRoute("/services/automation")({
  head: () =>
    pageHead({
      title: service.seoTitle,
      description: service.seoDescription,
      path: service.href,
    }),
  component: () => <ServicePage service={service} />,
});

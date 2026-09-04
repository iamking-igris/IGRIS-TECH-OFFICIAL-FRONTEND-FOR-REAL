import { createFileRoute } from "@tanstack/react-router";
import { AdminGate } from "@/components/admin/admin-gate";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/admin")({
  head: () =>
    pageHead({
      title: "Admin — IGRIS Tech",
      description: "IGRIS Tech internal administration.",
      path: "/admin",
      noIndex: true,
    }),
  component: AdminGate,
});

import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/page/container";
import { PageHeader } from "@/components/page/page-header";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy Policy — IGRIS Tech",
      description: "How IGRIS Tech handles information submitted through this website.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main id="main">
      <PageHeader
        kicker="Legal"
        title="Privacy Policy"
        description="A short account of what this website collects. We do not invent a larger privacy programme than exists."
      />
      <Container className="max-w-3xl space-y-8 py-16 text-sm leading-relaxed text-quiet">
        <p>
          IGRIS Tech (“we”) operates igristech.com. This page describes how
          information submitted through the public website is treated.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink">What we collect</h2>
        <p>
          If you use Start a Project, we receive the details you choose to send:
          name, email, optional company, project type, description, and optional
          budget and timeline. We do not sell this information.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink">How it is used</h2>
        <p>
          Project inquiries are used to review whether we can help, and to
          follow up. A durable inbox will be connected as the backend is
          implemented. Until then, submissions are received by the site’s
          inquiry handler.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink">Cookies and analytics</h2>
        <p>
          This public site does not currently run a third-party advertising
          tracker. If that changes, this page will be updated.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink">Contact</h2>
        <p>
          Questions about this policy can be sent through the contact form on
          this website.
        </p>
      </Container>
    </main>
  );
}

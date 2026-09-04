import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/page/container";
import { PageHeader } from "@/components/page/page-header";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms — IGRIS Tech",
      description: "Terms of use for the IGRIS Tech public website.",
      path: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main id="main">
      <PageHeader
        kicker="Legal"
        title="Terms"
        description="Simple terms for using this website. Project work is governed by a separate agreement."
      />
      <Container className="max-w-3xl space-y-8 py-16 text-sm leading-relaxed text-quiet">
        <p>
          This website is published by IGRIS Tech. By using it you agree to
          these terms.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink">The site</h2>
        <p>
          Content is provided for information. It is not a proposal, a quote, or
          a guarantee of availability. Case studies marked as in preparation are
          structural placeholders, not claims about named clients.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink">Projects</h2>
        <p>
          Sending a project inquiry does not create a contract. If we work
          together, the engagement will be set out in writing.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink">Ecosystem products</h2>
        <p>
          IGRIS Hosting, IGRIS Studio, and future products are described with
          their actual status. Subdomains that are not live are not offered as
          services from this page.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink">Contact</h2>
        <p>
          Questions can be sent through the contact form on this website.
        </p>
      </Container>
    </main>
  );
}

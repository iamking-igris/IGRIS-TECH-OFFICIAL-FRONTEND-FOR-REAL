import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/page/container";
import { PageHeader } from "@/components/page/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Start a Project — IGRIS Tech",
      description:
        "Tell IGRIS Tech what you want to build. We’ll review your project and get back to you.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHeader
        kicker="Contact"
        title="Start a project"
        description="Share the brief. We’ll review it and follow up. This form is prepared for a future project inbox — no automated email is sent from this page yet."
      />
      <section>
        <Container className="grid gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-8">
            <ContactForm />
          </div>
          <aside className="md:col-span-4">
            <p className="text-sm leading-relaxed text-quiet">
              Typical work includes websites, web applications, custom software,
              AI features, and automation.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-quiet">
              If you already know the shape of the product, say so. If you
              don’t, say that too — Discover is part of the work.
            </p>
            <p className="mt-8 text-sm leading-relaxed text-quiet">
              Worked with us already?{" "}
              <Link to="/review" className="text-ink underline-offset-4 hover:underline">
                Leave a review
              </Link>
              .
            </p>
          </aside>
        </Container>
      </section>
    </main>
  );
}

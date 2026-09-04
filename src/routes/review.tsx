import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/page/container";
import { PageHeader } from "@/components/page/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { ReviewForm } from "@/components/testimonials/review-form";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/review")({
  head: () =>
    pageHead({
      title: "Leave a Review — IGRIS Tech",
      description:
        "Share a note about working with IGRIS Tech. Reviews are published only after they have been read and approved.",
      path: "/review",
    }),
  component: ReviewPage,
});

function ReviewPage() {
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Leave a Review", path: "/review" },
        ])}
      />
      <PageHeader
        kicker="Reviews"
        title="Leave a review"
        description="If you’ve worked with IGRIS Tech, we’d like to hear it in your words. Notes are not published automatically — they are read first."
      />
      <section>
        <Container className="grid gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-8">
            <ReviewForm />
          </div>
          <aside className="md:col-span-4">
            <p className="text-sm leading-relaxed text-quiet">
              A review can name the project, the company, and the work. It does
              not need to be long. It does need to be true.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-quiet">
              Pending notes stay off the public site until they are approved.
              We do not invent testimonials to fill the page in the meantime.
            </p>
          </aside>
        </Container>
      </section>
    </main>
  );
}

import { Link } from "@tanstack/react-router";
import { Container } from "@/components/page/container";
import { Reveal } from "@/components/page/reveal";
import { SectionHeader } from "@/components/page/section-header";
import { ButtonLink } from "@/components/ui/button-link";
import { usePublishedReviews } from "@/lib/content";

export function ReviewsSection() {
  const items = usePublishedReviews();

  return (
    <section className="border-b border-hairline bg-paper text-coal" id="reviews">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionHeader
            invert
            kicker="Notes / 03"
            title="What clients say — when they choose to."
            description="Reviews appear here once they have been approved. We do not publish invented testimonials, ratings, or client counts."
          />
        </Reveal>
        {items.length === 0 ? (
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <p className="max-w-xl text-base leading-relaxed text-coal/70 md:col-span-7">
              Nothing here yet. When a client is willing to put their name on a
              note about the work, it will live on this page — attributed, and
              unedited for theatre.
            </p>
            <div className="md:col-span-5 md:justify-self-end">
              <ButtonLink to="/review" variant="inverse" arrow>
                Leave a Review
              </ButtonLink>
            </div>
          </div>
        ) : (
          <>
            <ul className="grid gap-8 md:grid-cols-2">
              {items.map((review) => (
                <li
                  key={review.id}
                  className="border-t border-coal/15 pt-6"
                >
                  <p className="font-mono text-[10px] tracking-widest text-coal/45">
                    {Array.from({ length: review.rating }, () => "●").join(" ")}
                    {Array.from({ length: 5 - review.rating }, () => "○").join(" ")}
                  </p>
                  <blockquote className="mt-4 text-lg leading-relaxed text-coal">
                    {review.content}
                  </blockquote>
                  <p className="mt-6 text-sm text-coal/70">
                    {review.clientName}
                    {review.role ? `, ${review.role}` : ""}
                    {review.company ? ` — ${review.company}` : ""}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-12 text-sm text-coal/70">
              Worked with IGRIS?{" "}
              <Link to="/review" className="text-coal underline-offset-4 hover:underline">
                Leave a review
              </Link>
              . Notes are published after we read them.
            </p>
          </>
        )}
      </Container>
    </section>
  );
}

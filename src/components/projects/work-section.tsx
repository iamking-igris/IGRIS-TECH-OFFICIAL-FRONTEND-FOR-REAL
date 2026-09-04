import { Link } from "@tanstack/react-router";
import { Container } from "@/components/page/container";
import { Reveal } from "@/components/page/reveal";
import { SectionHeader } from "@/components/page/section-header";
import { ProjectRow } from "@/components/projects/project-row";
import { useFeaturedProjects } from "@/lib/content";
import { useRemoteFeaturedProjects } from "@/hooks/useRemoteFeaturedProjects";

export function WorkSection() {
  const localItems = useFeaturedProjects();
  const { items: items, loading, error } = useRemoteFeaturedProjects();

  return (
    <section className="border-b border-hairline" id="work">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionHeader
            kicker="Work / 02"
            title="Selected work"
            description="Real client work will be published here. The structure is ready — the case studies are not invented."
          />
        </Reveal>

        {loading ? (
          <p className="max-w-xl text-sm leading-relaxed text-quiet">Loading selected work…</p>
        ) : items.length === 0 ? (
          <p className="max-w-xl text-sm leading-relaxed text-quiet">
            Case studies will appear here when they are ready to share.
          </p>
        ) : (
          <div className="flex flex-col">
            {items.map((project, i) => (
              <ProjectRow
                key={project.slug}
                project={project}
                index={i}
                reverse={i % 2 === 1}
              />
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm text-ink"
          >
            All work
            <span className="btn-arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

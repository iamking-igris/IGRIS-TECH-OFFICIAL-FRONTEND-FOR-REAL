import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/contact/cta-band";
import { Container } from "@/components/page/container";
import { PageHeader } from "@/components/page/page-header";
import { ProjectRow } from "@/components/projects/project-row";
import { JsonLd } from "@/components/seo/json-ld";
import { usePublishedProjects } from "@/lib/content";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/work/")({
  head: () =>
    pageHead({
      title: "Selected Work — IGRIS Tech",
      description:
        "Selected client work from IGRIS Tech. Case studies are published as they are ready to share.",
      path: "/work",
    }),
  component: WorkIndex,
});

function WorkIndex() {
  const published = usePublishedProjects();

  return (
    <main id="main">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <PageHeader
        kicker="Work"
        title="Selected work"
        description="Client project content will be added here. Placeholders show how case studies will be presented — they are not invented clients."
      />
      <section>
        <Container className="py-16">
          {published.length === 0 ? (
            <p className="max-w-xl text-sm leading-relaxed text-quiet">
              Case studies will appear here when they are ready to share.
            </p>
          ) : (
            <div className="flex flex-col">
              {published.map((project, i) => (
                <ProjectRow
                  key={project.slug}
                  project={project}
                  index={i}
                  reverse={i % 2 === 1}
                />
              ))}
            </div>
          )}
        </Container>
      </section>
      <CtaBand title="Have something similar in mind?" />
    </main>
  );
}

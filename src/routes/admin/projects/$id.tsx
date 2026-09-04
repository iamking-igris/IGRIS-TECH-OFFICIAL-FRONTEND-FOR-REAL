import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AdminPending } from "@/components/admin/admin-gate";
import { ProjectForm } from "@/components/admin/project-form";
import {
  projectToInput,
  useContentHydrated,
  useProjectById,
} from "@/lib/content";
import { pageHead } from "@/lib/seo";
import { updateProject } from "@/services/projects";

export const Route = createFileRoute("/admin/projects/$id")({
  head: () =>
    pageHead({
      title: "Edit project — IGRIS Admin",
      description: "Edit a Selected Work case study.",
      path: "/admin/projects",
      noIndex: true,
    }),
  component: EditProject,
});

function EditProject() {
  const { id } = Route.useParams();
  const hydrated = useContentHydrated();
  const project = useProjectById(id);
  const navigate = useNavigate();

  if (!hydrated) return <AdminPending>Loading project</AdminPending>;

  if (!project) {
    return (
      <div>
        <p className="label-tech">Selected Work</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em]">
          Project not found
        </h1>
        <p className="mt-4 text-sm text-quiet">
          This record is not in the mock repository.
        </p>
        <Link
          to="/admin/projects"
          className="mt-6 inline-flex items-center gap-2 text-sm"
        >
          Back to projects
          <span className="btn-arrow" aria-hidden>
            →
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="label-tech">Selected Work</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em]">
        Edit project
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-quiet">
        {project.title}
        {project.published ? " · live on the public site" : " · draft"}
      </p>
      <div className="mt-10">
        <ProjectForm
          initial={projectToInput(project)}
          submitLabel="Save project"
          onCancel={() => navigate({ to: "/admin/projects" })}
          onSubmit={async (input) => {
            try {
              const payload = {
                title: input.title,
                slug: input.slug,
                client: input.client,
                category: input.category,
                short_description: input.description,
                overview: input.overview,
                challenge: input.challenge,
                approach: input.approach,
                design: input.design,
                development: input.development,
                results: input.results,
                cover_image: (input as any).cover_image ?? null,
                services: input.services,
                technologies: input.technologies,
                project_link: input.url || null,
                status: input.status === "live" ? "PUBLISHED" : "DRAFT",
              };
              // project.id in mock store is string; backend expects numeric id for PATCH
              const projectId = Number(project.id) || project.id;
              await updateProject(projectId as any, payload as any);
              toast("Project saved.");
              navigate({ to: "/admin/projects" });
            } catch (err) {
              toast("Failed to save project.");
              navigate({ to: "/admin/projects" });
            }
          }}
        />
      </div>
    </div>
  );
}

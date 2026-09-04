import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AdminPending } from "@/components/admin/admin-gate";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { AdminEmpty, StatusMark, TextInput } from "@/components/admin/fields";
import { Button, ButtonLink } from "@/components/ui/button-link";
import {
  PROJECT_STATUSES,
  projectsService,
  useContentHydrated,
  useProjects,
} from "@/lib/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/admin/projects/")({
  head: () =>
    pageHead({
      title: "Projects — IGRIS Admin",
      description: "Manage Selected Work.",
      path: "/admin/projects",
      noIndex: true,
    }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  const hydrated = useContentHydrated();
  const projects = useProjects();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) =>
      [p.title, p.client, p.category, p.slug].join(" ").toLowerCase().includes(q),
    );
  }, [projects, query]);

  if (!hydrated) return <AdminPending>Loading projects</AdminPending>;

  const target = projects.find((p) => p.id === pendingDelete);

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label-tech">Selected Work</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em]">
            Projects
          </h1>
        </div>
        <ButtonLink to="/admin/projects/new" variant="primary">
          New project
        </ButtonLink>
      </div>

      <div className="mt-10 max-w-sm">
        <TextInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title, client, category"
          aria-label="Search projects"
        />
      </div>

      {filtered.length === 0 ? (
        <AdminEmpty
          title={projects.length === 0 ? "No projects yet." : "No matches."}
          body={
            projects.length === 0
              ? "Add a case study when there is real work to publish. Do not invent clients or results."
              : "Try a different search."
          }
          action={
            projects.length === 0 ? (
              <ButtonLink to="/admin/projects/new" variant="ghost">
                New project
              </ButtonLink>
            ) : undefined
          }
        />
      ) : (
        <ul className="mt-10">
          {filtered.map((project, i) => (
            <li
              key={project.id}
              className="grid gap-4 border-t border-hairline py-6 last:border-b md:grid-cols-12 md:items-center"
            >
              <p className="font-mono text-[10px] tracking-widest text-faint md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </p>
              <div className="md:col-span-4">
                <p className="font-display text-xl font-semibold tracking-[-0.03em]">
                  {project.title}
                </p>
                <p className="mt-1 text-sm text-quiet">
                  {project.client} · {project.category}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:col-span-3">
                <StatusMark tone={project.published ? "ink" : "quiet"}>
                  {project.published ? "PUBLISHED" : "DRAFT"}
                </StatusMark>
                <StatusMark>
                  {PROJECT_STATUSES.find((s) => s.value === project.status)?.label.toUpperCase() ??
                    project.status.toUpperCase()}
                </StatusMark>
              </div>
              <div className="flex flex-wrap gap-2 md:col-span-4 md:justify-end">
                <Button
                  variant="ghost"
                  className="h-10 min-h-10 px-3 text-xs"
                  onClick={() =>
                    navigate({
                      to: "/admin/projects/$id",
                      params: { id: project.id },
                    })
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="h-10 min-h-10 px-3 text-xs"
                  onClick={() => {
                    projectsService.setPublished(project.id, !project.published);
                    toast(
                      project.published
                        ? "Unpublished from the public site."
                        : "Published on the public site.",
                    );
                  }}
                >
                  {project.published ? "Unpublish" : "Publish"}
                </Button>
                {project.published ? (
                  <Link
                    to="/work/$slug"
                    params={{ slug: project.slug }}
                    className="inline-flex h-10 items-center px-3 text-xs text-quiet hover:text-ink"
                  >
                    View
                  </Link>
                ) : null}
                <Button
                  variant="ghost"
                  className="h-10 min-h-10 px-3 text-xs text-danger"
                  onClick={() => setPendingDelete(project.id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={Boolean(target)}
        title="Delete this project?"
        body={
          target
            ? `“${target.title}” will be removed from the mock repository in this browser. This cannot be undone here.`
            : ""
        }
        confirmLabel="Delete project"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (target) {
            projectsService.delete(target.id);
            toast("Project deleted.");
          }
          setPendingDelete(null);
        }}
      />
    </div>
  );
}

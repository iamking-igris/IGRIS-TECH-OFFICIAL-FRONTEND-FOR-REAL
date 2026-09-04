import apiFetch from "@/lib/api";
import type { Project } from "@/lib/content/types";
import { projectsService as localProjects } from "@/lib/content/projects";

/** Map backend project shape to the local `Project` shape used by the UI. */
function mapBackendToLocal(p: any): Project {
  return {
    id: String(p.id ?? p.slug ?? Math.random()),
    slug: p.slug ?? p.title?.toLowerCase().replace(/\s+/g, "-") ?? "untitled",
    title: p.title ?? "Untitled",
    client: p.client ?? "",
    category: p.category ?? "Web Development",
    year: p.year ?? null,
    description: p.short_description ?? p.description ?? "",
    overview: p.overview ?? "",
    challenge: p.challenge ?? "",
    objectives: [],
    approach: p.approach ?? "",
    design: p.design ?? "",
    development: p.development ?? "",
    keyDecisions: [],
    results: p.results ?? null,
    services: p.services ?? [],
    technologies: p.technologies ?? [],
    gallery: (p.gallery ?? []).map((g: any) => ({ src: g.src ?? g, alt: g.alt ?? "" })),
    testimonial: p.testimonial ?? null,
    featuredImage: p.cover_image ?? p.image_url ?? null,
    url: p.project_link ?? p.url ?? null,
    featured: Boolean(p.featured),
    published: Boolean(p.published ?? (p.status === "PUBLISHED")),
    placeholder: false,
    status: (p.status ?? "live") as any,
    visual: "alpha",
    publishedAt: p.published_at ?? null,
    seoTitle: p.title ?? "",
    seoDescription: p.short_description ?? p.description ?? "",
  };
}

export async function listPublicProjects(category?: string) {
  try {
    const url = category ? `/api/v1/projects?category=${encodeURIComponent(category)}` : "/api/v1/projects";
    const data = await apiFetch(url);
    if (!Array.isArray(data)) throw new Error("Unexpected projects response");
    return data.map(mapBackendToLocal);
  } catch (e) {
    // Fallback to local mock store so the UI stays usable during dev or when backend is down
    try {
      return localProjects.featured();
    } catch {
      return [] as Project[];
    }
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const data = await apiFetch(`/api/v1/projects/${encodeURIComponent(slug)}`);
    return mapBackendToLocal(data);
  } catch (e) {
    return localProjects.getBySlug(slug) as Project | null;
  }
}

export async function createProject(payload: any) {
  return apiFetch(`/api/v1/projects`, { method: "POST", body: payload, headers: { "Content-Type": "application/json" }, });
}

export async function updateProject(id: string | number, payload: any) {
  // backend uses PATCH for partial updates
  return apiFetch(`/api/v1/projects/${id}`, { method: "PATCH", body: payload, headers: { "Content-Type": "application/json" }, });
}

export async function deleteProject(id: string | number) {
  return apiFetch(`/api/v1/projects/${id}`, { method: "DELETE" });
}

export default { listPublicProjects, getProjectBySlug, createProject, updateProject, deleteProject };
import { api } from "@/lib/api";
import type {
  ProjectAdminResponse,
  ProjectCreate,
  ProjectPublicResponse,
  ProjectUpdate,
} from "@/types/project";

export const projectsService = {
  /**
   * Fetch published projects for public showcase
   */
  async getPublishedProjects(category?: string): Promise<ProjectPublicResponse[]> {
    return api.get<ProjectPublicResponse[]>("/api/v1/projects", {
      params: category ? { category } : undefined,
    });
  },

  /**
   * Fetch a single published project by slug for case-study detail
   */
  async getProjectBySlug(slug: string): Promise<ProjectPublicResponse> {
    return api.get<ProjectPublicResponse>(`/api/v1/projects/${encodeURIComponent(slug)}`);
  },

  /**
   * Create project (admin protected)
   */
  async createProject(data: ProjectCreate): Promise<ProjectAdminResponse> {
    return api.post<ProjectAdminResponse>("/api/v1/projects", data, {
      requiresAdmin: true,
    });
  },

  /**
   * Update project (admin protected)
   */
  async updateProject(
    projectId: number,
    data: ProjectUpdate,
  ): Promise<ProjectAdminResponse> {
    return api.patch<ProjectAdminResponse>(`/api/v1/projects/${projectId}`, data, {
      requiresAdmin: true,
    });
  },

  /**
   * Delete project (admin protected)
   */
  async deleteProject(projectId: number): Promise<void> {
    return api.delete<void>(`/api/v1/projects/${projectId}`, {
      requiresAdmin: true,
    });
  },
};

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
    return api.get<ProjectPublicResponse[]>("/projects", {
      params: category ? { category } : undefined,
    });
  },

  /**
   * Fetch a single published project by slug for case-study detail
   */
  async getProjectBySlug(slug: string): Promise<ProjectPublicResponse> {
    return api.get<ProjectPublicResponse>(`/projects/${encodeURIComponent(slug)}`);
  },

  /**
   * Create project (admin protected)
   */
  async createProject(data: ProjectCreate): Promise<ProjectAdminResponse> {
    return api.post<ProjectAdminResponse>("/projects", data);
  },

  /**
   * Update project (admin protected)
   */
  async updateProject(
    projectId: number,
    data: ProjectUpdate,
  ): Promise<ProjectAdminResponse> {
    return api.patch<ProjectAdminResponse>(`/projects/${projectId}`, data);
  },

  /**
   * Delete project (admin protected)
   */
  async deleteProject(projectId: number): Promise<void> {
    return api.delete<void>(`/projects/${projectId}`);
  },
};

export const listPublicProjects = projectsService.getPublishedProjects;
export const getPublishedProjects = projectsService.getPublishedProjects;
export const getProjectBySlug = projectsService.getProjectBySlug;
export const createProject = projectsService.createProject;
export const updateProject = projectsService.updateProject;
export const deleteProject = projectsService.deleteProject;

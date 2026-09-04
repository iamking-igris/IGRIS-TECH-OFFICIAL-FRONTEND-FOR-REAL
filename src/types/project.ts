/**
 * Project schemas aligned with FastAPI backend:
 * - ProjectPublicResponse
 * - ProjectAdminResponse
 * - ProjectCreate
 * - ProjectUpdate
 */

export type ProjectStatusEnum = "DRAFT" | "PUBLISHED";

export interface ProjectPublicResponse {
  title: string;
  slug: string;
  client?: string | null;
  category: string;
  year?: number | null;
  short_description?: string | null;
  overview?: string | null;
  challenge?: string | null;
  approach?: string | null;
  design?: string | null;
  development?: string | null;
  results?: string | null;
  cover_image?: string | null;
  services?: string[] | null;
  technologies?: string[] | null;
  project_link?: string | null;
}

export interface ProjectAdminResponse extends ProjectPublicResponse {
  id: number;
  status: ProjectStatusEnum;
  created_at?: string | null;
  updated_at?: string | null;
  published_at?: string | null;
}

export interface ProjectCreate {
  title: string;
  slug: string;
  client?: string | null;
  category?: string;
  year?: number | null;
  short_description?: string | null;
  overview?: string | null;
  challenge?: string | null;
  approach?: string | null;
  design?: string | null;
  development?: string | null;
  results?: string | null;
  cover_image?: string | null;
  services?: string[] | null;
  technologies?: string[] | null;
  project_link?: string | null;
  status?: ProjectStatusEnum | null;
}

export interface ProjectUpdate {
  title?: string | null;
  slug?: string | null;
  client?: string | null;
  category?: string | null;
  year?: number | null;
  status?: ProjectStatusEnum | null;
  short_description?: string | null;
  overview?: string | null;
  challenge?: string | null;
  approach?: string | null;
  design?: string | null;
  development?: string | null;
  results?: string | null;
  cover_image?: string | null;
  services?: string[] | null;
  technologies?: string[] | null;
  project_link?: string | null;
}

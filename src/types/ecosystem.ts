/**
 * Ecosystem schemas aligned with FastAPI backend:
 * - EcosystemResponse
 * - EcosystemCreate
 * - EcosystemUpdate
 */

export interface EcosystemResponse {
  id: number;
  name: string;
  slug: string;
  details: string;
  link?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface EcosystemCreate {
  name: string;
  slug: string;
  details: string;
  link?: string | null;
  status?: string | null;
}

export interface EcosystemUpdate {
  name?: string | null;
  slug?: string | null;
  details?: string | null;
  link?: string | null;
  status?: string | null;
}

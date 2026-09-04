/**
 * Contact / Inquiry schemas aligned with FastAPI backend:
 * - ContactSubmissionCreate
 * - ContactSubmissionResponse
 * - ContactSubmissionUpdate
 */

export interface ContactSubmissionCreate {
  name: string;
  email: string;
  company?: string | null;
  project_type?: string | null;
  timeline?: string | null;
  budget?: string | null;
  description: string;
}

export interface ContactSubmissionResponse {
  id: number;
  name: string;
  email: string;
  company?: string | null;
  project_type?: string | null;
  timeline?: string | null;
  budget?: string | null;
  description: string;
  status: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ContactSubmissionUpdate {
  status?: string;
}

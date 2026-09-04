/**
 * Review schemas aligned with FastAPI backend:
 * - ReviewPublicResponse
 * - ReviewAdminResponse
 * - ReviewCreate
 * - ReviewUpdate
 */

export type ReviewStatusEnum = "PENDING" | "APPROVED" | "REJECTED";

export interface ReviewPublicResponse {
  id: number;
  name: string;
  company?: string | null;
  role?: string | null;
  content: string;
  rating: number;
  created_at?: string | null;
}

export interface ReviewAdminResponse {
  id: number;
  name: string;
  company?: string | null;
  role?: string | null;
  content: string;
  rating: number;
  status: ReviewStatusEnum;
  created_at?: string | null;
  updated_at?: string | null;
  approved_at?: string | null;
}

export interface ReviewCreate {
  name: string;
  company?: string | null;
  role?: string | null;
  content: string;
  rating?: number;
}

export interface ReviewUpdate {
  name?: string | null;
  company?: string | null;
  role?: string | null;
  content?: string | null;
  rating?: number | null;
  status?: ReviewStatusEnum | null;
}

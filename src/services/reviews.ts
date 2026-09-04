import apiFetch from "@/lib/api";

export async function listReviews() {
  try {
    const data = await apiFetch("/reviews");
    if (!Array.isArray(data)) throw new Error("Unexpected reviews response");
    return data;
  } catch (e) {
    return [];
  }
}

export async function submitReview(payload: any) {
  return apiFetch(`/reviews`, { method: "POST", body: payload });
}

export default { listReviews, submitReview };
import { api } from "@/lib/api";
import type {
  ReviewAdminResponse,
  ReviewCreate,
  ReviewPublicResponse,
  ReviewUpdate,
} from "@/types/review";

export const reviewsService = {
  /**
   * Fetch approved reviews for public display
   */
  async getApprovedReviews(): Promise<ReviewPublicResponse[]> {
    return api.get<ReviewPublicResponse[]>("/api/v1/reviews");
  },

  /**
   * Submit a review from public form
   */
  async submitReview(data: ReviewCreate): Promise<ReviewPublicResponse> {
    return api.post<ReviewPublicResponse>("/api/v1/reviews", data);
  },

  /**
   * Fetch all reviews for admin moderation
   */
  async getAdminReviews(status?: string): Promise<ReviewAdminResponse[]> {
    return api.get<ReviewAdminResponse[]>("/api/v1/reviews/admin", {
      params: status ? { status } : undefined,
      requiresAdmin: true,
    });
  },

  /**
   * Update review status or details (admin moderation)
   */
  async updateReview(
    reviewId: number,
    data: ReviewUpdate,
  ): Promise<ReviewAdminResponse> {
    return api.patch<ReviewAdminResponse>(`/api/v1/reviews/${reviewId}`, data, {
      requiresAdmin: true,
    });
  },

  /**
   * Delete review (admin protected)
   */
  async deleteReview(reviewId: number): Promise<void> {
    return api.delete<void>(`/api/v1/reviews/${reviewId}`, {
      requiresAdmin: true,
    });
  },
};

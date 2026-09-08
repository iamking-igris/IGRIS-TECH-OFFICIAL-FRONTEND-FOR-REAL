import { api } from "@/lib/api";
import type {
  ReviewAdminResponse,
  ReviewCreate,
  ReviewPublicResponse,
  ReviewUpdate,
} from "@/types/review";

export const reviewsService = {
  async getApprovedReviews(): Promise<ReviewPublicResponse[]> {
    return api.get<ReviewPublicResponse[]>("/reviews");
  },

  async submitReview(data: ReviewCreate): Promise<ReviewPublicResponse> {
    return api.post<ReviewPublicResponse>("/reviews", data);
  },

  async getAdminReviews(status?: string): Promise<ReviewAdminResponse[]> {
    return api.get<ReviewAdminResponse[]>("/reviews/admin", {
      params: status ? { status } : undefined,
    });
  },

  async updateReview(
    reviewId: number,
    data: ReviewUpdate,
  ): Promise<ReviewAdminResponse> {
    return api.patch<ReviewAdminResponse>(`/reviews/${reviewId}`, data);
  },

  async deleteReview(reviewId: number): Promise<void> {
    return api.delete<void>(`/reviews/${reviewId}`);
  },
};

export const getApprovedReviews = reviewsService.getApprovedReviews;
export const submitReview = reviewsService.submitReview;
export const getAdminReviews = reviewsService.getAdminReviews;
export const updateReview = reviewsService.updateReview;
export const deleteReview = reviewsService.deleteReview;

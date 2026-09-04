import { useMemo } from "react";
import { useContentStore } from "./store";
import type { Review, ReviewInput } from "./types";

export const REVIEW_SERVICES = [
  "Web Development",
  "Software Development",
  "AI Solutions",
  "Automation",
  "Other",
] as const;

/**
 * Review repository.
 * Public submissions enter as pending. Only approved + published appear publicly.
 * Later: GET/POST/PUT/DELETE /api/reviews.
 */
export const reviewsService = {
  list(): Review[] {
    return useContentStore.getState().reviews;
  },
  published() {
    return useContentStore
      .getState()
      .reviews.filter((r) => r.status === "approved" && r.published);
  },
  pending() {
    return useContentStore
      .getState()
      .reviews.filter((r) => r.status === "pending");
  },
  getById(id: string) {
    return useContentStore.getState().reviews.find((r) => r.id === id) ?? null;
  },
  submit(input: ReviewInput) {
    if (!input.clientName.trim()) throw new Error("Name is required.");
    if (!input.content.trim()) throw new Error("A review needs some words.");
    if (input.content.trim().length < 20) {
      throw new Error(
        "Please write a little more — at least a couple of sentences.",
      );
    }
    if (!Number.isFinite(input.rating) || input.rating < 1 || input.rating > 5) {
      throw new Error("Choose a rating from 1 to 5.");
    }
    return useContentStore.getState().createReview(input);
  },
  approve(id: string) {
    return useContentStore.getState().updateReview(id, {
      status: "approved",
      published: true,
    });
  },
  reject(id: string) {
    return useContentStore.getState().updateReview(id, {
      status: "rejected",
      published: false,
    });
  },
  setPublished(id: string, published: boolean) {
    const current = reviewsService.getById(id);
    if (!current) return null;
    if (published && current.status !== "approved") {
      return useContentStore.getState().updateReview(id, {
        status: "approved",
        published: true,
      });
    }
    return useContentStore.getState().updateReview(id, { published });
  },
  update(id: string, patch: Partial<Review>) {
    return useContentStore.getState().updateReview(id, patch);
  },
  delete(id: string) {
    useContentStore.getState().deleteReview(id);
  },
};

export function useReviews() {
  return useContentStore((s) => s.reviews);
}

export function usePublishedReviews() {
  const reviews = useContentStore((s) => s.reviews);
  return useMemo(
    () => reviews.filter((r) => r.status === "approved" && r.published),
    [reviews],
  );
}

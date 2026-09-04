import { format } from "date-fns";
import type { Review } from "./types";

export function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return format(date, "d MMM yyyy");
}

export function formatDateTime(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return format(date, "d MMM yyyy, HH:mm");
}

/** Public-facing review state used in admin. */
export type ReviewDisplayStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "published";

export function reviewDisplayStatus(review: Review): ReviewDisplayStatus {
  if (review.status === "pending" || review.status === "rejected") {
    return review.status;
  }
  if (review.published) return "published";
  return "approved";
}

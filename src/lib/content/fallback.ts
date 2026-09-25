import type { EcosystemProduct, Project, Review } from "./types";

export type PublicCollections = {
  projects: Project[];
  ecosystem: EcosystemProduct[];
  reviews: Review[];
};

export function asOfflineFallback(
  results: ReadonlyArray<PromiseSettledResult<unknown>>,
): boolean {
  return results.length > 0 && results.every((result) => result.status === "rejected");
}

export function coalescePublicCollections(
  fallback: PublicCollections,
  results: ReadonlyArray<PromiseSettledResult<unknown>>,
): PublicCollections {
  if (asOfflineFallback(results)) {
    return fallback;
  }

  const next: PublicCollections = {
    projects: fallback.projects,
    ecosystem: fallback.ecosystem,
    reviews: fallback.reviews,
  };

  for (const [index, result] of results.entries()) {
    if (result.status !== "fulfilled") continue;

    if (index === 0 && Array.isArray(result.value)) {
      next.projects = fallback.projects;
    }
    if (index === 1 && Array.isArray(result.value)) {
      next.ecosystem = fallback.ecosystem;
    }
    if (index === 2 && Array.isArray(result.value)) {
      next.reviews = fallback.reviews;
    }
  }

  return next;
}

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { EcosystemProduct, Project, Review } from "./types";
import { asOfflineFallback, coalescePublicCollections } from "./fallback.ts";

describe("offline public content fallback", () => {
  it("keeps a frozen local snapshot when all backend fetches fail", () => {
    const fallback = {
      projects: [
        {
          id: "seed-project",
          slug: "seed-project",
          title: "Seeded project",
          client: "To be announced",
          category: "Web Development",
          year: null,
          description: "Seeded description",
          overview: "Seeded overview",
          challenge: "",
          objectives: [],
          approach: "",
          design: "",
          development: "",
          keyDecisions: [],
          results: null,
          services: ["web-development"],
          technologies: [],
          gallery: [],
          testimonial: null,
          coverImageUrl: null,
          featuredImage: null,
          cover_image: null,
          url: null,
          featured: true,
          published: true,
          placeholder: false,
          status: "live",
          visual: "alpha",
          publishedAt: null,
          seoTitle: "Seeded project — IGRIS Tech",
          seoDescription: "Seeded description",
        },
      ] satisfies Project[],
      ecosystem: [
        {
          id: "seed-eco",
          name: "Seeded ecosystem",
          slug: "seeded-ecosystem",
          description: "Seeded ecosystem description",
          status: "Live",
          url: null,
          order: 1,
          published: true,
          category: "Infrastructure",
          subdomain: "seeded-ecosystem.igris.com.ng",
        },
      ] satisfies EcosystemProduct[],
      reviews: [
        {
          id: "seed-review",
          clientName: "Seeded client",
          company: "",
          role: "",
          rating: 5,
          content: "Seeded review content.",
          avatar: null,
          project: null,
          website: null,
          status: "approved",
          published: true,
          createdAt: new Date().toISOString(),
        },
      ] satisfies Review[],
    };

    const failed = [
      { status: "rejected", reason: new Error("offline") },
      { status: "rejected", reason: new Error("offline") },
      { status: "rejected", reason: new Error("offline") },
    ] as const satisfies ReadonlyArray<PromiseSettledResult<unknown>>;

    const result = coalescePublicCollections(fallback, failed);
    assert.deepEqual(result, fallback);
    assert.equal(asOfflineFallback(failed), true);
  });
});

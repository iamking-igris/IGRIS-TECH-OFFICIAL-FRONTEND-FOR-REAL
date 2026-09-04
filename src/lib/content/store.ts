import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { seedEcosystem, seedProjects, seedReviews } from "./seed";
import { createId, hostnameFromUrl, uniqueSlug } from "./ids";
import type {
  EcosystemInput,
  EcosystemProduct,
  Inquiry,
  InquiryInput,
  Project,
  ProjectInput,
  ProjectVisualId,
  Review,
  ReviewInput,
} from "./types";

const VISUALS: ProjectVisualId[] = ["alpha", "beta", "gamma"];

function buildProject(input: ProjectInput, existing: Project[], current?: Project): Project {
  const taken = existing
    .filter((p) => p.id !== current?.id)
    .map((p) => p.slug);
  const slug = uniqueSlug(input.slug || input.title, taken);
  const placeholder = !input.challenge && !input.approach && !input.design;
  const published = input.published;
  return {
    id: current?.id ?? createId("proj"),
    slug,
    title: input.title.trim(),
    client: input.client.trim() || "To be announced",
    category: input.category.trim() || "Web Development",
    year: current?.year ?? null,
    description: input.description.trim(),
    overview: input.overview.trim(),
    challenge: input.challenge.trim(),
    objectives: current?.objectives ?? [],
    approach: input.approach.trim(),
    design: input.design.trim(),
    development: input.development.trim(),
    keyDecisions: current?.keyDecisions ?? [],
    results: input.results.trim() ? input.results.trim() : null,
    services: input.services,
    technologies: input.technologies,
    gallery: current?.gallery ?? [],
    testimonial: current?.testimonial ?? null,
    featuredImage: current?.featuredImage ?? null,
    url: input.url.trim() ? input.url.trim() : null,
    featured: input.featured,
    published,
    placeholder,
    status: input.status,
    visual: current?.visual ?? VISUALS[existing.length % VISUALS.length]!,
    publishedAt: published
      ? (current?.publishedAt ?? new Date().toISOString())
      : null,
    seoTitle: `${input.title.trim()} — IGRIS Tech`,
    seoDescription:
      input.description.trim() ||
      `A case study from IGRIS Tech. Published when the work is ready to share.`,
  };
}

function buildEcosystem(
  input: EcosystemInput,
  existing: EcosystemProduct[],
  current?: EcosystemProduct,
): EcosystemProduct {
  const taken = existing.filter((p) => p.id !== current?.id).map((p) => p.slug);
  const slug = uniqueSlug(input.name, taken);
  const url = input.url.trim() ? input.url.trim() : null;
  return {
    id: current?.id ?? createId("eco"),
    name: input.name.trim(),
    slug,
    description: input.description.trim(),
    status: input.status,
    url,
    order: Number.isFinite(input.order) ? input.order : existing.length + 1,
    published: input.published,
    category: current?.category || "Product",
    subdomain: url ? hostnameFromUrl(url) : current?.subdomain || `${slug}.igristech.com`,
  };
}

type ContentState = {
  projects: Project[];
  ecosystem: EcosystemProduct[];
  reviews: Review[];
  inquiries: Inquiry[];
  createProject: (input: ProjectInput) => Project;
  updateProject: (id: string, input: ProjectInput) => Project | null;
  deleteProject: (id: string) => void;
  setProjectPublished: (id: string, published: boolean) => void;
  createEcosystem: (input: EcosystemInput) => EcosystemProduct;
  updateEcosystem: (id: string, input: EcosystemInput) => EcosystemProduct | null;
  deleteEcosystem: (id: string) => void;
  createReview: (input: ReviewInput) => Review;
  updateReview: (id: string, patch: Partial<Review>) => Review | null;
  deleteReview: (id: string) => void;
  createInquiry: (input: InquiryInput) => Inquiry;
  setInquiryRead: (id: string, read: boolean) => void;
  deleteInquiry: (id: string) => void;
};

export const useContentStore = create<ContentState>()(
  persist(
    (set, get) => ({
      projects: seedProjects,
      ecosystem: seedEcosystem,
      reviews: seedReviews,
      inquiries: [],

      createProject: (input) => {
        const project = buildProject(input, get().projects);
        set({ projects: [...get().projects, project] });
        return project;
      },
      updateProject: (id, input) => {
        const current = get().projects.find((p) => p.id === id);
        if (!current) return null;
        const next = buildProject(input, get().projects, current);
        set({
          projects: get().projects.map((p) => (p.id === id ? next : p)),
        });
        return next;
      },
      deleteProject: (id) => {
        set({ projects: get().projects.filter((p) => p.id !== id) });
      },
      setProjectPublished: (id, published) => {
        set({
          projects: get().projects.map((p) =>
            p.id === id
              ? {
                  ...p,
                  published,
                  publishedAt: published
                    ? (p.publishedAt ?? new Date().toISOString())
                    : null,
                }
              : p,
          ),
        });
      },

      createEcosystem: (input) => {
        const item = buildEcosystem(input, get().ecosystem);
        set({ ecosystem: [...get().ecosystem, item] });
        return item;
      },
      updateEcosystem: (id, input) => {
        const current = get().ecosystem.find((p) => p.id === id);
        if (!current) return null;
        const next = buildEcosystem(input, get().ecosystem, current);
        set({
          ecosystem: get().ecosystem.map((p) => (p.id === id ? next : p)),
        });
        return next;
      },
      deleteEcosystem: (id) => {
        set({ ecosystem: get().ecosystem.filter((p) => p.id !== id) });
      },

      createReview: (input) => {
        const review: Review = {
          id: createId("rev"),
          clientName: input.clientName.trim(),
          company: input.company.trim(),
          role: input.role.trim(),
          rating: input.rating,
          content: input.content.trim(),
          avatar: null,
          project: input.project.trim() || null,
          website: input.website.trim() || null,
          status: "pending",
          published: false,
          createdAt: new Date().toISOString(),
        };
        set({ reviews: [review, ...get().reviews] });
        return review;
      },
      updateReview: (id, patch) => {
        const current = get().reviews.find((r) => r.id === id);
        if (!current) return null;
        const next = { ...current, ...patch, id: current.id };
        set({
          reviews: get().reviews.map((r) => (r.id === id ? next : r)),
        });
        return next;
      },
      deleteReview: (id) => {
        set({ reviews: get().reviews.filter((r) => r.id !== id) });
      },

      createInquiry: (input) => {
        const inquiry: Inquiry = {
          id: createId("inq"),
          name: input.name.trim(),
          email: input.email.trim(),
          company: input.company.trim(),
          type: input.type.trim(),
          description: input.description.trim(),
          budget: input.budget.trim(),
          timeline: input.timeline.trim(),
          website: input.website.trim(),
          contactMethod: input.contactMethod.trim(),
          createdAt: new Date().toISOString(),
          read: false,
        };
        set({ inquiries: [inquiry, ...get().inquiries] });
        return inquiry;
      },
      setInquiryRead: (id, read) => {
        set({
          inquiries: get().inquiries.map((i) =>
            i.id === id ? { ...i, read } : i,
          ),
        });
      },
      deleteInquiry: (id) => {
        set({ inquiries: get().inquiries.filter((i) => i.id !== id) });
      },
    }),
    {
      name: "igris-content-v1",
      skipHydration: true,
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
    },
  ),
);

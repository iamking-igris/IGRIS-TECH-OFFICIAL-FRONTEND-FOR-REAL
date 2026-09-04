/**
 * Compatibility surface for static SEO fallbacks.
 * Live project data lives in `@/lib/content` (mock repository today, API later).
 * Do not add new mock arrays here.
 */
export type {
  Project,
  ProjectStatus,
  ProjectVisualId,
} from "@/lib/content/types";
export { seedProjects as projects } from "@/lib/content/seed";

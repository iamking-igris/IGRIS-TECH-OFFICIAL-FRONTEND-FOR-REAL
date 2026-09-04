/**
 * Compatibility surface. Live ecosystem data lives in `@/lib/content`.
 */
export type { EcosystemProduct, ProductStatus } from "@/lib/content/types";
export {
  seedEcosystem as ecosystemProducts,
  FUTURE_PRODUCTS_NOTE as futureProductsNote,
} from "@/lib/content/seed";

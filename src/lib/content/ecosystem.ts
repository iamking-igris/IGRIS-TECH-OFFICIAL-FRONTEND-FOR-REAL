import { useMemo } from "react";
import { FUTURE_PRODUCTS_NOTE } from "./seed";
import { useContentStore } from "./store";
import type { EcosystemInput, EcosystemProduct, ProductStatus } from "./types";

export { FUTURE_PRODUCTS_NOTE };

export const ECOSYSTEM_STATUSES: ProductStatus[] = [
  "Live",
  "In development",
  "Coming soon",
  "Experimental",
];

export function emptyEcosystemInput(): EcosystemInput {
  return {
    name: "",
    description: "",
    url: "",
    status: "In development",
    order: 0,
    published: true,
  };
}

export function ecosystemToInput(item: EcosystemProduct): EcosystemInput {
  return {
    name: item.name,
    description: item.description,
    url: item.url ?? "",
    status: item.status,
    order: item.order,
    published: item.published,
  };
}

/**
 * Ecosystem repository.
 * Mock implementation today. Later: GET/POST/PUT/DELETE /api/ecosystem.
 */
export const ecosystemService = {
  list(): EcosystemProduct[] {
    return [...useContentStore.getState().ecosystem].sort(
      (a, b) => a.order - b.order,
    );
  },
  published() {
    return ecosystemService.list().filter((p) => p.published);
  },
  getById(id: string) {
    return useContentStore.getState().ecosystem.find((p) => p.id === id) ?? null;
  },
  create(input: EcosystemInput) {
    return useContentStore.getState().createEcosystem(input);
  },
  update(id: string, input: EcosystemInput) {
    return useContentStore.getState().updateEcosystem(id, input);
  },
  delete(id: string) {
    useContentStore.getState().deleteEcosystem(id);
  },
};

export function useEcosystem() {
  const ecosystem = useContentStore((s) => s.ecosystem);
  return useMemo(
    () => [...ecosystem].sort((a, b) => a.order - b.order),
    [ecosystem],
  );
}

export function usePublishedEcosystem() {
  const ecosystem = useContentStore((s) => s.ecosystem);
  return useMemo(
    () =>
      [...ecosystem]
        .filter((p) => p.published)
        .sort((a, b) => a.order - b.order),
    [ecosystem],
  );
}

export function useEcosystemById(id: string) {
  return useContentStore((s) => s.ecosystem.find((p) => p.id === id) ?? null);
}

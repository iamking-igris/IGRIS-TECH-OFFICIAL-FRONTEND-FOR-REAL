import apiFetch from "@/lib/api";
import { seedEcosystem } from "@/lib/content";

export async function listEcosystem() {
  try {
    const data = await apiFetch("/ecosystem");
    if (!Array.isArray(data)) throw new Error("Unexpected ecosystem response");
    return data;
  } catch (e) {
    // fallback to seeded/mock data
    try {
      return seedEcosystem;
    } catch {
      return [];
    }
  }
}

export async function createProduct(payload: any) {
  return apiFetch(`/ecosystem`, { method: "POST", body: payload });
}

export async function updateProduct(id: string | number, payload: any) {
  return apiFetch(`/ecosystem/${id}`, { method: "PUT", body: payload });
}

export async function deleteProduct(id: string | number) {
  return apiFetch(`/ecosystem/${id}`, { method: "DELETE" });
}

export default { listEcosystem, createProduct, updateProduct, deleteProduct };
import { api } from "@/lib/api";
import type {
  EcosystemCreate,
  EcosystemResponse,
  EcosystemUpdate,
} from "@/types/ecosystem";

export const ecosystemService = {
  /**
   * Fetch active ecosystem products for public site
   */
  async getEcosystemProducts(): Promise<EcosystemResponse[]> {
    return api.get<EcosystemResponse[]>("/api/v1/ecosystem");
  },

  /**
   * Fetch a single ecosystem product by slug
   */
  async getEcosystemProductBySlug(slug: string): Promise<EcosystemResponse> {
    return api.get<EcosystemResponse>(`/api/v1/ecosystem/${encodeURIComponent(slug)}`);
  },

  /**
   * Create an ecosystem product (admin protected)
   */
  async createEcosystemProduct(data: EcosystemCreate): Promise<EcosystemResponse> {
    return api.post<EcosystemResponse>("/api/v1/ecosystem", data, {
      requiresAdmin: true,
    });
  },

  /**
   * Update an ecosystem product (admin protected)
   */
  async updateEcosystemProduct(
    productId: number,
    data: EcosystemUpdate,
  ): Promise<EcosystemResponse> {
    return api.patch<EcosystemResponse>(`/api/v1/ecosystem/${productId}`, data, {
      requiresAdmin: true,
    });
  },

  /**
   * Delete an ecosystem product (admin protected)
   */
  async deleteEcosystemProduct(productId: number): Promise<void> {
    return api.delete<void>(`/api/v1/ecosystem/${productId}`, {
      requiresAdmin: true,
    });
  },
};

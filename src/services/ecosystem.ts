import { api } from "@/lib/api";
import type {
  EcosystemCreate,
  EcosystemResponse,
  EcosystemUpdate,
} from "@/types/ecosystem";

export const ecosystemService = {
  async getEcosystemProducts(): Promise<EcosystemResponse[]> {
    return api.get<EcosystemResponse[]>("/ecosystem");
  },

  async getEcosystemProductBySlug(slug: string): Promise<EcosystemResponse> {
    return api.get<EcosystemResponse>(`/ecosystem/${encodeURIComponent(slug)}`);
  },

  async createEcosystemProduct(data: EcosystemCreate): Promise<EcosystemResponse> {
    return api.post<EcosystemResponse>("/ecosystem", data);
  },

  async updateEcosystemProduct(
    productId: number,
    data: EcosystemUpdate,
  ): Promise<EcosystemResponse> {
    return api.patch<EcosystemResponse>(`/ecosystem/${productId}`, data);
  },

  async deleteEcosystemProduct(productId: number): Promise<void> {
    return api.delete<void>(`/ecosystem/${productId}`);
  },
};

export const getEcosystemProducts = ecosystemService.getEcosystemProducts;
export const getEcosystemProductBySlug = ecosystemService.getEcosystemProductBySlug;
export const createEcosystemProduct = ecosystemService.createEcosystemProduct;
export const updateEcosystemProduct = ecosystemService.updateEcosystemProduct;
export const deleteEcosystemProduct = ecosystemService.deleteEcosystemProduct;

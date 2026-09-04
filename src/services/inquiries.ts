import apiFetch from "@/lib/api";

export async function submitInquiry(payload: any) {
  return apiFetch(`/inquiries`, { method: "POST", body: payload });
}

export async function listInquiries() {
  try {
    const data = await apiFetch(`/inquiries`);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default { submitInquiry, listInquiries };
import { api } from "@/lib/api";
import type {
  ContactSubmissionCreate,
  ContactSubmissionResponse,
  ContactSubmissionUpdate,
} from "@/types/inquiry";

export const inquiriesService = {
  /**
   * Submit project inquiry from public contact form
   */
  async submitContactInquiry(
    data: ContactSubmissionCreate,
  ): Promise<ContactSubmissionResponse> {
    return api.post<ContactSubmissionResponse>("/api/v1/contact", data);
  },

  /**
   * List contact inquiries (admin protected)
   */
  async getContactInquiries(status?: string): Promise<ContactSubmissionResponse[]> {
    return api.get<ContactSubmissionResponse[]>("/api/v1/contact", {
      params: status ? { status } : undefined,
      requiresAdmin: true,
    });
  },

  /**
   * Get single contact inquiry by id (admin protected)
   */
  async getContactInquiryById(
    submissionId: number,
  ): Promise<ContactSubmissionResponse> {
    return api.get<ContactSubmissionResponse>(`/api/v1/contact/${submissionId}`, {
      requiresAdmin: true,
    });
  },

  /**
   * Update inquiry status (admin protected)
   */
  async updateContactInquiryStatus(
    submissionId: number,
    data: ContactSubmissionUpdate,
  ): Promise<ContactSubmissionResponse> {
    return api.patch<ContactSubmissionResponse>(
      `/api/v1/contact/${submissionId}`,
      data,
      { requiresAdmin: true },
    );
  },

  /**
   * Delete contact inquiry (admin protected)
   */
  async deleteContactInquiry(submissionId: number): Promise<void> {
    return api.delete<void>(`/api/v1/contact/${submissionId}`, {
      requiresAdmin: true,
    });
  },
};

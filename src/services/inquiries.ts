import { api } from "@/lib/api";
import type {
  ContactSubmissionCreate,
  ContactSubmissionResponse,
  ContactSubmissionUpdate,
} from "@/types/inquiry";

export const inquiriesService = {
  async submitContactInquiry(
    data: ContactSubmissionCreate,
  ): Promise<ContactSubmissionResponse> {
    return api.post<ContactSubmissionResponse>("/contact", data);
  },

  async getContactInquiries(status?: string): Promise<ContactSubmissionResponse[]> {
    return api.get<ContactSubmissionResponse[]>("/contact", {
      params: status ? { status } : undefined,
    });
  },

  async getContactInquiryById(
    submissionId: number,
  ): Promise<ContactSubmissionResponse> {
    return api.get<ContactSubmissionResponse>(`/contact/${submissionId}`);
  },

  async updateContactInquiryStatus(
    submissionId: number,
    data: ContactSubmissionUpdate,
  ): Promise<ContactSubmissionResponse> {
    return api.patch<ContactSubmissionResponse>(`/contact/${submissionId}`, data);
  },

  async deleteContactInquiry(submissionId: number): Promise<void> {
    return api.delete<void>(`/contact/${submissionId}`);
  },
};

export const submitContactInquiry = inquiriesService.submitContactInquiry;
export const getContactInquiries = inquiriesService.getContactInquiries;
export const getContactInquiryById = inquiriesService.getContactInquiryById;
export const updateContactInquiryStatus = inquiriesService.updateContactInquiryStatus;
export const deleteContactInquiry = inquiriesService.deleteContactInquiry;

import { useContentStore } from "./store";
import type { Inquiry, InquiryInput } from "./types";

export const PROJECT_TYPES = [
  "Website",
  "Web Application",
  "Software",
  "AI Solution",
  "Automation",
  "Other",
] as const;

export const BUDGETS = [
  "Prefer not to say",
  "Under $2,000",
  "$2,000 – $8,000",
  "$8,000 – $20,000",
  "$20,000+",
] as const;

export const TIMELINES = [
  "As soon as possible",
  "1–2 months",
  "3–6 months",
  "Flexible",
] as const;

export const CONTACT_METHODS = ["Email", "Phone", "WhatsApp", "Other"] as const;

/**
 * Contact / inquiry repository.
 * Mock capture only — no email is sent.
 * Later: POST /api/contact.
 */
export const contactService = {
  list(): Inquiry[] {
    return useContentStore.getState().inquiries;
  },
  submit(input: InquiryInput) {
    const name = input.name.trim();
    const email = input.email.trim();
    const type = input.type.trim();
    const description = input.description.trim();
    if (!name) throw new Error("Name is required.");
    if (!email) throw new Error("Email is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Enter a valid email address.");
    }
    if (!type) throw new Error("Project type is required.");
    if (!description) throw new Error("Project description is required.");
    return useContentStore.getState().createInquiry(input);
  },
  setRead(id: string, read: boolean) {
    useContentStore.getState().setInquiryRead(id, read);
  },
  delete(id: string) {
    useContentStore.getState().deleteInquiry(id);
  },
};

export function useInquiries() {
  return useContentStore((s) => s.inquiries);
}

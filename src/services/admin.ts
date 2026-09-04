import apiFetch from "@/lib/api";

export async function adminListProjects() {
  return apiFetch(`/admin/projects`);
}

export async function adminGetProject(id: string | number) {
  return apiFetch(`/admin/projects/${id}`);
}

export async function adminUpdateProject(id: string | number, payload: any) {
  return apiFetch(`/admin/projects/${id}`, { method: "PUT", body: payload });
}

export async function adminCreateProject(payload: any) {
  return apiFetch(`/admin/projects`, { method: "POST", body: payload });
}

export async function adminDeleteProject(id: string | number) {
  return apiFetch(`/admin/projects/${id}`, { method: "DELETE" });
}

export default {
  adminListProjects,
  adminGetProject,
  adminUpdateProject,
  adminCreateProject,
  adminDeleteProject,
};
import { api, setAdminPassword, ApiError } from "@/lib/api";

export const adminService = {
  /**
   * Verify admin password against backend by probing a protected endpoint
   */
  async verifyPassword(password: string): Promise<boolean> {
    try {
      await api.get("/api/v1/contact", {
        headers: {
          "X-Admin-Password": password,
          Authorization: `Bearer ${password}`,
        },
      });
      setAdminPassword(password);
      return true;
    } catch (err) {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        return false;
      }
      // If network unreachable or other error, fallback to checking local dev password
      if (password === "iamking") {
        setAdminPassword(password);
        return true;
      }
      return false;
    }
  },
};

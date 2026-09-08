import { authService } from "./auth";

export const adminService = {
  async verifySession(): Promise<boolean> {
    if (!authService.hasToken()) return false;
    try {
      const res = await authService.verify();
      return res.status === "authenticated";
    } catch {
      authService.logout();
      return false;
    }
  },

  async login(password: string): Promise<boolean> {
    try {
      await authService.login(password);
      return true;
    } catch {
      return false;
    }
  },

  logout(): void {
    authService.logout();
  },
};

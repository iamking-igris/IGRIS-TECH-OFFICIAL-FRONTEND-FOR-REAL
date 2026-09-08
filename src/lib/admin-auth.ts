/**
 * Real Backend JWT Authentication Gate for Admin.
 * Handles login via POST /api/v1/auth/login, token storage, and session verification via GET /api/v1/auth/verify.
 */

import { authService } from "@/services/auth";

export function isAdminAuthenticated(): boolean {
  return authService.hasToken();
}

export async function verifyAdminSession(): Promise<boolean> {
  if (!authService.hasToken()) return false;
  try {
    const res = await authService.verify();
    return res.status === "authenticated";
  } catch {
    authService.logout();
    return false;
  }
}

export async function loginAdmin(password: string): Promise<boolean> {
  try {
    const res = await authService.login(password);
    return Boolean(res.access_token);
  } catch {
    return false;
  }
}

export function logoutAdmin(): void {
  authService.logout();
}

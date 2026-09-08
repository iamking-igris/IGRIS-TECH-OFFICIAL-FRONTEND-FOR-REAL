import { api, clearAuthToken, getAuthToken, setAuthToken } from "@/lib/api";
import type {
  AdminLoginRequest,
  AuthVerifyResponse,
  TokenResponse,
} from "@/types/auth";

export const authService = {
  /**
   * Log in admin with password, obtain signed JWT, and store it.
   */
  async login(password: string): Promise<TokenResponse> {
    const payload: AdminLoginRequest = { password };
    const response = await api.post<TokenResponse>("/auth/login", payload, {
      skipAuth: true,
    });
    if (response.access_token) {
      setAuthToken(response.access_token);
    }
    return response;
  },

  /**
   * Verify currently stored JWT against backend.
   * Returns 200 with { status: "authenticated", sub: "admin", role: "admin" } on success.
   * Throws ApiError (e.g. 401) on failure.
   */
  async verify(): Promise<AuthVerifyResponse> {
    return api.get<AuthVerifyResponse>("/auth/verify");
  },

  /**
   * Clear admin authentication session.
   */
  logout(): void {
    clearAuthToken();
  },

  /**
   * Check if token is present locally.
   */
  hasToken(): boolean {
    return Boolean(getAuthToken());
  },
};

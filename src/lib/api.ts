/**
 * Central API Client for IGRIS Tech backend.
 * Handles:
 * - Centralized base URL configuration via VITE_API_BASE_URL
 * - JSON headers & body serialization
 * - Automatic Authorization: Bearer <token> attachment
 * - Unified response parsing & error formatting
 * - Centralized 401 handling & token clearing
 */

const RAW_BASE_URL =
  (import.meta.env?.VITE_API_BASE_URL as string | undefined)?.trim() ||
  "https://igris-tech-official-backend-for-real-production.up.railway.app/api/v1";

// Ensure no trailing slash
export const API_BASE_URL: string = RAW_BASE_URL.replace(/\/+$/, "");

const AUTH_TOKEN_KEY = "igris_admin_token";

type AuthListener = (authenticated: boolean) => void;
const authListeners: Set<AuthListener> = new Set();

export function subscribeAuth(listener: AuthListener): () => void {
  authListeners.add(listener);
  return () => authListeners.delete(listener);
}

function notifyAuthChange(authed: boolean) {
  authListeners.forEach((fn) => {
    try {
      fn(authed);
    } catch (e) {
      console.error("[api] Auth listener error:", e);
    }
  });
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem(AUTH_TOKEN_KEY) ||
    sessionStorage.getItem(AUTH_TOKEN_KEY) ||
    null
  );
}

export function setAuthToken(token: string, persist = true): void {
  if (typeof window === "undefined") return;
  if (persist) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  }
  notifyAuthChange(true);
}

export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  notifyAuthChange(false);
}

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | null | undefined>;
  skipAuth?: boolean;
}

/**
 * Builds the complete URL from endpoint.
 * Handles endpoints like:
 * - "/projects" -> "<API_BASE_URL>/projects"
 * - "/api/v1/projects" -> "<origin>/api/v1/projects" or normalized to base
 * - full "http://..."
 */
function resolveUrl(endpoint: string): string {
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    return endpoint;
  }

  const cleanPath = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  // If base URL already ends with /api/v1 and path starts with /api/v1, avoid duplication
  if (API_BASE_URL.endsWith("/api/v1") && cleanPath.startsWith("/api/v1/")) {
    const rootBase = API_BASE_URL.slice(0, -"/api/v1".length);
    return `${rootBase}${cleanPath}`;
  }

  return `${API_BASE_URL}${cleanPath}`;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, skipAuth = false, headers: customHeaders, ...fetchOptions } = options;

  let url = resolveUrl(endpoint);

  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, val] of Object.entries(params)) {
      if (val !== null && val !== undefined && val !== "") {
        searchParams.append(key, String(val));
      }
    }
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const headers = new Headers(customHeaders);
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (
    fetchOptions.body &&
    typeof fetchOptions.body === "string" &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  // Automatically attach Bearer token if present
  if (!skipAuth) {
    const token = getAuthToken();
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...fetchOptions,
      headers,
    });
  } catch (networkErr) {
    throw new ApiError(
      networkErr instanceof Error
        ? networkErr.message
        : "Network error. Backend unreachable.",
      0,
    );
  }

  // Handle 401 Unauthorized centrally
  if (response.status === 401) {
    // If we had a token, it is expired or invalid
    if (getAuthToken()) {
      clearAuthToken();
    }
  }

  // Parse response
  let data: unknown = null;
  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    try {
      data = await response.text();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    if (data && typeof data === "object") {
      const errObj = data as Record<string, unknown>;
      if (typeof errObj.detail === "string") {
        errorMessage = errObj.detail;
      } else if (Array.isArray(errObj.detail)) {
        errorMessage = errObj.detail
          .map((item) =>
            typeof item === "object" && item?.msg ? item.msg : String(item),
          )
          .join(", ");
      } else if (typeof errObj.message === "string") {
        errorMessage = errObj.message;
      }
    }
    throw new ApiError(errorMessage, response.status, data);
  }

  return data as T;
}

export const api = {
  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return apiClient<T>(endpoint, { ...options, method: "GET" });
  },

  post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return apiClient<T>(endpoint, {
      ...options,
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },

  patch<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return apiClient<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },

  put<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return apiClient<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },

  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return apiClient<T>(endpoint, { ...options, method: "DELETE" });
  },
};

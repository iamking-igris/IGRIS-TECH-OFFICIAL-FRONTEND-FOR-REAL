/* Centralized API client used across the frontend. */
export const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string) || "http://127.0.0.1:8000";

type FetchOptions = RequestInit & { /** if true, don't throw on non-2xx */ silent?: boolean };

async function parseJsonSafe(response: Response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

export async function apiFetch(path: string, opts: FetchOptions = {}) {
  const url = path.startsWith("http") ? path : `${API_BASE.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(opts.headers as Record<string, string>),
  };

  const init: RequestInit = {
    method: opts.method ?? "GET",
    headers,
    body: opts.body as any,
    credentials: "include",
    ...opts,
  };

  if (init.body && typeof init.body !== "string" && !(init.body instanceof FormData)) {
    init.body = JSON.stringify(init.body);
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, init);
  if (!res.ok && !opts.silent) {
    const data = await parseJsonSafe(res);
    const message = (data && (data.message || data.detail || data.error)) || res.statusText;
    const err: any = new Error(`API ${res.status} ${message}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  if (res.status === 204) return null;
  return parseJsonSafe(res);
}

export async function getOpenApi() {
  try {
    return await apiFetch("/openapi.json", { silent: true });
  } catch (e) {
    return null;
  }
}

export default apiFetch;
/**
 * Central API client for IGRIS Tech backend integration.
 * Communicates with the FastAPI backend (default: http://127.0.0.1:8000).
 */

export const API_BASE_URL: string =
  (import.meta.env?.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, "") ||
  "http://127.0.0.1:8000";

const ADMIN_PASSWORD_KEY = "igris-admin-password";

export function getAdminPassword(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(ADMIN_PASSWORD_KEY) || null;
}

export function setAdminPassword(password: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ADMIN_PASSWORD_KEY, password);
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

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | null | undefined>;
  requiresAdmin?: boolean;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, requiresAdmin, headers: customHeaders, ...fetchOptions } = options;

  let url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, val] of Object.entries(params)) {
      if (val !== null && val !== undefined) {
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

  // Admin authentication if required or available
  const adminPassword = getAdminPassword();
  if (adminPassword && (requiresAdmin || endpoint.includes("/admin") || ["POST", "PATCH", "DELETE"].includes(fetchOptions.method?.toUpperCase() || ""))) {
    if (!headers.has("X-Admin-Password")) {
      headers.set("X-Admin-Password", adminPassword);
    }
    if (!headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${adminPassword}`);
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
      networkErr instanceof Error ? networkErr.message : "Network error. Backend unreachable.",
      0,
    );
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
          .map((item) => (typeof item === "object" && item?.msg ? item.msg : String(item)))
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

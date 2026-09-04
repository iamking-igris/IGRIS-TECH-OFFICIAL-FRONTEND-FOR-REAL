/**
 * Development-only admin gate.
 *
 * This is NOT production authentication.
 * It is a temporary client-side check so the admin UI can be prototyped.
 * Replace this module with real backend auth (session / HTTP-only cookie)
 * before any public deployment of /admin.
 */

const SESSION_KEY = "igris-admin-dev-session";

/** Temporary mock password for local prototyping. Not a production secret. */
const DEV_MOCK_PASSWORD = "iamking";

export function isAdminAuthenticated() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "ok";
}

export function loginAdmin(password: string) {
  if (password === DEV_MOCK_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, "ok");
    return true;
  }
  return false;
}

export function logoutAdmin() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
}

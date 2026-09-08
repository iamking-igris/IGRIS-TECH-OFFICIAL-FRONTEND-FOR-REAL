/**
 * Authentication schemas aligned with FastAPI backend:
 * - AdminLoginRequest
 * - TokenResponse
 * - AuthVerifyResponse
 */

export interface AdminLoginRequest {
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in_minutes: number;
}

export interface AuthVerifyResponse {
  status: string;
  sub: string;
  role: string;
}

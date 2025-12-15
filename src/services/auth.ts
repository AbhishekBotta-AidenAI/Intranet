import axios from 'axios';
import { API_BASE_URL } from './api';

const client = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 30000,
});

export interface LoginUrlResponse {
  auth_url: string;
  state: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
  state?: string;
  received_at?: number;
}

class AuthAPI {
  async getLoginUrl(): Promise<LoginUrlResponse> {
    const res = await client.get<LoginUrlResponse>('/api/auth/login-url');
    return res.data;
  }

  async exchangeCode(code: string, state?: string): Promise<TokenResponse> {
    const res = await client.post<TokenResponse>('/api/auth/callback', { code, state });
    return res.data;
  }

  async refresh(refreshToken?: string): Promise<TokenResponse> {
    const res = await client.post<TokenResponse>('/api/auth/refresh', { refresh_token: refreshToken });
    return res.data;
  }
}

export const authAPI = new AuthAPI();

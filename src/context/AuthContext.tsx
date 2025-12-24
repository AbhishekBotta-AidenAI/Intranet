import { createContext } from 'react';

export interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string | null;
  token?: string | null;
  user?: {
    name: string;
    email: string;
  } | null;
}

// Export only the context from this module to keep it HMR-stable.
export const AuthContext = createContext<AuthContextValue | null>(null);


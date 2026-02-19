import React from 'react';
import type { UserRole } from '@/features/auth/login/api/loginApi';

export interface User {
  username: string;
  token: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  login(data: { email: string; password: string }): Promise<void>;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

import React from 'react';
import { loginApi } from '@/features/auth/login/api/loginApi';
import type { UserRole } from '@/shared/types';
import { AuthContext, type User } from './AuthContext';

export { AuthContext };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role') as UserRole;
    if (token && username && role) {
      return { token, username, role };
    }
    return null;
  });

  const login = async (data: { email: string; password: string }) => {
    const response = await loginApi(data);

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', response.data.name);
    localStorage.setItem('role', response.data.role);
    setUser({
      token: response.data.token,
      username: response.data.name,
      role: response.data.role,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

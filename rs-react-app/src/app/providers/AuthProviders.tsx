import React from 'react';
import { loginApi } from '@/features/auth/login/api/loginApi';
import type { UserRole } from '@/features/auth/login/api/loginApi';
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
    const response = await loginApi(data.email, data.password);

    localStorage.setItem('token', response.token);
    localStorage.setItem('username', response.name);
    localStorage.setItem('role', response.role);
    setUser({
      token: response.token,
      username: response.name,
      role: response.role,
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

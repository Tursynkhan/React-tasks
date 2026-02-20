import type { UserRole } from '@/shared/types';

const API_URL = import.meta.env.VITE_API_BASE_URL;

interface BaseResponse<T> {
  data: T;
  message: string;
}
interface LoginResponse {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}

export async function loginApi(query: {
  email: string;
  password: string;
}): Promise<BaseResponse<LoginResponse>> {
  const { email, password } = query;
  const response = await fetch(`${API_URL}/me/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data;
}

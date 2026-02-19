const API_URL = import.meta.env.VITE_API_BASE_URL;

export type UserRole = 'admin' | 'user' | 'guest';

interface LoginResponse {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}

export async function loginApi(
  email: string,
  password: string
): Promise<LoginResponse> {
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

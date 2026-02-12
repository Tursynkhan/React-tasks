const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;

export async function loginApi(
  username: string,
  password: string
): Promise<{ accessToken: string; username: string }> {
  const response = await fetch(`${AUTH_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  return data;
}

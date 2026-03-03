import type { UserRole } from '@/shared/types';
import { apiClient } from '@/shared/api/client';

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
  return apiClient.post<BaseResponse<LoginResponse>>('/me/login', {
    email,
    password,
  });
}

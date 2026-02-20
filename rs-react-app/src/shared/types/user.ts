export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}

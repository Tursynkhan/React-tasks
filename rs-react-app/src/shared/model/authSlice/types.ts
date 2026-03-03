import type { UserRole } from '@/shared/types';

export type Status = 'idle' | 'success' | 'error' | 'loading';

export interface AuthState {
  user: {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    token: string;
  } | null;
  status: Status;
  errorMessage: string | null;
}

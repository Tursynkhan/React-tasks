export { login } from './thunks';

export {
  logout,
  clearError,
  selectName,
  selectIsAuthenticated,
  selectRole,
  selectStatus,
  selectAuthError,
  selectUser,
} from './authSlice';

export type { AuthState, Status } from './types';

export { default } from './authSlice';

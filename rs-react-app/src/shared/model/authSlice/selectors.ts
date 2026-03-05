import type { AuthState } from './types';

type RootState = { auth: AuthState };

export const selectName = (state: RootState) => state.auth.user?.name;
export const selectIsAuthenticated = (state: RootState) =>
  !!state.auth.user?.token;
export const selectRole = (state: RootState) => state.auth.user?.role;
export const selectAuthError = (state: RootState) => state.auth.errorMessage;
export const selectUser = (state: RootState) => state.auth.user;
export const selectStatus = (state: RootState) => state.auth.status;

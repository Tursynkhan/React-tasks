import { createSlice } from '@reduxjs/toolkit';
import type { UserRole } from '@/shared/types';
import type { AuthState } from './types';
import { login } from './thunks';

const initialState: AuthState = {
  user: (() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('username');
    const role = localStorage.getItem('role') as UserRole;
    if (token && name && role) {
      return {
        id: 0,
        name,
        email: '',
        role,
        token,
      };
    }
    return null;
  })(),
  status: 'idle',
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.errorMessage = null;

      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
    },
    clearError(state) {
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.errorMessage = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.errorMessage = null;
        state.status = 'success';

        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('username', action.payload.name);
        localStorage.setItem('role', action.payload.role);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'error';
        state.errorMessage = (action.payload as string) ?? 'Login failed';
      });
  },
  selectors: {
    selectName: (state) => state.user?.name,
    selectIsAuthenticated: (state) => !!state.user?.token,
    selectRole: (state) => state.user?.role,
    selectAuthError: (state) => state.errorMessage,
    selectUser: (state) => state.user,
    selectStatus: (state) => state.status,
  },
});

export const { logout, clearError } = authSlice.actions;
export const {
  selectName,
  selectIsAuthenticated,
  selectRole,
  selectStatus,
  selectAuthError,
  selectUser,
} = authSlice.selectors;
export default authSlice.reducer;

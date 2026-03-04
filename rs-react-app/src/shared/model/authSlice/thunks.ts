import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '@/features/auth/login';
import { HttpError } from '@/shared/api/client';

export const login = createAsyncThunk(
  'auth/login',
  async (query: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginApi(query);
      return response.data;
    } catch (error) {
      if (error instanceof HttpError) {
        if (error.response.status === 401) {
          return rejectWithValue('Invalid email or password');
        }
        return rejectWithValue(error.apiMessage);
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'Login failed'
      );
    }
  }
);

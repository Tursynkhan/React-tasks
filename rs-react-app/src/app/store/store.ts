import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/shared/model/authSlice/authSlice';
import movieReducer from '@/shared/model/movieSlice/movieSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movie: movieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

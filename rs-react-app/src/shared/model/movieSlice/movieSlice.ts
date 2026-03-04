import { createSlice } from '@reduxjs/toolkit';
import type { MovieState } from './types';
import {
  fetchMovie,
  deleteMovie,
  createMovie,
  editMovie,
  fetchMovieById,
} from './thunks';

const initialState: MovieState = {
  movies: [],
  totalAmount: 0,
  status: 'idle',
  errorMessage: null,
  deleteStatus: 'idle',
  createStatus: 'idle',
  editStatus: 'idle',
  currentMovie: null,
  currentMovieStatus: 'idle',
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    clearError(state) {
      state.errorMessage = null;
    },
    resetCreateStatus(state) {
      state.createStatus = 'idle';
      state.errorMessage = null;
    },
    resetEditStatus(state) {
      state.editStatus = 'idle';
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.status = 'loading';
        state.errorMessage = null;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.movies = action.payload.data;
        state.totalAmount = action.payload.filteredCount ?? 0;
        state.errorMessage = null;
        state.status = 'success';
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.status = 'error';
        state.errorMessage =
          (action.payload as string) ?? 'Failed to fetch Movie';
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.currentMovieStatus = 'loading';
        state.errorMessage = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.currentMovie = action.payload;
        state.currentMovieStatus = 'success';
        state.errorMessage = null;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.currentMovieStatus = 'error';
        state.errorMessage =
          (action.payload as string) ?? 'Failed to fetch movie by ID';
      })

      .addCase(deleteMovie.pending, (state) => {
        state.deleteStatus = 'loading';
        state.errorMessage = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(
          (movie) => movie.id !== action.payload
        );
        state.deleteStatus = 'success';
        state.errorMessage = null;
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.deleteStatus = 'error';
        state.errorMessage =
          (action.payload as string) ?? 'Failed to delete movie';
      })

      .addCase(createMovie.pending, (state) => {
        state.createStatus = 'loading';
        state.errorMessage = null;
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
        state.createStatus = 'success';
        state.errorMessage = null;
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.createStatus = 'error';
        state.errorMessage =
          (action.payload as string) ?? 'Failed to create movie';
      })

      .addCase(editMovie.pending, (state) => {
        state.editStatus = 'loading';
        state.errorMessage = null;
      })
      .addCase(editMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex((m) => m.id === action.payload.id);
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
        state.currentMovie = action.payload;
        state.editStatus = 'success';
        state.errorMessage = null;
      })
      .addCase(editMovie.rejected, (state, action) => {
        state.editStatus = 'error';
        state.errorMessage =
          (action.payload as string) ?? 'Failed to edit movie';
      });
  },
});

export const { clearError, resetCreateStatus, resetEditStatus } =
  movieSlice.actions;

export default movieSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { movieApi } from '@/entities/movie/api/movieApi';
import { deleteMovieApi } from '@/features/movies/deleteMovie/api/deleteMovieApi';
import type { MovieItem, MoviesParams } from '@/entities/movie/model/types';

type Status = 'idle' | 'success' | 'error' | 'loading';

interface MovieState {
  movies: MovieItem[];
  status: Status;
  errorMessage: string | null;
  deleteStatus: Status;
}

export const fetchMovie = createAsyncThunk(
  'movies/fetchMovie',
  async (query: MoviesParams = {}, { rejectWithValue }) => {
    try {
      const response = await movieApi(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Fetch movie failed'
      );
    }
  }
);

export const deleteMovie = createAsyncThunk(
  'movies/deleteMovie',
  async (movieId: number, { rejectWithValue }) => {
    try {
      await deleteMovieApi(movieId);
      return movieId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Delete movie failed'
      );
    }
  }
);

const initialState: MovieState = {
  movies: [],
  status: 'idle',
  errorMessage: null,
  deleteStatus: 'idle',
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    clearError(state) {
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
        state.movies = action.payload;
        state.errorMessage = null;
        state.status = 'success';
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.status = 'error';
        state.errorMessage =
          (action.payload as string) ?? 'Failed to fetch Movie';
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
      });
  },
  selectors: {
    selectMoviesStatus: (state) => state.status,
    selectMovies: (state) => state.movies,
    selectMoviesError: (state) => state.errorMessage,
    selectDeleteStatus: (state) => state.deleteStatus,
  },
});

export const { clearError } = movieSlice.actions;
export const {
  selectMoviesError,
  selectMovies,
  selectMoviesStatus,
  selectDeleteStatus,
} = movieSlice.selectors;

export default movieSlice.reducer;

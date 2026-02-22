import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { movieApi } from '@/entities/movie/api/movieApi';
import type { MovieItem, MoviesParams } from '@/entities/movie/model/types';

type Status = 'idle' | 'success' | 'error' | 'loading';

interface MovieState {
  movies: MovieItem[];
  status: Status;
  errorMessage: string | null;
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

const initialState: MovieState = {
  movies: [],
  status: 'idle',
  errorMessage: null,
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
      });
  },
  selectors: {
    selectStatus: (state) => state.status,
  },
});

export const { clearError } = movieSlice.actions;
export const { selectStatus } = movieSlice.selectors;
export default movieSlice.reducer;

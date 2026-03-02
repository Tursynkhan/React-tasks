import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { movieApi, fetchMovieByIdApi } from '@/entities/movie/api/movieApi';
import { deleteMovieApi } from '@/features/movies/deleteMovie/api/deleteMovieApi';
import {
  createMovieApi,
  type CreateMovieData,
} from '@/features/movies/createMovie/api/createMovie';
import {
  editMovieApi,
  type EditMovieData,
} from '@/features/movies/editMovie/api/editMovieApi';
import type { MovieItem, MoviesParams } from '@/entities/movie/model/types';

type Status = 'idle' | 'success' | 'error' | 'loading';

interface MovieState {
  movies: MovieItem[];
  totalAmount: number;
  status: Status;
  errorMessage: string | null;
  deleteStatus: Status;
  createStatus: Status;
  editStatus: Status;
  currentMovie: MovieItem | null;
  currentMovieStatus: Status;
}

export const fetchMovie = createAsyncThunk(
  'movies/fetchMovie',
  async (query: MoviesParams = {}, { rejectWithValue }) => {
    try {
      const response = await movieApi(query);
      return response;
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

export const createMovie = createAsyncThunk(
  'movies/createMovie',
  async (movieData: CreateMovieData, { rejectWithValue }) => {
    try {
      const response = await createMovieApi(movieData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Create movie failed'
      );
    }
  }
);

export const editMovie = createAsyncThunk(
  'movies/editMovie',
  async (
    { movieId, movieData }: { movieId: number; movieData: EditMovieData },
    { rejectWithValue }
  ) => {
    try {
      const response = await editMovieApi(movieId, movieData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Edit movie failed'
      );
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (movieId: number, { rejectWithValue }) => {
    try {
      const response = await fetchMovieByIdApi(movieId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Fetch movie by Id failed'
      );
    }
  }
);

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
  selectors: {
    selectMoviesStatus: (state) => state.status,
    selectMovies: (state) => state.movies,
    selectMoviesError: (state) => state.errorMessage,
    selectDeleteStatus: (state) => state.deleteStatus,
    selectCreateStatus: (state) => state.createStatus,
    selectEditStatus: (state) => state.editStatus,
    selectCurrentMovie: (state) => state.currentMovie,
    selectCurrentMovieStatus: (state) => state.currentMovieStatus,
    selectTotalAmount: (state) => state.totalAmount,
  },
});

export const { clearError, resetCreateStatus, resetEditStatus } =
  movieSlice.actions;
export const {
  selectMoviesError,
  selectMovies,
  selectMoviesStatus,
  selectDeleteStatus,
  selectCreateStatus,
  selectEditStatus,
  selectCurrentMovie,
  selectCurrentMovieStatus,
  selectTotalAmount,
} = movieSlice.selectors;

export default movieSlice.reducer;

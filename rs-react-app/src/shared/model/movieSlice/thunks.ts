import { createAsyncThunk } from '@reduxjs/toolkit';
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
import type { MoviesParams } from '@/entities/movie/model/types';

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

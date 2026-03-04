import type { MovieState } from './types';

type RootState = { movie: MovieState };

export const selectMoviesStatus = (state: RootState) => state.movie.status;
export const selectMovies = (state: RootState) => state.movie.movies;
export const selectMoviesError = (state: RootState) => state.movie.errorMessage;
export const selectDeleteStatus = (state: RootState) =>
  state.movie.deleteStatus;
export const selectCreateStatus = (state: RootState) =>
  state.movie.createStatus;
export const selectEditStatus = (state: RootState) => state.movie.editStatus;
export const selectCurrentMovie = (state: RootState) =>
  state.movie.currentMovie;
export const selectCurrentMovieStatus = (state: RootState) =>
  state.movie.currentMovieStatus;
export const selectTotalAmount = (state: RootState) => state.movie.totalAmount;

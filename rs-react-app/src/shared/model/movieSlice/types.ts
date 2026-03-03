import type { MovieItem } from '@/entities/movie/model/types';

export type Status = 'idle' | 'success' | 'error' | 'loading';

export interface MovieState {
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

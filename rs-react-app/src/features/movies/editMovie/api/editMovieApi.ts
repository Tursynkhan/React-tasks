import type { MovieItem } from '@/entities/movie/model/types';
import { apiClient } from '@/shared/api/client';

interface BaseResponse<T> {
  data: T;
  message: string;
}

export interface EditMovieData {
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  runtime: number;
  overview: string;
  genres: string[];
}

export async function editMovieApi(
  movieId: number,
  movieData: EditMovieData
): Promise<BaseResponse<MovieItem>> {
  return apiClient.put<BaseResponse<MovieItem>>(`/movies/${movieId}`, {
    ...movieData,
    id: movieId,
  });
}

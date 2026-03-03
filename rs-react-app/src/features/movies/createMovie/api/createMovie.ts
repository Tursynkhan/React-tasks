import type { MovieItem } from '@/entities/movie/model/types';
import { apiClient } from '@/shared/api/client';

interface BaseResponse<T> {
  data: T;
  message: string;
}

export interface CreateMovieData {
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  runtime: number;
  overview: string;
  genres: string[];
}

export async function createMovieApi(
  movieData: CreateMovieData
): Promise<BaseResponse<MovieItem>> {
  return apiClient.post<BaseResponse<MovieItem>>('/movies', movieData);
}

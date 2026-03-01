import type { MovieItem } from '@/entities/movie/model/types';

const API_URL = import.meta.env.VITE_API_BASE_URL;

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
  const response = await fetch(`${API_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieData),
  });

  if (!response.ok) {
    throw new Error('Failed to create movie');
  }

  const data = await response.json();
  return data;
}

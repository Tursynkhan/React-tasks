import type { MovieItem, MoviesParams } from '../model/types';

const API_URL = import.meta.env.VITE_API_BASE_URL;

interface BaseResponse<T> {
  data: T;
  message: string;
}
interface MovieResponse<T> {
  data: T;
  filteredCount: number;
  totalAmount?: number;
  offset?: number;
  limit?: number;
}

function buildQuery(params?: MoviesParams) {
  const query = new URLSearchParams();

  if (params?.sortBy) query.set('sortBy', params.sortBy);
  if (params?.sortOrder) query.set('sortOrder', params.sortOrder);

  if (params?.search?.trim()) query.set('search', params.search.trim());
  if (params?.searchBy) query.set('searchBy', params.searchBy);

  if (params?.filter) {
    const value = Array.isArray(params.filter)
      ? params.filter.join(',')
      : params.filter;

    if (value.trim()) query.set('filter', value);
  }

  if (typeof params?.offset === 'number')
    query.set('offset', String(params.offset));
  if (typeof params?.limit === 'number')
    query.set('limit', String(params.limit));

  return query.toString();
}

export async function movieApi(
  params?: MoviesParams
): Promise<MovieResponse<MovieItem[]>> {
  const query = buildQuery(params);
  const url = `${API_URL}/movies${query ? `?${query}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data;
}

export async function fetchMovieByIdApi(
  id: number
): Promise<BaseResponse<MovieItem>> {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('FethMovieById failed');
  }

  const data = await response.json();
  return data;
}

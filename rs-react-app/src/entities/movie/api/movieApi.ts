import type { MovieItem, MoviesParams } from '../model/types';
import { apiClient } from '@/shared/api/client';

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
  const endpoint = `/movies${query ? `?${query}` : ''}`;
  return apiClient.get<MovieResponse<MovieItem[]>>(endpoint);
}

export async function fetchMovieByIdApi(
  id: number
): Promise<BaseResponse<MovieItem>> {
  return apiClient.get<BaseResponse<MovieItem>>(`/movies/${id}`);
}

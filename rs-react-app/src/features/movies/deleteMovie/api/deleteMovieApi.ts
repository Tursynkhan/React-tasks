import { apiClient } from '@/shared/api/client';

export async function deleteMovieApi(
  movieId: number
): Promise<{ message: string }> {
  return apiClient.delete<{ message: string }>(`/movies/${movieId}`);
}

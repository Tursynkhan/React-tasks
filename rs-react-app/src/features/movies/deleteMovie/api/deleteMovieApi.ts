const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function deleteMovieApi(
  movieId: number
): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete movie');
  }

  const data = await response.json();
  return data;
}

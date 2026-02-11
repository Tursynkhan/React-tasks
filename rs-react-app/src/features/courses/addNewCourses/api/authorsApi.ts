const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/authors`;

export async function getAuthors(): Promise<{ id: string; name: string }[]> {
  const response = await fetch(API_BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch authors');
  }

  const data = await response.json();
  return data;
}

export async function createAuthor(
  name: string
): Promise<{ id: string; name: string }> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error('Failed to create author');
  }

  const data = await response.json();
  return data;
}

export async function deleteAuthor(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete author');
  }
}
export const authorsApi = {
  getAuthors,
  createAuthor,
  deleteAuthor,
};

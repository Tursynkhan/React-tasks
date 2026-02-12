const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/courses`;

interface CourseData {
  title: string;
  description: string;
  duration: number;
  creationDate: string;
  authors: { id: string; name: string }[];
}

export async function createCourse(courseData: CourseData) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(courseData),
  });
  if (!response.ok) {
    throw new Error('Failed to create course');
  }
  const data = await response.json();
  return data;
}

export const courseApi = {
  createCourse,
};

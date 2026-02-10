const API_BASE_URL = 'https://698a44f0c04d974bc6a1d22e.mockapi.io/api/courses';

interface CourseData {
  title: string;
  description: string;
  duration: number;
  creationDate: Date;
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

import type { Course } from '../model/types';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/courses`;

export async function getCourses(): Promise<Course[]> {
  const response = await fetch(API_BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  const data = await response.json();
  return data;
}

export async function deleteCourse(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete course');
  }
}

export async function getCourseById(id: string): Promise<Course> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch course');
  }
  const data = await response.json();
  return data;
}

export async function createCourse(
  course: Omit<Course, 'id'>
): Promise<Course> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  });
  if (!response.ok) {
    throw new Error('Failed to create course');
  }
  const data = await response.json();
  return data;
}

export async function updateCourse(
  id: string,
  course: Partial<Course>
): Promise<Course> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  });
  if (!response.ok) {
    throw new Error('Failed to update course');
  }
  const data = await response.json();
  return data;
}

export const courseApi = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};

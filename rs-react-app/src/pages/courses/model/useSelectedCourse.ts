import React from 'react';
import { type Course } from '@/entities/course/model/types';
import { courseApi } from '@/entities/course/api/courseApi';

export function useSelectedCourse() {
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const showCourse = async (courseId: string) => {
    setLoading(true);
    setError(null);
    try {
      const course = await courseApi.getCourseById(courseId);
      setSelectedCourse(course);
    } catch (err) {
      setError('Failed to load course details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearCourse = () => {
    setSelectedCourse(null);
    setError(null);
  };

  return { selectedCourse, showCourse, clearCourse, loading, error };
}

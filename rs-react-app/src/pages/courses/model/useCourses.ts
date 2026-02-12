import React from 'react';
import { getCourses, deleteCourse } from '@/entities/course/api/courseApi';
import { type Course } from '@/entities/course/model/types';

export function useCourses() {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const fetchCourses = React.useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      await getCourses().then((data) => setCourses(data));
    } catch (err) {
      setError('Failed to fetch courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeCourse = React.useCallback(
    async (id: string) => {
      setError('');
      try {
        await deleteCourse(id);
        await fetchCourses();
      } catch (err) {
        console.error(err);
        throw new Error('Failed to delete course');
      }
    },
    [fetchCourses]
  );

  React.useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, loading, error, removeCourse, fetchCourses };
}

import React from 'react';
import { type Course } from '@/entities/course/model/types';

export function useSelectedCourse() {
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(
    null
  );
  const showCourse = (course: Course) => setSelectedCourse(course);
  const clearCourse = () => setSelectedCourse(null);

  return { selectedCourse, showCourse, clearCourse };
}

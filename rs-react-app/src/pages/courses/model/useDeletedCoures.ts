import React from 'react';
const LOCAL_STORAGE_KEY = 'deletedCourseIds';

export function useDeletedCourses() {
  const [deletedCourseIds, setDeletedCourseIds] = React.useState<string[]>(
    () => {
      const savedIds = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedIds ? JSON.parse(savedIds) : [];
    }
  );
  const deleteCourse = (courseId: string) => {
    const updatedDeletedIds = [...deletedCourseIds, courseId];
    setDeletedCourseIds(updatedDeletedIds);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedDeletedIds));
  };
  const restoreCourses = () => {
    setDeletedCourseIds([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };
  return { deletedCourseIds, deleteCourse, restoreCourses };
}

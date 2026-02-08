import React from 'react';
import { type Course } from '@/entities/course/model/types';

export function useSeachCourses(courses: Course[]) {
  const [searchInput, setSearchInput] = React.useState('');
  const [resultQuery, setResultQuery] = React.useState('');

  const filteredCourses = React.useMemo(() => {
    const query = resultQuery.trim().toLowerCase();

    if (query === '') {
      return courses;
    }
    return courses.filter((course) => {
      const title = course.title.toLowerCase();
      const description = course.description.toLowerCase();
      return title.includes(query) || description.includes(query);
    });
  }, [courses, resultQuery]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const onSearchClick = () => {
    setResultQuery(searchInput);
  };
  const onResetSearch = () => {
    setSearchInput('');
    setResultQuery('');
  };

  return {
    searchInput,
    filteredCourses,
    onInputChange,
    onSearchClick,
    onResetSearch,
  };
}

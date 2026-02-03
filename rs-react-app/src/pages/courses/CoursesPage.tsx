import React from 'react';
import Courses from '@/widgets/Courses/Courses';
import SearchBar from '@/widgets/SearchBar/SearchBar';
import CoursesInfo from '@/widgets/CoursesInfo/CoursesInfo';
import EmptyCoursesList from '@/widgets/EmptyCoursesList/EmptyCoursesList';
import { type Course } from '@/entities/course/model/types';
import { mockedCoursesList } from '@/entities/course/model/mockCoursesList';
import { Box } from '@mui/material';

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(
    null
  );

  const [searchInput, setSearchInput] = React.useState('');

  const [deletedCourseIds, setDeletedCourseIds] = React.useState<string[]>(
    () => {
      const savedIds = localStorage.getItem('deletedCourseIds');
      return savedIds ? JSON.parse(savedIds) : [];
    }
  );

  const courses = mockedCoursesList.filter((course) =>
    deletedCourseIds.includes(course.id) ? false : true
  );

  const [filteredCourses, setFilteredCourses] =
    React.useState<Course[]>(courses);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchInput.trim() === '') {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) => {
          return (
            course.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            course.description.toLowerCase().includes(searchInput.toLowerCase())
          );
        })
      );
    }
  };

  const handleShowCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setSearchInput('');
    setFilteredCourses(courses);
  };

  const handleDeleteCourse = (courseId: string) => {
    const updatedDeletedIds = [...deletedCourseIds, courseId];
    setDeletedCourseIds(updatedDeletedIds);
    localStorage.setItem('deletedCourseIds', JSON.stringify(updatedDeletedIds));
  };

  const handleRestoreCourses = () => {
    setDeletedCourseIds([]);
    localStorage.removeItem('deletedCourseIds');
    setSearchInput('');
    setFilteredCourses(mockedCoursesList);
  };

  React.useEffect(() => {
    setFilteredCourses(courses);
  }, [deletedCourseIds]);

  return (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      padding={2}
    >
      {selectedCourse ? (
        <CoursesInfo course={selectedCourse} onBack={handleBackToCourses} />
      ) : (
        <Box
          component="div"
          display="flex"
          flexDirection="column"
          gap={2}
          mt={3}
        >
          {filteredCourses.length === 0 ? (
            <EmptyCoursesList onAddCourse={handleRestoreCourses} />
          ) : (
            <>
              <SearchBar
                onChange={handleInputChange}
                onClick={handleSearchClick}
                query={searchInput}
              />
              <Courses
                courses={filteredCourses}
                onShowCourse={handleShowCourse}
                onDeleteCourse={handleDeleteCourse}
              />
            </>
          )}
        </Box>
      )}
    </Box>
  );
}

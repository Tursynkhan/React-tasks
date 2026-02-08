import React from 'react';
import Courses from '@/widgets/Courses/Courses';
import SearchBar from '@/widgets/SearchBar/SearchBar';
import CoursesInfo from '@/widgets/CoursesInfo/CoursesInfo';
import EmptyCoursesList from '@/widgets/EmptyCoursesList/EmptyCoursesList';
import { mockedCoursesList } from '@/entities/course/model/mockCoursesList';
import { Box } from '@mui/material';
import { useSelectedCourse, useDeletedCourses, useSeachCourses } from './model';

export default function CoursesPage() {
  const { selectedCourse, showCourse, clearCourse } = useSelectedCourse();

  const { deletedCourseIds, deleteCourse, restoreCourses } =
    useDeletedCourses();

  const courses = React.useMemo(
    () =>
      mockedCoursesList.filter(
        (course) => !deletedCourseIds.includes(course.id)
      ),
    [deletedCourseIds]
  );

  const {
    searchInput,
    filteredCourses,
    onInputChange,
    onSearchClick,
    onResetSearch,
  } = useSeachCourses(courses);

  const handleBackToCourses = () => {
    clearCourse();
    onResetSearch();
  };

  const handleRestoreCourses = () => {
    restoreCourses();
    onResetSearch();
  };

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
          width="100%"
        >
          {courses.length === 0 ? (
            <EmptyCoursesList onAddCourse={handleRestoreCourses} />
          ) : (
            <>
              <SearchBar
                onChange={onInputChange}
                onClick={onSearchClick}
                query={searchInput}
              />
              {filteredCourses.length > 0 && (
                <Courses
                  courses={filteredCourses}
                  onShowCourse={showCourse}
                  onDeleteCourse={deleteCourse}
                />
              )}
            </>
          )}
        </Box>
      )}
    </Box>
  );
}

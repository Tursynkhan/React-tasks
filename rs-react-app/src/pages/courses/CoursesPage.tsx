import Courses from '@/widgets/Courses/Courses';
import SearchBar from '@/widgets/SearchBar/SearchBar';
import CoursesInfo from '@/widgets/CoursesInfo/CoursesInfo';
import EmptyCoursesList from '@/widgets/EmptyCoursesList/EmptyCoursesList';
import Loading from '@/shared/ui/Loading/Loading';
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage';
import { Box, Typography } from '@mui/material';
import { useCourses, useSeachCourses, useSelectedCourse } from './model';

export default function CoursesPage() {
  const { selectedCourse, showCourse, clearCourse } = useSelectedCourse();
  const { courses, removeCourse, error, loading, fetchCourses } = useCourses();

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

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await removeCourse(courseId);
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      await fetchCourses();
    } catch (error) {
      console.error('Failed to refresh courses:', error);
    }
  };

  return (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={{ xs: 1, sm: 2 }}
      padding={{ xs: 0, sm: 1, md: 2 }}
    >
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : selectedCourse ? (
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
            <EmptyCoursesList onAddCourse={handleUpdateCourse} />
          ) : (
            <>
              <SearchBar
                onChange={onInputChange}
                onClick={onSearchClick}
                query={searchInput}
                onAddCourse={handleUpdateCourse}
              />
              {filteredCourses.length > 0 ? (
                <Courses
                  courses={filteredCourses}
                  onShowCourse={showCourse}
                  onDeleteCourse={handleDeleteCourse}
                  onUpdateCourse={handleUpdateCourse}
                />
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight="200px"
                >
                  <Typography variant="h6" color="text.secondary">
                    Course not found
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      )}
    </Box>
  );
}

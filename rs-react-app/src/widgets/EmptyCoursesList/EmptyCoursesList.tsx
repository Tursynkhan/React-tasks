import { AddNewCourses } from '@/features/courses';
import { Box, Typography } from '@mui/material';

type EmptyCoursesListProps = {
  onAddCourse?: () => void;
};

export default function EmptyCoursesList({
  onAddCourse,
}: EmptyCoursesListProps) {
  return (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={{ xs: 1.5, sm: 2 }}
      minHeight={{ xs: '40vh', sm: '50vh' }}
      px={{ xs: 2, sm: 0 }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
      >
        Your List Is Empty
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: '0.875rem', sm: '1rem' },
          textAlign: 'center',
        }}
      >
        Please use ’Add New Course’ button to add your first course
      </Typography>
      <AddNewCourses onSuccess={onAddCourse} />
    </Box>
  );
}

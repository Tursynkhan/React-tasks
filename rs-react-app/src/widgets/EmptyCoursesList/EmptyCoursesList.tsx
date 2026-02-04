import { Box, Typography, Button } from '@mui/material';

interface EmptyCoursesListProps {
  onAddCourse: () => void;
}

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
      gap={2}
      minHeight="50vh"
    >
      <Typography variant="h6" gutterBottom>
        Your List Is Empty
      </Typography>
      <Typography variant="body1">
        Please use ’Add New Course’ button to add your first course
      </Typography>
      <Button variant="contained" color="primary" onClick={onAddCourse}>
        Add New Course
      </Button>
    </Box>
  );
}

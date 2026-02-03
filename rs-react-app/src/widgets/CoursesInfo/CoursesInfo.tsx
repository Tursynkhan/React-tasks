import { type Course } from '@/entities/course';
import { Button, Box, Typography } from '@mui/material';
import { CourseInfoCard } from '@/entities/course';

interface CoursesInfoProps {
  course: Course;
  onBack: () => void;
}

export default function CoursesInfo({ course, onBack }: CoursesInfoProps) {
  return (
    <Box
      component={'div'}
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      mt={4}
    >
      <Typography variant="h4" component="h2">
        {course.title}
      </Typography>
      <CourseInfoCard course={course} />
      <Button variant="contained" onClick={onBack}>
        Back
      </Button>
    </Box>
  );
}

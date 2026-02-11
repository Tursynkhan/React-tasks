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
      gap={{ xs: 2, sm: 2, md: 3 }}
      mt={{ xs: 2, sm: 3, md: 4 }}
      width="100%"
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}
      >
        {course.title}
      </Typography>
      <CourseInfoCard course={course} />
      <Button
        variant="contained"
        onClick={onBack}
        sx={{ maxWidth: { xs: '100%', sm: 200 } }}
      >
        Back
      </Button>
    </Box>
  );
}

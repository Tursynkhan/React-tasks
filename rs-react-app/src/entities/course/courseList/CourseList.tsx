import { type Course } from '../model/types';
import CourseCard from '../courseCard/CourseCard';
import { Box } from '@mui/material';

interface CourseListProps {
  courses: Course[];
  onShowCourse: (course: Course) => void;
  onDeleteCourse: (courseId: string) => void;
}

export default function CourseList({
  courses,
  onShowCourse,
  onDeleteCourse,
}: CourseListProps) {
  return (
    <Box
      component={'div'}
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      mt={2}
    >
      {courses.map((course: Course) => (
        <CourseCard
          key={course.id}
          course={course}
          onShowCourse={onShowCourse}
          onDeleteCourse={onDeleteCourse}
        />
      ))}
    </Box>
  );
}

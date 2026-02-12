import { type Course } from '../model/types';
import { DeleteCourses, EditCourses, ShowCourses } from '@/features/courses';
import InfoField from '@/shared/ui/InfoField/InfoField';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import {
  formatDuration,
  formatCreationDate,
  formatAuthors,
} from '@/shared/utils/helpers';

interface CourseCardProps {
  course: Course;
  onShowCourse: (courseId: string) => void;
  onDeleteCourse: (courseId: string) => void;
  onUpdateCourse?: () => void;
}

export default function CourseCard({
  course,
  onShowCourse,
  onDeleteCourse,
  onUpdateCourse,
}: CourseCardProps) {
  return (
    <Card
      sx={{
        border: '1px solid #ccc',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', md: '2fr 1fr' }}
          gap={{ xs: 3, md: 5 }}
        >
          <Stack spacing={1.25}>
            <Typography variant="h5" component="h2">
              {course.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {course.description}
            </Typography>
          </Stack>

          <Stack spacing={3.75} sx={{ minWidth: 0 }}>
            <CardContent sx={{ padding: 0 }}>
              <InfoField label="Authors:">
                {formatAuthors(course.authors)}
              </InfoField>
              <InfoField label="Duration:">
                {formatDuration(course.duration)}
              </InfoField>
              <InfoField label="Creation Date:">
                {formatCreationDate(course.creationDate)}
              </InfoField>
            </CardContent>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              <ShowCourses onClick={() => onShowCourse(course.id)} />
              <EditCourses course={course} onSuccess={onUpdateCourse} />
              <DeleteCourses onClick={() => onDeleteCourse(course.id)} />
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

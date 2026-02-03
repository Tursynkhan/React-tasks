import { type Course } from '../model/types';
import { DeleteCourses, EditCourses, ShowCourses } from '@/features/courses';
import InfoField from '@/shared/ui/InfoField/InfoField';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import { getAuthorNames } from '../model/helpers';
import { formatDuration, formatCreationDate } from '@/shared/utils/helpers';

interface CourseCardProps {
  course: Course;
  onShowCourse: (course: Course) => void;
  onDeleteCourse: (courseId: string) => void;
}

export default function CourseCard({
  course,
  onShowCourse,
  onDeleteCourse,
}: CourseCardProps) {
  const authorNames = getAuthorNames(course.authors).join(', ');

  return (
    <Card sx={{ border: '1px solid #ccc' }}>
      <CardContent>
        <Box display="grid" gridTemplateColumns="2fr 1fr" gap={5}>
          <Stack spacing={1.25}>
            <Typography variant="h5" component="h2">
              {course.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {course.description}
            </Typography>
          </Stack>

          <Stack spacing={3.75}>
            <CardContent sx={{ padding: 0 }}>
              <InfoField
                label="Authors:"
                className={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {authorNames}
              </InfoField>
              <InfoField label="Duration:">
                {formatDuration(course.duration)}
              </InfoField>
              <InfoField label="Creation Date:">
                {formatCreationDate(course.creationDate)}
              </InfoField>
            </CardContent>

            <Stack direction="row" spacing={1}>
              <ShowCourses onClick={() => onShowCourse(course)} />
              <EditCourses />
              <DeleteCourses onClick={() => onDeleteCourse(course.id)} />
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

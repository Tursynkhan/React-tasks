import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { type Course } from '@/entities/course';
import InfoField from '@/shared/ui/InfoField/InfoField';
import { getAuthorNames } from '../model/helpers';
import { formatDuration, formatCreationDate } from '@/shared/utils/helpers';

interface CourseInfoProps {
  course: Course;
}

export default function CourseInfoCard({ course }: CourseInfoProps) {
  const authorNames = getAuthorNames(course.authors).join(', ');
  return (
    <Card>
      <CardContent>
        <Box
          component="div"
          display="grid"
          gridTemplateColumns="1fr 1fr"
          alignItems="center"
          gap={4}
        >
          <Box sx={{ borderRight: '1px solid #ccc' }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {course.description}
            </Typography>
          </Box>

          <Stack spacing={1.25}>
            <InfoField label="ID:">{course.id}</InfoField>
            <InfoField label="Duration:">
              {formatDuration(course.duration)}
            </InfoField>
            <InfoField label="Created:">
              {formatCreationDate(course.creationDate)}
            </InfoField>
            <InfoField label="Authors:">{authorNames}</InfoField>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

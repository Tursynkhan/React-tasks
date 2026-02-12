import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { type Course } from '@/entities/course';
import InfoField from '@/shared/ui/InfoField/InfoField';
import {
  formatDuration,
  formatCreationDate,
  formatAuthors,
} from '@/shared/utils/helpers';

interface CourseInfoProps {
  course: Course;
}

export default function CourseInfoCard({ course }: CourseInfoProps) {
  return (
    <Card>
      <CardContent>
        <Box
          component="div"
          display="grid"
          gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
          alignItems="start"
          gap={{ xs: 3, sm: 3, md: 4 }}
        >
          <Box
            sx={{
              borderRight: { xs: 'none', md: '1px solid #ccc' },
              borderBottom: { xs: '1px solid #ccc', md: 'none' },
              paddingBottom: { xs: 2, md: 0 },
              paddingRight: { xs: 0, md: 2 },
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
            >
              Description
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              {course.description}
            </Typography>
          </Box>

          <Stack spacing={1.25} sx={{ minWidth: 0 }}>
            <InfoField label="ID:">{course.id}</InfoField>
            <InfoField label="Duration:">
              {formatDuration(course.duration)}
            </InfoField>
            <InfoField label="Created:">
              {formatCreationDate(course.creationDate)}
            </InfoField>
            <InfoField label="Authors:">
              {formatAuthors(course.authors)}
            </InfoField>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

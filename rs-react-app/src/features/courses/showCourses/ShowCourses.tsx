import { Button } from '@mui/material';

interface ShowCoursesProps {
  onClick: () => void;
}
export default function ShowCourses({ onClick }: ShowCoursesProps) {
  return (
    <Button variant="contained" onClick={onClick}>
      Show Courses
    </Button>
  );
}

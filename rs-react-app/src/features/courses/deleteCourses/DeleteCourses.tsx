import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteCoursesProps {
  onClick?: () => void;
}

export default function DeleteCourses({ onClick }: DeleteCoursesProps) {
  return (
    <Button variant="contained" onClick={onClick}>
      <DeleteIcon />
    </Button>
  );
}

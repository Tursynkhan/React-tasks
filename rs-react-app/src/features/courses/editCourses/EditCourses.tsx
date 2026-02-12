import React from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import CreateCourseModal from '../addNewCourses/ui/CreateCourseModal';
import { type Course } from '@/entities/course/model/types';

type EditCoursesProps = {
  course: Course;
  onSuccess?: () => void;
};

export default function EditCourses({ course, onSuccess }: EditCoursesProps) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        <EditIcon />
      </Button>
      <CreateCourseModal
        open={open}
        onClose={handleClose}
        course={course}
        onSuccess={onSuccess}
      />
    </>
  );
}

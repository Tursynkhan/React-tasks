import React from 'react';
import Button from '@mui/material/Button';
import CreateCourseModal from './ui/CreateCourseModal';

type AddNewCoursesProps = {
  onSuccess?: () => void;
};

export default function AddNewCourses({ onSuccess }: AddNewCoursesProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add New Course
      </Button>
      <CreateCourseModal
        open={open}
        onClose={handleClose}
        onSuccess={onSuccess}
      />
    </>
  );
}

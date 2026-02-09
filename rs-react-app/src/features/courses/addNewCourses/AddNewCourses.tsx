import React from 'react';
import Button from '@mui/material/Button';
import CreateCourseModal from './ui/CreateCourseModal';

export default function AddNewCourses() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add New Course
      </Button>
      <CreateCourseModal open={open} onClose={handleClose} />
    </>
  );
}

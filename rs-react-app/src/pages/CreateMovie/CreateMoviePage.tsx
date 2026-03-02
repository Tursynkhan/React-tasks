import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/shared/ui/Button/Button';
import Dialog from '@/shared/ui/Dialog/Dialog';
import MovieForm, {
  type MovieFormHandle,
} from '@/features/movieForm/ui/MovieForm';

export default function CreateMoviePage() {
  const navigate = useNavigate();
  const formRef = React.useRef<MovieFormHandle>(null);

  const handleReset = () => {
    formRef.current?.resetForm();
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <Dialog
      open
      title="Create Movie"
      maxWidth="sm"
      fullWidth
      onClose={handleClose}
      actions={
        <>
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="contained" type="submit" form="add-movie-form">
            Submit
          </Button>
        </>
      }
    >
      <MovieForm ref={formRef} />
    </Dialog>
  );
}

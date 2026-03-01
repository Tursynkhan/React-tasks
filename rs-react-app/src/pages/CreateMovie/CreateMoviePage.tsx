import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Dialog from '@/shared/ui/Dialog/Dialog';
import MovieForm, {
  type MovieFormHandle,
} from '@/features/movieForm/ui/MovieForm';
import { COLORS } from '@/shared/config/theme/palette';

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
          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{
              borderColor: COLORS.accent,
              color: COLORS.accent,
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            disableElevation
            type="submit"
            form="add-movie-form"
            sx={{
              bgcolor: COLORS.accent,
              color: COLORS.white,
              textTransform: 'uppercase',
            }}
          >
            Submit
          </Button>
        </>
      }
    >
      <MovieForm ref={formRef} />
    </Dialog>
  );
}

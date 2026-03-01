import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import Dialog from '@/shared/ui/Dialog/Dialog';
import MovieForm, {
  type MovieFormHandle,
} from '@/features/movieForm/ui/MovieForm';
import { COLORS } from '@/shared/config/theme/palette';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import {
  fetchMovieById,
  selectCurrentMovie,
  selectCurrentMovieStatus,
} from '@/shared/model/movieSlice/movieSlice';

export default function EditMoviePage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formRef = React.useRef<MovieFormHandle>(null);

  const currentMovie = useAppSelector(selectCurrentMovie);
  const status = useAppSelector(selectCurrentMovieStatus);

  React.useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieById(Number(movieId)));
    }
  }, [movieId, dispatch]);

  React.useEffect(() => {
    if (status === 'error') {
      toast.error('Failed to load movie data');
    }
  }, [status]);

  const handleReset = () => {
    formRef.current?.resetForm();
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <Dialog
      open
      title="Edit Movie"
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
            Save
          </Button>
        </>
      }
    >
      <MovieForm
        ref={formRef}
        mode="edit"
        movieId={Number(movieId)}
        initialValues={{
          title: currentMovie?.title,
          release_date: currentMovie?.release_date,
          poster_path: currentMovie?.poster_path,
          vote_average: currentMovie?.vote_average,
          runtime: currentMovie?.runtime,
          overview: currentMovie?.overview,
          genres: currentMovie?.genres,
        }}
      />
    </Dialog>
  );
}

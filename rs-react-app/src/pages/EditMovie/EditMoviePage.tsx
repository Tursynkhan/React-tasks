import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Dialog } from '@/shared/ui';
import { toast } from 'react-toastify';
import { MovieForm, type MovieFormHandle } from '@/features/movieForm';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  selectCurrentMovie,
  selectCurrentMovieStatus,
  fetchMovieById,
} from '@/shared/model/movieSlice';

export default function EditMoviePage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formRef = React.useRef<MovieFormHandle>(null);

  const currentMovie = useAppSelector(selectCurrentMovie);
  const status = useAppSelector(selectCurrentMovieStatus);

  React.useEffect(() => {
    if (!movieId || isNaN(Number(movieId))) {
      toast.error('Invalid movie ID');
      navigate('/');
      return;
    }
    dispatch(fetchMovieById(Number(movieId)));
  }, [movieId, dispatch, navigate]);

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
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="contained" type="submit" form="add-movie-form">
            Save
          </Button>
        </>
      }
    >
      {movieId && !isNaN(Number(movieId)) && (
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
      )}
    </Dialog>
  );
}

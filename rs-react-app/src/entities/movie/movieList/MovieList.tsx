import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import MoviesCount from './ui/MovieCount';
import MovieCard from '../movieCard/MovieCard';
import {
  fetchMovie,
  selectMoviesError,
  selectMoviesStatus,
} from '@/shared/model/movieSlice/movieSlice';
import { COLORS } from '@/shared/config/theme/palette';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function MovieList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const filter = searchParams.get('filter') ?? '';
  const dispatch = useAppDispatch();

  const movies = useAppSelector((state) => {
    const movieState = state.movie;
    let filtered = movieState.movies;

    if (search.trim()) {
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(search.toLowerCase()) ||
          movie.overview.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter && filter !== 'ALL') {
      filtered = filtered.filter((movie) =>
        movie.genres.some(
          (genre) => genre.toLowerCase() === filter.toLowerCase()
        )
      );
    }

    return filtered;
  });

  const status = useAppSelector(selectMoviesStatus);
  const error = useAppSelector(selectMoviesError);

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovie({}));
    }
  }, [status, dispatch]);

  React.useEffect(() => {
    if (status === 'error' && error) {
      toast.error(error);
    }
  }, [status, error]);

  const handleOpenCard = (id: number) => {
    console.log('movieId', id);
    navigate(`/${id}`);
  };

  if (status === 'loading') {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          bgcolor: COLORS.bg,
        }}
      >
        <CircularProgress sx={{ color: COLORS.accent }} />
      </Box>
    );
  }

  return (
    <Box sx={{ px: 7.5, bgcolor: COLORS.bg }}>
      <MoviesCount count={movies.length} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, minmax(0, 1fr))',
            sm: 'repeat(3, minmax(0, 1fr))',
            md: 'repeat(4, minmax(0, 1fr))',
          },
          gap: 2.5,
        }}
      >
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            onClick={() => {
              handleOpenCard(m.id);
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

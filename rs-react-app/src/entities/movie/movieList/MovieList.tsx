import React from 'react';
import { Box } from '@mui/material';
// import { COLORS } from '@/shared/config/theme/palette';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import MoviesCount from './ui/MovieCount';
import MovieCard from '../movieCard/MovieCard';
import {
  fetchMovie,
  selectMovies,
  // selectMoviesError,
  selectMoviesStatus,
} from '@/shared/model/movieSlice/movieSlice';
import { COLORS } from '@/shared/config/theme/palette';
// import { useSearchParams } from 'react-router-dom';

export default function MovieList() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMovies);
  const status = useAppSelector(selectMoviesStatus);
  // const error = useAppSelector(selectMoviesError);

  // const [searchParams] = useSearchParams();

  React.useEffect(() => {
    if (status === 'idle') dispatch(fetchMovie({}));
  }, [status]);

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
          <MovieCard key={m.id} movie={m} />
        ))}
      </Box>
    </Box>
  );
}

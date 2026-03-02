import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { Box, Typography } from '@mui/material';
import Button from '@/shared/ui/Button/Button';
import DeleteMovie from '@/features/movies/deleteMovie/DeleteMovie';
import { COLORS } from '@/shared/config/theme/palette';
import {
  selectCurrentMovie,
  fetchMovieById,
} from '@/shared/model/movieSlice/movieSlice';
import { selectRole } from '@/shared/model/authSlice/authSlice';
import { formatDuration } from '@/shared/lib/formatDuration';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const id = Number(movieId);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const movie = useAppSelector(selectCurrentMovie);
  const role = useAppSelector(selectRole);

  React.useEffect(() => {
    if (Number.isFinite(id)) {
      dispatch(fetchMovieById(id));
    }
  }, [id]);

  const year = movie?.release_date ? movie.release_date.slice(0, 4) : '';

  const duration = formatDuration(movie?.runtime);

  return (
    <Box sx={{ bgcolor: COLORS.bg, px: { xs: 2, sm: 6 }, pt: 10, pb: 6 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 3,
        }}
      >
        <Button variant="admin" onClick={() => navigate('/')}>
          Go Back
        </Button>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '360px 1fr' },
          gap: { xs: 3, md: 5 },
          alignItems: 'start',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 360,
            aspectRatio: '2 / 3',
            backgroundImage: movie?.poster_path
              ? `url(${movie.poster_path})`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Typography
              sx={{
                color: COLORS.white,
                fontSize: { xs: 28, md: 34 },
                textTransform: 'uppercase',
                fontWeight: 300,
              }}
            >
              {movie?.title}
            </Typography>

            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                border: '1px solid white',
                display: 'grid',
                placeItems: 'center',
                color: COLORS.white,
                fontSize: 14,
              }}
            >
              {movie?.vote_average.toFixed(1)}
            </Box>
          </Box>

          <Typography sx={{ color: COLORS.white, mb: 2 }}>
            {(movie?.genres ?? []).join(' & ')}
          </Typography>

          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', mb: 2 }}>
            <Typography sx={{ color: COLORS.accent, fontSize: 16 }}>
              {year}
            </Typography>
            <Typography sx={{ color: COLORS.accent, fontSize: 16 }}>
              {duration}
            </Typography>
          </Box>

          <Typography
            sx={{
              color: COLORS.white,
              maxWidth: 760,
            }}
          >
            {movie?.overview}
          </Typography>

          {role === 'admin' && (
            <Box sx={{ display: 'flex', gap: 2, mt: 5 }}>
              <DeleteMovie movieId={id} />
              <Button
                onClick={() => navigate(`/${movie?.id}/edit-movie`)}
                variant="admin"
              >
                Edit
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

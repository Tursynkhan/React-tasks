import React from 'react';
import { Box, Typography } from '@mui/material';
import { COLORS } from '@/shared/config/theme/palette';
import type { MovieItem } from '../model/types';

interface MovieCardProps {
  movie: MovieItem;
}
export default function MovieCard({ movie }: MovieCardProps) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '';
  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          aspectRatio: '2 / 3',
          backgroundImage: movie.poster_path
            ? `url(${movie.poster_path})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box sx={{ p: 1.5 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography sx={{ color: COLORS.white, fontSize: 18 }} noWrap>
            {movie.title}
          </Typography>

          {!!year && (
            <Box
              sx={{
                fontSize: 14,
                color: COLORS.white,
              }}
            >
              {year}
            </Box>
          )}
        </Box>

        <Typography sx={{ fontSize: 14, fontWeight: 500, color: COLORS.white }}>
          {(movie.genres ?? []).join(', ')}
        </Typography>
      </Box>
    </Box>
  );
}

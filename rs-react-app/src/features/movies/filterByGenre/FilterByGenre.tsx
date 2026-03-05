import React from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import GenreTabs from './ui/GenreTabs';
import { COLORS } from '@/shared/config';
import { useAppSelector } from '@/app/store/hooks';
import { selectMovies } from '@/shared/model/movieSlice';

export default function FilterByGenre() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeGenre = searchParams.get('filter') || 'ALL';
  const search = searchParams.get('search') || '';

  const movies = useAppSelector(selectMovies);

  const availableGenres = React.useMemo(() => {
    let filtered = movies;

    if (search.trim()) {
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(search.toLowerCase()) ||
          movie.overview.toLowerCase().includes(search.toLowerCase())
      );
    }

    const genres = new Set<string>();
    filtered.forEach((movie) => {
      movie.genres.forEach((genre) => {
        genres.add(genre.toUpperCase());
      });
    });

    return Array.from(genres).sort();
  }, [movies, search]);

  const handleGenreClick = (genre: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (genre === 'ALL') {
      newSearchParams.delete('filter');
    } else {
      newSearchParams.set('filter', genre);
    }
    setSearchParams(newSearchParams);
  };

  const allGenres = React.useMemo(
    () => ['ALL', ...availableGenres],
    [availableGenres]
  );

  return (
    <Box
      sx={{
        maxWidth: '1440px',
        display: 'flex',
        gap: 3,
        alignItems: 'center',
        bgcolor: COLORS.bg,
        px: { xs: 4, sm: 8, md: 7.5 },
        py: 2,
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: 2,
        },
        '&::-webkit-scrollbar-track': {
          bgcolor: COLORS.accent,
        },
        '&::-webkit-scrollbar-thumb': {
          bgcolor: COLORS.muted,
          borderRadius: '4px',
          '&:hover': {
            bgcolor: COLORS.accent,
          },
        },
      }}
    >
      {allGenres.map((genre) => (
        <GenreTabs
          key={genre}
          genre={genre}
          isActive={genre === activeGenre}
          onClick={() => handleGenreClick(genre)}
        />
      ))}
    </Box>
  );
}

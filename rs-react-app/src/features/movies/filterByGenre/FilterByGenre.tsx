import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import GenreTabs from './ui/GenreTabs';
import { COLORS } from '@/shared/config/theme/palette';

const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'] as const;

export default function FilterByGenre() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeGenre = searchParams.get('genres') || 'ALL';

  const handleGenreClick = (genre: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (genre === 'ALL') {
      newSearchParams.delete('genres');
    } else {
      newSearchParams.set('genres', genre);
    }
    setSearchParams(newSearchParams);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        alignItems: 'center',
        bgcolor: COLORS.bg,
        px: 7.5,
        py: 2,
      }}
    >
      {genres.map((genre) => (
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

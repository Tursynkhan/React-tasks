import { Box } from '@mui/material';
import { Hero, MoviesToolbar } from '@/widgets';
import MovieList from '@/entities/movie/movieList/MovieList';

export default function HomePage() {
  return (
    <Box>
      <Hero />
      <Box sx={{ maxWidth: '1440px', margin: '0 auto' }}>
        <MoviesToolbar />
        <MovieList />
      </Box>
    </Box>
  );
}

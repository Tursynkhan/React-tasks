import { Box } from '@mui/material';
import Hero from '@/widgets/Hero/Hero';
import MovieList from '@/entities/movie/movieList/MovieList';
import MoviesToolbar from '@/widgets/MoviesToolbar/MoviesToolbar';

export default function HomePage() {
  return (
    <Box>
      <Hero />
      <MoviesToolbar />
      <MovieList />
    </Box>
  );
}

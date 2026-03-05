import { Typography } from '@mui/material';

export default function MoviesCount({ count }: { count: number }) {
  const movieText = count === 1 ? 'movie found' : 'movies found';
  return (
    <Typography sx={{ color: '#fff', fontSize: 14, py: 3 }}>
      {count} {movieText}
    </Typography>
  );
}

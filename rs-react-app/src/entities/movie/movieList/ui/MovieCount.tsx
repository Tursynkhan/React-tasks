import { Typography } from '@mui/material';

export default function MoviesCount({ count }: { count: number }) {
  return (
    <Typography sx={{ color: '#fff', fontSize: 14, py: 3 }}>
      {count} movies found
    </Typography>
  );
}

import { Box, CircularProgress } from '@mui/material';

interface LoadingProps {
  minHeight?: number | string;
}

export default function Loading({ minHeight = 500 }: LoadingProps) {
  return (
    <Box display="grid" sx={{ placeItems: 'center', minHeight }}>
      <CircularProgress />
    </Box>
  );
}

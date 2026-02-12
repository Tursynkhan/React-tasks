import { Box, Typography } from '@mui/material';

interface ErrorMessageProps {
  message: string;
  minHeight?: number | string;
}

export default function ErrorMessage({
  message,
  minHeight = 500,
}: ErrorMessageProps) {
  return (
    <Box display="grid" sx={{ placeItems: 'center', minHeight }}>
      <Typography color="error" variant="h6">
        {message}
      </Typography>
    </Box>
  );
}

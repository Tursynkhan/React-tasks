import { Box, Typography } from '@mui/material';
import { COLORS } from '@/shared/config/theme/palette';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        bgcolor: COLORS.field,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          color: COLORS.accent,
          fontSize: '20px',
          fontWeight: 500,
          userSelect: 'none',
        }}
      >
        netflixroulette
      </Typography>
    </Box>
  );
}

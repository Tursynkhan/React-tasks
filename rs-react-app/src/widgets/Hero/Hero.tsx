import { Box, Typography } from '@mui/material';
import SearchMovie from '@/features/movies/searchMovie/SearchMovie';
import { COLORS } from '@/shared/config/theme/palette';

export default function Hero() {
  return (
    <Box
      sx={{
        p: '100px 120px 150px 150px',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url('/public/hero_bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      <Typography
        sx={{
          color: COLORS.white,
          fontSize: { xs: 40, sm: 32 },
          letterSpacing: 2,
          textTransform: 'uppercase',
          fontWeight: 300,
          mb: 3,
        }}
      >
        FIND YOUR MOViE
      </Typography>
      <SearchMovie />
    </Box>
  );
}

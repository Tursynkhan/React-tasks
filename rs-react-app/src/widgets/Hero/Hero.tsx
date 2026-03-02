import { Box, Typography } from '@mui/material';
import SearchMovie from '@/features/movies/searchMovie/SearchMovie';
import { COLORS } from '@/shared/config/theme/palette';

export default function Hero() {
  return (
    <Box
      sx={{
        backgroundImage: `url('/public/hero_bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: '1440px',
          margin: '0 auto',
          p: {
            xs: '80px 20px',
            sm: '100px 60px',
            md: '100px 120px 150px 150px',
          },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            color: COLORS.white,
            fontSize: { xs: 32, sm: 40 },
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
    </Box>
  );
}

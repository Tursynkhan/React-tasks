import { Box } from '@mui/material';
import { COLORS } from '@/shared/config';
import { Header } from '../Header';
import { Footer } from '../Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: COLORS.bg,
      }}
    >
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

import { Box } from '@mui/material';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        margin: '0 auto',
        maxWidth: '1440px',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Header />
      {children}
      <Footer />
    </Box>
  );
}

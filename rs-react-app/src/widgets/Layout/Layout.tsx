import { Box } from '@mui/material';
import Header from '../Header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        margin: '0 auto',
        padding: {
          xs: '10px 16px 20px 16px',
          sm: '15px 24px 30px 24px',
          md: '20px 40px 40px 40px',
        },
        maxWidth: '1440px',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Header />
      {children}
    </Box>
  );
}

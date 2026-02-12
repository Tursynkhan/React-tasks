import LoginForm from '@/features/auth/login/ui/LoginForm';
import { Box, Typography } from '@mui/material';

interface LoginPageProps {
  onLogin(token: string, username: string): void;
}
export default function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <Box
      component="div"
      sx={{
        maxWidth: { xs: '100%', sm: 400, md: 500 },
        margin: '0 auto',
        padding: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}
      >
        Login
      </Typography>
      <LoginForm onLogin={onLogin} />
    </Box>
  );
}

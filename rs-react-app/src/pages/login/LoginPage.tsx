import LoginForm from '@/features/auth/login/ui/LoginForm';
import { Box, Typography } from '@mui/material';

interface LoginPageProps {
  onLogin(token: string, username: string): void;
}
export default function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <Box component="div">
      <Typography>Login</Typography>
      <LoginForm onLogin={onLogin} />
    </Box>
  );
}

import { Box, Typography } from '@mui/material';
import Logout from '@/features/auth/logout/Logout';

interface HeaderProps {
  onLogout(): void;
  username?: string;
  isAuthenticated: boolean;
}

export default function Header({
  onLogout,
  username,
  isAuthenticated,
}: HeaderProps) {
  return (
    <Box
      component="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={2}
    >
      <Box
        component="img"
        display={'flex'}
        alignItems={'center'}
        src="/course_logo.svg"
        alt="Logo"
        sx={{ height: 50 }}
      />
      <Box component="nav" display="flex" alignItems="center" gap={2}>
        {username && (
          <Typography variant="subtitle1" component="div" alignItems={'center'}>
            {username}
          </Typography>
        )}
        {isAuthenticated && <Logout onLogout={onLogout} />}
      </Box>
    </Box>
  );
}

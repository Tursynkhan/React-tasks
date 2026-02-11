import { Box, Typography } from '@mui/material';
import Logout from '@/features/auth/logout/Logout';

interface HeaderProps {
  onLogout(): void;
  username?: string;
}

export default function Header({ onLogout, username }: HeaderProps) {
  return (
    <Box
      component="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={{ xs: 1, sm: 1.5, md: 2 }}
      flexWrap="wrap"
      gap={{ xs: 1, sm: 2 }}
    >
      <Box
        component="img"
        display={'flex'}
        alignItems={'center'}
        src="/course_logo.svg"
        alt="Logo"
        sx={{ height: { xs: 35, sm: 40, md: 50 } }}
      />
      <Box
        component="nav"
        display="flex"
        alignItems="center"
        gap={{ xs: 1, sm: 2 }}
      >
        {username && (
          <Typography
            variant="subtitle1"
            component="div"
            alignItems={'center'}
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {username}
          </Typography>
        )}
        {username && <Logout onLogout={onLogout} />}
      </Box>
    </Box>
  );
}

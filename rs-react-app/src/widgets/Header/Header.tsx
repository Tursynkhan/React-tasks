import { Box, Typography } from '@mui/material';
import Logout from '@/features/auth/logout/Logout';

export default function Header() {
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
        <Typography variant="subtitle1" component="div" alignItems={'center'}>
          Harry Potter
        </Typography>
        <Logout />
      </Box>
    </Box>
  );
}

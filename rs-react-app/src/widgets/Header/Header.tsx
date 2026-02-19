import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import useToggleState from '@/shared/lib/useToggleState';

export default function Header() {
  const [open, toggle] = useToggleState();
  return (
    <Box>
      <AppBar
        position="absolute"
        sx={{ height: '77px', bgcolor: 'transparent' }}
      >
        <Toolbar>
          <Typography>netflixroulette</Typography>
        </Toolbar>
      </AppBar>
      <Menu
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={toggle}
      >
        <MenuItem onClick={toggle}>Profile</MenuItem>
        <MenuItem onClick={toggle}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

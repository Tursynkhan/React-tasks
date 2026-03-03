import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material';
import { Button, Menu } from '@/shared/ui';
import { COLORS } from '@/shared/config';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsAuthenticated,
  selectName,
  selectRole,
  logout,
} from '@/shared/model/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthentificated = useSelector(selectIsAuthenticated);
  const userName = useSelector(selectName);
  const role = useSelector(selectRole);

  const userInitial = userName?.[0] ?? 'U';

  const handleAddMovie = () => {
    navigate('/create-movie');
  };
  const handleLogin = () => {
    navigate('/login');
  };
  const handleLogoClick = () => {
    navigate('/');
  };
  return (
    <Box>
      <AppBar
        position="absolute"
        elevation={0}
        sx={{ height: '77px', bgcolor: 'transparent', maxWidth: '1440px' }}
      >
        <Toolbar
          sx={{
            height: '100%',
            px: { xs: 2, sm: 6 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            onClick={handleLogoClick}
            sx={{ cursor: 'pointer', color: COLORS.accent }}
          >
            netflixroulette
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {role === 'admin' && (
              <Button
                onClick={handleAddMovie}
                variant="admin"
                sx={{ height: 40, px: 2.5, opacity: 0.7 }}
              >
                + Add Movie
              </Button>
            )}

            {isAuthentificated ? (
              <Menu>
                <Menu.Button>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: COLORS.muted,
                        color: COLORS.accent,
                        fontSize: 16,
                        fontWeight: 600,
                      }}
                    >
                      {userInitial}
                    </Avatar>
                  </IconButton>
                </Menu.Button>

                <Menu.Content
                  disableScrollLock={true}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      bgcolor: COLORS.bg,
                    },
                  }}
                  MenuListProps={{ sx: { p: 0 } }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem
                    disabled
                    sx={{
                      opacity: 1,
                      color: '#fff',
                      justifyContent: 'center',
                      textTransform: 'uppercase',
                    }}
                  >
                    {userName}
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      dispatch(logout());
                    }}
                    sx={{
                      justifyContent: 'center',
                      bgcolor: COLORS.accent,
                      color: COLORS.white,
                      textTransform: 'uppercase',
                      '&:hover': {
                        bgcolor: COLORS.accent,
                        filter: 'brightness(0.95)',
                      },
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu.Content>
              </Menu>
            ) : (
              <Button variant="contained" onClick={handleLogin}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

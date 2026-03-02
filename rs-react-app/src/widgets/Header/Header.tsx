import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material';
import Button from '@/shared/ui/Button/Button';
import { COLORS } from '@/shared/config/theme/palette';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsAuthenticated,
  selectName,
  selectRole,
  logout,
} from '@/shared/model/authSlice/authSlice';
import { useNavigate } from 'react-router-dom';
import Menu from '@/shared/ui/Menu';

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
  return (
    <Box>
      <AppBar
        position="absolute"
        elevation={0}
        sx={{ height: '77px', bgcolor: 'transparent' }}
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
          <Typography>netflixroulette</Typography>
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
                        width: 32,
                        height: 32,
                        bgcolor: 'rgba(255,255,255,0.16)',
                        color: COLORS.white,
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      {userInitial}
                    </Avatar>
                  </IconButton>
                </Menu.Button>

                <Menu.Content
                  PaperProps={{
                    sx: {
                      bgcolor: COLORS.bg,
                    },
                  }}
                  MenuListProps={{ sx: { p: 0 } }}
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

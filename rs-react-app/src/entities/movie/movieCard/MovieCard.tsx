import { Box, Typography, IconButton, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MovieIcon from '@mui/icons-material/Movie';
import { COLORS } from '@/shared/config/theme/palette';
import type { MovieItem } from '../model/types';
import { useAppSelector } from '@/app/store/store';
import { selectRole } from '@/shared/model/authSlice/authSlice';
import Menu from '@/shared/ui/Menu';
import { useNavigate } from 'react-router-dom';
import DeleteMovie from '@/features/movies/deleteMovie/DeleteMovie';

interface MovieCardProps {
  movie: MovieItem;
  onClick: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const navigate = useNavigate();
  const role = useAppSelector(selectRole);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '';

  function handleEdit(movieId: number) {
    navigate(`/${movieId}/edit-movie`);
  }

  return (
    <Box
      sx={{
        position: 'relative',
        cursor: 'pointer',
      }}
      component="div"
      onClick={onClick}
    >
      {role === 'admin' && (
        <Box
          className="menu-button"
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 5,
          }}
        >
          <Menu>
            <Menu.Button>
              <IconButton
                size="small"
                sx={{
                  width: 34,
                  height: 34,
                  bgcolor: COLORS.field,
                  color: COLORS.white,
                  '&:hover': { bgcolor: COLORS.muted },
                }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Menu.Button>
            <Menu.Content>
              <MenuItem
                onClick={() => {
                  handleEdit(movie.id);
                }}
              >
                Edit
              </MenuItem>
              <DeleteMovie movieId={movie.id} isMenu />
            </Menu.Content>
          </Menu>
        </Box>
      )}

      <Box
        sx={{
          width: '100%',
          aspectRatio: '2 / 3',
          backgroundImage: movie.poster_path
            ? `url(${movie.poster_path})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          bgcolor: movie.poster_path ? 'transparent' : COLORS.field,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!movie.poster_path && (
          <MovieIcon
            sx={{
              fontSize: 80,
              color: COLORS.muted,
              opacity: 0.5,
            }}
          />
        )}
      </Box>
      <Box sx={{ p: 1.5 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography sx={{ color: COLORS.white, fontSize: 18 }} noWrap>
            {movie.title}
          </Typography>

          {!!year && (
            <Box
              sx={{
                fontSize: 14,
                color: COLORS.white,
              }}
            >
              {year}
            </Box>
          )}
        </Box>

        <Typography sx={{ fontSize: 14, fontWeight: 500, color: COLORS.white }}>
          {(movie.genres ?? []).join(', ')}
        </Typography>
      </Box>
    </Box>
  );
}

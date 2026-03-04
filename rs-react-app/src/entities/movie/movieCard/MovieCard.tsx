import { Box, Typography, IconButton, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { COLORS } from '@/shared/config';
import type { MovieItem } from '../model/types';
import { useAppSelector } from '@/app/store/hooks';
import { selectRole } from '@/shared/model/authSlice';
import { Menu, MoviePoster } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';
import { DeleteMovie } from '@/features/movies/deleteMovie';

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

      <MoviePoster src={movie.poster_path} alt={movie.title} />

      <Box sx={{ p: 1.5 }}>
        <Box
          sx={{
            mb: 2,
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
                padding: '4px 8px',
                fontSize: 14,
                color: COLORS.white,
                border: '1px solid #fff',
                borderRadius: '4px',
              }}
            >
              {year}
            </Box>
          )}
        </Box>

        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: COLORS.white,
            opacity: 0.7,
          }}
        >
          {(movie.genres ?? []).join(', ')}
        </Typography>
      </Box>
    </Box>
  );
}

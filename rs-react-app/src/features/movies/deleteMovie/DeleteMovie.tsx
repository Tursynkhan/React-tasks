import React from 'react';
import ConfirmDialog from '@/shared/ui/ConfirmDialog/ConfirmDialog';
import { MenuItem, Button } from '@mui/material';
import { useAppDispatch } from '@/app/store/store';
import { deleteMovie } from '@/shared/model/movieSlice/movieSlice';
import { MenuContext } from '@/shared/ui/Menu/CompoundMenu';
import { toast } from 'react-toastify';
import { COLORS } from '@/shared/config/theme/palette';
import { useNavigate } from 'react-router-dom';

interface DeleteMovieProps {
  movieId: number;
  isMenu?: boolean;
}

export default function DeleteMovie({ movieId, isMenu }: DeleteMovieProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const menuContext = React.useContext(MenuContext);

  const handleConfirmDelete = async (movieId: number) => {
    const toastId = toast.loading('Deleting movie...');

    try {
      await dispatch(deleteMovie(movieId)).unwrap();
      toast.update(toastId, {
        render: 'Movie deleted successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
      if (menuContext) {
        menuContext.closeMenu();
      } else {
        navigate('/');
      }
    } catch {
      toast.update(toastId, {
        render: 'Failed to delete movie',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <ConfirmDialog
      title="Delete Movie"
      description="Are you sure you want to delete this movie?"
      onConfirm={() => {
        handleConfirmDelete(movieId);
      }}
    >
      {(onClick) => {
        return isMenu ? (
          <MenuItem onClick={onClick}>Delete</MenuItem>
        ) : (
          <Button
            onClick={onClick}
            variant="contained"
            disableElevation
            sx={{
              borderRadius: 0,
              minWidth: 140,
              bgcolor: '#424242',
              color: COLORS.accent,
              textTransform: 'uppercase',
              '&:hover': { bgcolor: '#4a4a4a' },
            }}
          >
            Delete
          </Button>
        );
      }}
    </ConfirmDialog>
  );
}

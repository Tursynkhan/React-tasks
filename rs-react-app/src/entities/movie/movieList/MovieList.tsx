import React from 'react';
import { Box, CircularProgress, Pagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import MoviesCount from './ui/MovieCount';
import MovieCard from '../movieCard/MovieCard';
import {
  selectMoviesError,
  selectMoviesStatus,
  selectMovies,
  selectTotalAmount,
  selectCreateStatus,
  selectEditStatus,
  fetchMovie,
  resetCreateStatus,
  resetEditStatus,
} from '@/shared/model/movieSlice';
import { COLORS } from '@/shared/config';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SuccessDialog } from '@/shared/ui';

const ITEMS_PER_PAGE = 12;

export default function MovieList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const filter = searchParams.get('filter') ?? '';
  const pageParam = searchParams.get('page');

  const [page, setPage] = React.useState(pageParam ? Number(pageParam) : 1);
  const dispatch = useAppDispatch();

  const movies = useAppSelector(selectMovies);
  const totalAmount = useAppSelector(selectTotalAmount);
  const status = useAppSelector(selectMoviesStatus);
  const error = useAppSelector(selectMoviesError);
  const createStatus = useAppSelector(selectCreateStatus);
  const editStatus = useAppSelector(selectEditStatus);

  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false);
  const [successType, setSuccessType] = React.useState<'create' | 'edit'>(
    'create'
  );

  const totalPages = Math.ceil(totalAmount / ITEMS_PER_PAGE);

  const prevSearch = React.useRef(search);
  const prevFilter = React.useRef(filter);

  React.useEffect(() => {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const params: {
      offset: number;
      limit: number;
      search?: string;
      searchBy?: 'title' | 'genres';
      filter?: string;
    } = {
      offset,
      limit: ITEMS_PER_PAGE,
    };

    if (search.trim()) {
      params.search = search.trim();
      params.searchBy = 'title';
    }

    if (filter && filter !== 'ALL') {
      params.filter = filter;
    }

    dispatch(fetchMovie(params));
  }, [page, search, filter, dispatch]);

  React.useEffect(() => {
    const pageParam = searchParams.get('page');
    const newPage = pageParam ? Number(pageParam) : 1;
    if (newPage !== page) {
      setPage(newPage);
    }
  }, [searchParams, page]);

  React.useEffect(() => {
    if (prevSearch.current !== search || prevFilter.current !== filter) {
      prevSearch.current = search;
      prevFilter.current = filter;
      setPage(1);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('page', '1');
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [search, filter, searchParams, setSearchParams]);

  React.useEffect(() => {
    if (status === 'error' && error) {
      toast.error(error);
    }
  }, [status, error]);

  React.useEffect(() => {
    if (createStatus === 'success') {
      setSuccessType('create');
      setShowSuccessDialog(true);
    }
  }, [createStatus]);

  React.useEffect(() => {
    if (editStatus === 'success') {
      setSuccessType('edit');
      setShowSuccessDialog(true);
    }
  }, [editStatus]);

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    if (successType === 'create') {
      dispatch(resetCreateStatus());
    } else {
      dispatch(resetEditStatus());
    }
  };

  const handleOpenCard = (id: number) => {
    navigate(`/${id}`);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', String(value));
    setSearchParams(newSearchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (status === 'loading') {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          bgcolor: COLORS.bg,
        }}
      >
        <CircularProgress sx={{ color: COLORS.accent }} />
      </Box>
    );
  }

  const successMessage =
    successType === 'create'
      ? 'The movie has been added to database successfully'
      : 'The movie has been updated successfully';

  return (
    <>
      <SuccessDialog
        open={showSuccessDialog}
        title="CONGRATULATIONS!"
        message={successMessage}
        onClose={handleSuccessDialogClose}
      />
      <Box sx={{ px: 7.5, bgcolor: COLORS.bg, pb: 4 }}>
        <MoviesCount count={totalAmount} />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, minmax(0, 1fr))',
              sm: 'repeat(3, minmax(0, 1fr))',
              md: 'repeat(4, minmax(0, 1fr))',
            },
            gap: 2.5,
            mb: 4,
          }}
        >
          {movies.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              onClick={() => {
                handleOpenCard(m.id);
              }}
            />
          ))}
        </Box>
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: COLORS.white,
                },
                '& .MuiPaginationItem-root.Mui-selected': {
                  backgroundColor: COLORS.accent,
                  color: COLORS.white,
                },
              }}
            />
          </Box>
        )}
      </Box>
    </>
  );
}

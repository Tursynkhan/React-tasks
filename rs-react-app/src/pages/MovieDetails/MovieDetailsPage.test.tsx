import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import MovieDetailsPage from './MovieDetailsPage';
import authReducer from '@/shared/model/authSlice/authSlice';
import movieReducer from '@/shared/model/movieSlice/movieSlice';
import type { UserRole } from '@/shared/types';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  poster_path: 'https://example.com/poster.jpg',
  release_date: '2023-01-15',
  genres: ['Action', 'Drama'],
  vote_average: 8.5,
  runtime: 120,
  overview: 'This is a test movie overview',
};

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ movieId: '1' }),
  };
});

const createMockStore = (movieState = {}, authState = {}) => {
  return configureStore({
    reducer: {
      movie: movieReducer,
      auth: authReducer,
    },
    preloadedState: {
      movie: {
        movies: [],
        totalAmount: 0,
        status: 'idle' as const,
        errorMessage: null,
        createStatus: 'idle' as const,
        editStatus: 'idle' as const,
        deleteStatus: 'idle' as const,
        currentMovie: null,
        currentMovieStatus: 'idle' as const,
        ...movieState,
      },
      auth: {
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@test.com',
          role: 'user' as UserRole,
          token: 'test-token',
        },
        status: 'idle' as const,
        errorMessage: null,
        ...authState,
      },
    },
  });
};

const renderWithProviders = (
  ui: React.ReactElement,
  store = createMockStore()
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={ui} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('MovieDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    const store = createMockStore({
      currentMovie: null,
      currentMovieStatus: 'loading',
    });

    renderWithProviders(<MovieDetailsPage />, store);

    expect(screen.queryByText('Test Movie')).not.toBeInTheDocument();
  });

  it('renders movie rating', () => {
    const store = createMockStore({
      currentMovie: mockMovie,
      currentMovieStatus: 'success',
    });

    renderWithProviders(<MovieDetailsPage />, store);

    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('shows Edit and Delete buttons for admin users', () => {
    const store = createMockStore(
      {
        currentMovie: mockMovie,
        currentMovieStatus: 'success',
      },
      {
        user: {
          id: 1,
          name: 'Admin',
          email: 'admin@test.com',
          role: 'admin',
          token: 'admin-token',
        },
      }
    );

    renderWithProviders(<MovieDetailsPage />, store);

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('hides Edit and Delete buttons for guests', () => {
    const store = createMockStore(
      {
        currentMovie: mockMovie,
        currentMovieStatus: 'success',
      },
      {
        user: {
          id: 1,
          name: 'User',
          email: 'user@test.com',
          role: 'user',
          token: 'user-token',
        },
      }
    );

    renderWithProviders(<MovieDetailsPage />, store);

    expect(
      screen.queryByRole('button', { name: /edit/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /delete/i })
    ).not.toBeInTheDocument();
  });

  it('navigates to edit page when Edit button is clicked', async () => {
    const user = userEvent.setup();
    const store = createMockStore(
      {
        currentMovie: mockMovie,
        currentMovieStatus: 'success',
      },
      {
        user: {
          id: 1,
          name: 'Admin',
          email: 'admin@test.com',
          role: 'admin',
          token: 'admin-token',
        },
      }
    );

    renderWithProviders(<MovieDetailsPage />, store);

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith('/1/edit-movie');
  });
});

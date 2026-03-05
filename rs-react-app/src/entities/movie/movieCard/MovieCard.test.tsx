import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import MovieCard from './MovieCard';
import authReducer from '@/shared/model/authSlice/authSlice';
import type { MovieItem } from '../model/types';
import type { UserRole } from '@/shared/types';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockMovie: MovieItem = {
  id: 1,
  title: 'Test Movie',
  poster_path: 'https://example.com/poster.jpg',
  release_date: '2023-05-15',
  genres: ['Action', 'Drama'],
  vote_average: 8.5,
  runtime: 120,
  overview: 'Test overview',
};

const createMockStore = (authState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        status: 'idle' as const,
        errorMessage: null,
        ...authState,
      },
    },
  });
};

const renderWithProviders = (
  movie: MovieItem = mockMovie,
  onClick = vi.fn(),
  store = createMockStore()
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <MovieCard movie={movie} onClick={onClick} />
      </MemoryRouter>
    </Provider>
  );
};

describe('MovieCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders movie title', () => {
    renderWithProviders();

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });

  it('renders release year', () => {
    renderWithProviders();

    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  it('renders genres', () => {
    renderWithProviders();

    expect(screen.getByText('Action, Drama')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithProviders(mockMovie, onClick);

    const title = screen.getByText('Test Movie');
    await user.click(title);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('hides menu button for regular users', () => {
    const store = createMockStore({
      user: {
        id: 1,
        name: 'User',
        email: 'user@test.com',
        role: 'user' as UserRole,
        token: 'user-token',
      },
    });

    renderWithProviders(mockMovie, vi.fn(), store);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('shows menu button for admin users', () => {
    const store = createMockStore({
      user: {
        id: 1,
        name: 'Admin',
        email: 'admin@test.com',
        role: 'admin' as UserRole,
        token: 'admin-token',
      },
    });

    renderWithProviders(mockMovie, vi.fn(), store);

    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
  });

  it('navigates to edit page when Edit menu item is clicked', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      user: {
        id: 1,
        name: 'Admin',
        email: 'admin@test.com',
        role: 'admin' as UserRole,
        token: 'admin-token',
      },
    });

    renderWithProviders(mockMovie, vi.fn(), store);

    const menuButton = screen.getByRole('button');
    await user.click(menuButton);

    const editMenuItem = screen.getByText('Edit');
    await user.click(editMenuItem);

    expect(mockNavigate).toHaveBeenCalledWith('/1/edit-movie');
  });

  it('renders empty genres when genres array is empty', () => {
    const movieWithoutGenres = {
      ...mockMovie,
      genres: [],
    };

    renderWithProviders(movieWithoutGenres);

    const genresText = screen.queryByText('Action, Drama');
    expect(genresText).not.toBeInTheDocument();
  });

  it('does not render year when release date is empty', () => {
    const movieWithoutDate = {
      ...mockMovie,
      release_date: '',
    };

    renderWithProviders(movieWithoutDate);

    const yearText = screen.queryByText('2023');
    expect(yearText).not.toBeInTheDocument();
  });
});

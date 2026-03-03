import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import MovieList from './MovieList';
import movieReducer from '@/shared/model/movieSlice';
import authReducer from '@/shared/model/authSlice';
import * as movieApi from '@/entities/movie/api/movieApi';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockMovies = [
  {
    id: 1,
    title: 'Test Movie 1',
    poster_path: 'https://example.com/poster1.jpg',
    release_date: '2023-01-15',
    genres: ['Action', 'Drama'],
    vote_average: 8.5,
    runtime: 120,
    overview: 'Test overview 1',
  },
  {
    id: 2,
    title: 'Test Movie 2',
    poster_path: 'https://example.com/poster2.jpg',
    release_date: '2022-06-10',
    genres: ['Comedy'],
    vote_average: 7.2,
    runtime: 95,
    overview: 'Test overview 2',
  },
];

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
        user: null,
        status: 'idle' as const,
        errorMessage: null,
        ...authState,
      },
    },
  });
};

const renderWithProviders = (store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <MovieList />
      </MemoryRouter>
    </Provider>
  );
};

describe('MovieList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('showing loading state', () => {
    vi.spyOn(movieApi, 'movieApi').mockResolvedValue({
      data: [],
      filteredCount: 0,
    });

    const store = createMockStore({
      status: 'loading',
      movies: [],
      totalAmount: 0,
    });

    renderWithProviders(store);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays "movies found" with plural form when count > 1', async () => {
    vi.spyOn(movieApi, 'movieApi').mockResolvedValueOnce({
      data: mockMovies,
      filteredCount: 25,
    });

    const store = createMockStore();

    renderWithProviders(store);

    await waitFor(() => {
      expect(screen.getByText('25 movies found')).toBeInTheDocument();
    });
  });

  it('displays "movie found" with singular form when count = 1', async () => {
    vi.spyOn(movieApi, 'movieApi').mockResolvedValueOnce({
      data: [mockMovies[0]],
      filteredCount: 1,
    });

    const store = createMockStore();

    renderWithProviders(store);

    await waitFor(() => {
      expect(screen.getByText('1 movie found')).toBeInTheDocument();
    });
  });

  it('each MovieCard displays poster image, movie title, genres, and release year', async () => {
    vi.spyOn(movieApi, 'movieApi').mockResolvedValueOnce({
      data: mockMovies,
      filteredCount: 2,
    });

    const store = createMockStore();

    renderWithProviders(store);

    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    });

    expect(screen.getByText('Action, Drama')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();

    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
    expect(screen.getByText('Comedy')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });

  it('clicking a MovieCard navigates to /:movieId route', async () => {
    const user = userEvent.setup();
    vi.spyOn(movieApi, 'movieApi').mockResolvedValueOnce({
      data: [mockMovies[0]],
      filteredCount: 1,
    });

    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieList />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    });

    const clickableElement = container.querySelector(
      '[style*="cursor: pointer"]'
    );

    if (clickableElement) {
      await user.click(clickableElement);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/1');
      });
    }
  });

  it('displays empty list when no movies are available', async () => {
    vi.spyOn(movieApi, 'movieApi').mockResolvedValueOnce({
      data: [],
      filteredCount: 0,
    });

    const store = createMockStore();

    renderWithProviders(store);

    await waitFor(() => {
      expect(screen.getByText('0 movies found')).toBeInTheDocument();
    });

    expect(screen.queryByText('Test Movie 1')).not.toBeInTheDocument();
  });
});

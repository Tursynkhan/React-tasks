import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import HomePage from './HomePage';
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
        <HomePage />
      </MemoryRouter>
    </Provider>
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the hero section', () => {
    vi.spyOn(movieApi, 'movieApi').mockResolvedValue({
      data: [],
      filteredCount: 0,
    });

    renderWithProviders();

    expect(screen.getByText('FIND YOUR MOViE')).toBeInTheDocument();
  });

  it('renders the movies toolbar with search and filter', () => {
    vi.spyOn(movieApi, 'movieApi').mockResolvedValue({
      data: [],
      filteredCount: 0,
    });

    renderWithProviders();

    expect(
      screen.getByPlaceholderText('What do you want to watch?')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('shows loading state', () => {
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

  it('renders movie list when data is provided', async () => {
    vi.spyOn(movieApi, 'movieApi').mockResolvedValue({
      data: mockMovies,
      filteredCount: 2,
    });

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    });

    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
    expect(screen.getByText('2 movies found')).toBeInTheDocument();
  });

  it('renders movie tiles with correct data', async () => {
    vi.spyOn(movieApi, 'movieApi').mockResolvedValue({
      data: mockMovies,
      filteredCount: 2,
    });

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    });

    expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Action, Drama')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();

    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
    expect(screen.getByText('Comedy')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });

  it('shows empty state when movies not found', async () => {
    vi.spyOn(movieApi, 'movieApi').mockResolvedValue({
      data: [],
      filteredCount: 0,
    });

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText('0 movies found')).toBeInTheDocument();
    });
  });

  it('renders movie list component', async () => {
    vi.spyOn(movieApi, 'movieApi').mockResolvedValue({
      data: [],
      filteredCount: 0,
    });

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText(/movies found/i)).toBeInTheDocument();
    });
  });
});

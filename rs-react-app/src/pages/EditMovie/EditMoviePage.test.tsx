import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import EditMoviePage from './EditMoviePage';
import movieReducer from '@/shared/model/movieSlice/movieSlice';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ movieId: '1' }),
  };
});

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  poster_path: 'https://example.com/poster.jpg',
  release_date: '2023-01-15',
  genres: ['Action'],
  vote_average: 8.5,
  runtime: 120,
  overview: 'Test overview',
};

const createMockStore = (movieState = {}) => {
  return configureStore({
    reducer: {
      movie: movieReducer,
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
    },
  });
};

const renderWithProviders = (
  ui: React.ReactElement,
  store = createMockStore()
) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe('EditMoviePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders edit movie form when movie is loaded', () => {
    const store = createMockStore({
      currentMovie: mockMovie,
      currentMovieStatus: 'success',
    });

    renderWithProviders(<EditMoviePage />, store);

    expect(screen.getByText(/edit movie/i)).toBeInTheDocument();
  });

  it('form with existing movie data', () => {
    const store = createMockStore({
      currentMovie: mockMovie,
      currentMovieStatus: 'success',
    });

    renderWithProviders(<EditMoviePage />, store);

    expect(screen.getByDisplayValue('Test Movie')).toBeInTheDocument();
    expect(screen.getByDisplayValue('8.5')).toBeInTheDocument();
  });

  it('renders Submit and Reset buttons', () => {
    const store = createMockStore({
      currentMovie: mockMovie,
      currentMovieStatus: 'success',
    });

    renderWithProviders(<EditMoviePage />, store);

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('all form fields are pre-filled with existing movie data', () => {
    const store = createMockStore({
      currentMovie: mockMovie,
      currentMovieStatus: 'success',
    });

    renderWithProviders(<EditMoviePage />, store);

    const titleInput = screen.getByPlaceholderText('Movie title');
    const posterInput = screen.getByPlaceholderText('https://');
    const overviewInput = screen.getByPlaceholderText('Movie description');
    const dateInput = screen.getByLabelText(/release date/i);

    expect(titleInput).toHaveValue('Test Movie');
    expect(posterInput).toHaveValue('https://example.com/poster.jpg');
    expect(overviewInput).toHaveValue('Test overview');
    expect(dateInput).toHaveValue('2023-01-15');

    expect(screen.getByDisplayValue('8.5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('120')).toBeInTheDocument();
  });
});

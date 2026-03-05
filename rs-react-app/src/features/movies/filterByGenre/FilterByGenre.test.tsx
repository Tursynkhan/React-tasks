import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import FilterByGenre from './FilterByGenre';
import movieReducer from '@/shared/model/movieSlice/movieSlice';

const mockSetSearchParams = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => [mockSearchParams, mockSetSearchParams],
  };
});

const mockMovies = [
  {
    id: 1,
    title: 'Action Movie',
    poster_path: 'https://example.com/poster1.jpg',
    release_date: '2023-01-15',
    genres: ['Action', 'Drama'],
    vote_average: 8.5,
    runtime: 120,
    overview: 'Action overview',
  },
  {
    id: 2,
    title: 'Comedy Movie',
    poster_path: 'https://example.com/poster2.jpg',
    release_date: '2022-06-10',
    genres: ['Comedy'],
    vote_average: 7.2,
    runtime: 95,
    overview: 'Comedy overview',
  },
  {
    id: 3,
    title: 'Drama Movie',
    poster_path: 'https://example.com/poster3.jpg',
    release_date: '2021-03-20',
    genres: ['Drama', 'Thriller'],
    vote_average: 9.0,
    runtime: 150,
    overview: 'Drama overview',
  },
];

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

const renderWithProviders = (store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <FilterByGenre />
      </MemoryRouter>
    </Provider>
  );
};

describe('FilterByGenre', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams.delete('filter');
    mockSearchParams.delete('search');
  });

  it('displays genre buttons in the current movie list', () => {
    const store = createMockStore({
      status: 'success',
      movies: mockMovies,
      totalAmount: 3,
    });

    renderWithProviders(store);
    expect(screen.getByText('ALL')).toBeInTheDocument();

    expect(screen.getByText('ACTION')).toBeInTheDocument();
    expect(screen.getByText('COMEDY')).toBeInTheDocument();
    expect(screen.getByText('DRAMA')).toBeInTheDocument();
    expect(screen.getByText('THRILLER')).toBeInTheDocument();
  });

  it('clicking ALL button resets the genre filter', async () => {
    const user = userEvent.setup();

    mockSearchParams.set('filter', 'ACTION');

    const store = createMockStore({
      status: 'success',
      movies: mockMovies,
      totalAmount: 3,
    });

    renderWithProviders(store);

    const allButton = screen.getByText('ALL');
    await user.click(allButton);

    expect(mockSetSearchParams).toHaveBeenCalled();

    const callArg = mockSetSearchParams.mock.calls[0][0];
    expect(callArg.has('filter')).toBe(false);
  });

  it('clicking a genre button sets the filter parameter', async () => {
    const user = userEvent.setup();

    const store = createMockStore({
      status: 'success',
      movies: mockMovies,
      totalAmount: 3,
    });

    renderWithProviders(store);

    const actionButton = screen.getByText('ACTION');
    await user.click(actionButton);

    expect(mockSetSearchParams).toHaveBeenCalled();

    const callArg = mockSetSearchParams.mock.calls[0][0];
    expect(callArg.get('filter')).toBe('ACTION');
  });

  it('displays only genres from current movies', () => {
    const singleGenreMovies = [mockMovies[1]];

    const store = createMockStore({
      status: 'success',
      movies: singleGenreMovies,
      totalAmount: 1,
    });

    renderWithProviders(store);

    expect(screen.getByText('ALL')).toBeInTheDocument();
    expect(screen.getByText('COMEDY')).toBeInTheDocument();

    expect(screen.queryByText('ACTION')).not.toBeInTheDocument();
    expect(screen.queryByText('DRAMA')).not.toBeInTheDocument();
    expect(screen.queryByText('THRILLER')).not.toBeInTheDocument();
  });
});

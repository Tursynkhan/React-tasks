import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import MovieForm from './MovieForm';
import movieReducer from '@/shared/model/movieSlice/movieSlice';
import React from 'react';

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
  store = createMockStore(),
  withSubmitButton = false
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        {ui}
        {withSubmitButton && (
          <button type="submit" form="add-movie-form">
            Submit
          </button>
        )}
      </MemoryRouter>
    </Provider>
  );
};

describe('MovieForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('form renders with fields', () => {
    renderWithProviders(<MovieForm mode="create" />);

    expect(screen.getByPlaceholderText('Movie title')).toBeInTheDocument();
    expect(screen.getByLabelText(/release date/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('https://')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('7.8')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('in minutes')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Movie description')
    ).toBeInTheDocument();
    expect(screen.getByText(/genre/i)).toBeInTheDocument();
  });

  it('dispatches editMovie action on valid submit in edit mode', async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    const initialValues = {
      title: 'Existing Movie',
      release_date: '2023-01-01',
      poster_path: 'https://example.com/poster.jpg',
      vote_average: 8.0,
      runtime: 120,
      overview: 'Original overview',
      genres: ['Action'],
    };

    renderWithProviders(
      <MovieForm mode="edit" movieId={1} initialValues={initialValues} />,
      store,
      true
    );

    const titleInput = screen.getByPlaceholderText('Movie title');
    await user.clear(titleInput);
    await user.type(titleInput, 'Updated Movie');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('renders form in edit mode with initial values', () => {
    const initialValues = {
      title: 'Existing Movie',
      release_date: '2023-01-01',
      poster_path: 'https://example.com/poster.jpg',
      vote_average: 8.0,
      runtime: 120,
      overview: 'Original overview',
      genres: ['Action'],
    };

    renderWithProviders(
      <MovieForm mode="edit" movieId={1} initialValues={initialValues} />
    );

    expect(screen.getByPlaceholderText('Movie title')).toHaveValue(
      'Existing Movie'
    );
    expect(screen.getByPlaceholderText('https://')).toHaveValue(
      'https://example.com/poster.jpg'
    );
    expect(screen.getByPlaceholderText('Movie description')).toHaveValue(
      'Original overview'
    );
  });
});

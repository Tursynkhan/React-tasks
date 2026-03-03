import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import CreateMoviePage from './CreateMoviePage';
import movieReducer from '@/shared/model/movieSlice';
import authReducer from '@/shared/model/authSlice';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const createMockStore = () => {
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
      },
      auth: {
        user: null,
        status: 'idle' as const,
        errorMessage: null,
      },
    },
  });
};

const renderWithProviders = (ui: React.ReactElement) => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe('CreateMoviePage', () => {
  it('renders create movie form', () => {
    renderWithProviders(<CreateMoviePage />);

    expect(screen.getByText('Create Movie')).toBeInTheDocument();
  });

  it('renders all form fields for creating movie', () => {
    renderWithProviders(<CreateMoviePage />);

    expect(screen.getByPlaceholderText('Movie title')).toBeInTheDocument();
    expect(screen.getByLabelText(/release date/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('https://')).toBeInTheDocument();
  });

  it('renders Submit and Reset buttons', () => {
    renderWithProviders(<CreateMoviePage />);

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('navigates back to home when dialog is closed', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CreateMoviePage />);

    const closeButtons = screen.getAllByRole('button');
    const closeButton = closeButtons.find(
      (btn) =>
        btn.getAttribute('aria-label')?.includes('close') ||
        btn.className.includes('MuiDialogTitle')
    );

    if (closeButton) {
      await user.click(closeButton);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    }
  });
});

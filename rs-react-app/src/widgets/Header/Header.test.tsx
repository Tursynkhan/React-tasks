import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Header from './Header';
import authReducer from '@/shared/model/authSlice';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

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
  ui: React.ReactElement,
  store = createMockStore()
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays "netflixroulette" text as a logo/brand element', () => {
    renderWithProviders(<Header />);

    expect(screen.getByText('netflixroulette')).toBeInTheDocument();
  });

  it('clicking + ADD MOVIE button navigates to /create-movie', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      user: {
        id: 1,
        name: 'Admin User',
        email: 'admin@test.com',
        role: 'admin',
        token: 'admin-token',
      },
    });

    renderWithProviders(<Header />, store);

    const addButton = screen.getByRole('button', { name: /add movie/i });
    await user.click(addButton);

    expect(mockNavigate).toHaveBeenCalledWith('/create-movie');
  });

  it("displays a button with the user's first name initial (uppercase) for authorized users", () => {
    const store = createMockStore({
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@test.com',
        role: 'user',
        token: 'test-token',
      },
    });

    renderWithProviders(<Header />, store);

    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('user initial button is hidden for non-authorized users', () => {
    const store = createMockStore({ user: null });
    renderWithProviders(<Header />, store);

    expect(screen.queryByText(/^[A-Z]$/)).not.toBeInTheDocument();
  });
});

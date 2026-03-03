import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import LoginPage from './LoginPage';
import authReducer from '@/shared/model/authSlice';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        status: 'idle' as const,
        errorMessage: null,
        ...initialState,
      },
    },
  });
};

const renderWithProviders = (
  ui: React.ReactElement,
  store = createMockStore(),
  route = '/login'
) =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>
  );

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('form contains email , password, login, reset', () => {
    renderWithProviders(<LoginPage />);

    expect(screen.getByPlaceholderText('enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('enter password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /^login$/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    const emailInput = screen.getByPlaceholderText(/enter email/i);
    const submitButton = screen.getByRole('button', { name: /^login$/i });

    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);

    const errorMessage = await screen.findByText(
      /invalid email address/i,
      {},
      { timeout: 3000 }
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('allows user to type in email and password fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('enter email');
    const passwordInput = screen.getByPlaceholderText('enter password');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('clears form when Reset button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('enter email');
    const passwordInput = screen.getByPlaceholderText('enter password');
    const resetButton = screen.getByRole('button', { name: /reset/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(resetButton);

    await waitFor(() => {
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ProtectedRoute } from './ProtectedRoute';
import authReducer from '@/shared/model/authSlice/authSlice';

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

const TestComponent = () => <div>Protected Content</div>;
const LoginComponent = () => <div>Login Page</div>;

const renderWithRouter = (store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<TestComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('ProtectedRoute', () => {
  it('redirects to /login when user is not authenticated', () => {
    const store = createMockStore({ user: null });
    renderWithRouter(store);

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('renders protected content when user is authenticated', () => {
    const store = createMockStore({
      user: {
        id: 1,
        name: 'Test User',
        email: 'test@test.com',
        role: 'user',
        token: 'test-token',
      },
    });

    renderWithRouter(store);

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});

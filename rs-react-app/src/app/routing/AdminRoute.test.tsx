import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { AdminRoute } from './AdminRoute';
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

const AdminComponent = () => <div>Admin Content</div>;
const HomeComponent = () => <div>Home Page</div>;
const LoginComponent = () => <div>Login Page</div>;

describe('AdminRoute', () => {
  it('redirects to /login when user is not authenticated', () => {
    const store = createMockStore({ user: null });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route element={<AdminRoute />}>
              <Route path="/" element={<AdminComponent />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Admin Content')).not.toBeInTheDocument();
  });

  it('redirects to / when user is authenticated but not admin', () => {
    const store = createMockStore({
      user: {
        id: 1,
        name: 'Test',
        email: 'test@mail.com',
        role: 'user',
        token: 'test-token',
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/" element={<HomeComponent />} />
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminComponent />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
    expect(screen.queryByText('Admin Content')).not.toBeInTheDocument();
  });

  it('renders admin content when user is admin', () => {
    const store = createMockStore({
      user: {
        id: 1,
        name: 'Admin User',
        email: 'admin@test.com',
        role: 'admin',
        token: 'admin-token',
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/" element={<HomeComponent />} />
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminComponent />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Admin Content')).toBeInTheDocument();
  });
});

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from '@/shared/config';
import { Layout } from '@/widgets';
import {
  HomePage,
  LoginPage,
  MovieDetailsPage,
  EditMoviePage,
  CreateMoviePage,
} from '@/pages';
import { ProtectedRoute, AdminRoute, PublicRoute } from '@/app/routing';
import { useAppSelector } from '@/app/store/hooks';
import { selectIsAuthenticated } from '@/shared/model/authSlice';

function Redirect() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return <Navigate to={isAuthenticated ? '/' : '/login'} replace />;
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
        />
        <Layout>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/:movieId" element={<MovieDetailsPage />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path="/:movieId/edit-movie" element={<EditMoviePage />} />
              <Route path="/create-movie" element={<CreateMoviePage />} />
            </Route>

            <Route path="*" element={<Redirect />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

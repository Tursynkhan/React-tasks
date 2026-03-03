import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from '@/shared/config';
import Layout from '@/widgets/Layout/Layout';
import HomePage from '@/pages/HomePage/HomePage';
import LoginPage from '@/pages/Login/LoginPage';
import { ProtectedRoute } from '@/app/routing/ProtectedRoute';
import { AdminRoute } from '@/app/routing/AdminRoute';
import { PublicRoute } from '@/app/routing/PublicRoute';
import MovieDetailsPage from '@/pages/MovieDetails/MovieDetailsPage';
import EditMoviePage from '@/pages/EditMovie/EditMoviePage';
import CreateMoviePage from '@/pages/CreateMovie/CreateMoviePage';
import { useAppSelector } from '@/app/store/store';
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

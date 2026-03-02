import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from '@/shared/config/theme/theme';
import Layout from '@/widgets/Layout/Layout';
import HomePage from '@/pages/HomePage/HomePage';
import LoginPage from '@/pages/Login/LoginPage';
import { ProtectedRoute } from '@/app/routing/ProtectedRoute';
import MovieDetailsPage from '@/pages/MovieDetails/MovieDetailsPage';
import EditMoviePage from '@/pages/EditMovie/EditMoviePage';
import CreateMoviePage from '@/pages/CreateMovie/CreateMoviePage';

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
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/:movieId" element={<MovieDetailsPage />} />
              <Route path="/:movieId/edit-movie" element={<EditMoviePage />} />
              <Route path="/create-movie" element={<CreateMoviePage />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

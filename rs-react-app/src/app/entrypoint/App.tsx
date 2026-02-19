import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/widgets/Layout/Layout';
import HomePage from '@/pages/HomePage/HomePage';
import LoginPage from '@/pages/Login/LoginPage';
import { ProtectedRoute } from '@/app/routing/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

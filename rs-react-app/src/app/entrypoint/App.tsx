import CoursesPage from '@/pages/courses/CoursesPage.tsx';
import Header from '@/widgets/Header/Header.tsx';
import LoginPage from '@/pages/login/LoginPage';
import ProtectedRoute from '@/shared/ui/ProtectedRoute/ProtectedRoute';
import Layout from '@/widgets/Layout/Layout.tsx';
import useToken from '@/shared/utils/useToken';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  const { username, setAuth, removeToken } = useToken();

  return (
    <BrowserRouter>
      <Layout>
        <Header onLogout={removeToken} username={username} />
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={setAuth} />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/courses" element={<CoursesPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

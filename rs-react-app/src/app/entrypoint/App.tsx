import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../../widgets/Layout/Layout';
import LoginPage from '@/pages/Login/LoginPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

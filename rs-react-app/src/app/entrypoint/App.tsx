import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../../widgets/Layout/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<></>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

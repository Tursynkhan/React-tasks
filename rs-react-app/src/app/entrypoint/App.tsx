import CoursesPage from '@/pages/courses/CoursesPage.tsx';
import Header from '@/widgets/Header/Header.tsx';
import LoginPage from '@/pages/login/LoginPage';
import useToken from '@/shared/utils/useToken';
import '@/assets/styles/main.scss';

export default function App() {
  const { token, username, setAuth, removeToken } = useToken();

  return (
    <div className="main">
      <Header
        onLogout={removeToken}
        username={username}
        isAuthenticated={!!token}
      />
      {token ? <CoursesPage /> : <LoginPage onLogin={setAuth} />}
    </div>
  );
}

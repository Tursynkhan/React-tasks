import CoursesPage from '@/pages/courses/CoursesPage.tsx';
import Header from '@/widgets/Header/Header.tsx';
import '@/assets/styles/main.scss';

export default function App() {
  return (
    <div className="main">
      <Header />
      <CoursesPage />
    </div>
  );
}

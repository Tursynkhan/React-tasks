import Courses from '../../widgets/Courses/Courses';
import SearchBar from '../../widgets/SearchBar/SearchBar';
import styles from './CoursesPage.module.scss';

export default function CoursesPage() {
  return (
    <div className={styles.container}>
      <SearchBar />
      <Courses />
    </div>
  );
}

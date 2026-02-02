import SearchCourses from '../../features/courses/searchCourses/SearchCourses';
import AddNewCourses from '../../features/courses/addNewCourses/AddNewCourses';
import styles from './SearchBar.module.scss';

export default function SearchBar() {
  return (
    <div className={styles.container}>
      <SearchCourses />
      <AddNewCourses />
    </div>
  );
}

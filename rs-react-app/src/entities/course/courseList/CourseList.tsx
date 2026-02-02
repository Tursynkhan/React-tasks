import { type Course } from '../model/types';
import { mockedCoursesList } from '../model/mockCoursesList';
import CourseCard from '../courseCard/CourseCard';
import styles from './CourseList.module.scss';

export default function CourseList() {
  return (
    <div className={styles.list}>
      {mockedCoursesList.map((course: Course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

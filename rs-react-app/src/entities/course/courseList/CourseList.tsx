import { type Course } from '../model/types';
import { mockedCoursesList } from '../model/mockCoursesList';
import CourseCard from '../courseCard/CourseCard';
import styles from './CourseList.module.scss';

interface CourseListProps {
  onShowCourse: (course: Course) => void;
}

export default function CourseList({ onShowCourse }: CourseListProps) {
  return (
    <div className={styles.list}>
      {mockedCoursesList.map((course: Course) => (
        <CourseCard
          key={course.id}
          course={course}
          onShowCourse={onShowCourse}
        />
      ))}
    </div>
  );
}

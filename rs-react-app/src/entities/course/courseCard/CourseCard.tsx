import DeleteCourses from '../../../features/courses/deleteCourses/DeleteCourses';
import EditCourses from '../../../features/courses/editCourses/EditCourses';
import ShowCourses from '../../../features/courses/showCourses/ShowCourses';
import styles from './CourseCard.module.scss';
import { type Course } from '../model/types';

interface CourseCardProps {
  course: Course;
  onShowCourse: (course: Course) => void;
}

export default function CourseCard({ course, onShowCourse }: CourseCardProps) {
  return (
    <div className={styles.content}>
      <div className={styles.left}>
        <h2>{course.title}</h2>
        <p>{course.description}</p>
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <p>Authors: {course.authors.join(', ')}</p>
          <p>Duration: {course.duration} minutes</p>
          <p>Creation Date: {course.creationDate}</p>
        </div>
        <div className={styles.actions}>
          <ShowCourses onClick={() => onShowCourse(course)} />
          <EditCourses />
          <DeleteCourses />
        </div>
      </div>
    </div>
  );
}

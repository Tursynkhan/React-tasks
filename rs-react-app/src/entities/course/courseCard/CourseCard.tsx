import DeleteCourses from '../../../features/courses/deleteCourses/DeleteCourses';
import EditCourses from '../../../features/courses/editCourses/EditCourses';
import ShowCourses from '../../../features/courses/showCourses/ShowCourses';
import styles from './CourseCard.module.scss';

interface CourseCardProps {
  id: string;
  title: string;
  duration: number;
  creationDate: string;
  description: string;
  authors: string[];
}

export default function CourseCard({ course }: { course: CourseCardProps }) {
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
          <ShowCourses />
          <EditCourses />
          <DeleteCourses />
        </div>
      </div>
    </div>
  );
}

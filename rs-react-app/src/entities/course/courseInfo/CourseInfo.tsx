import { type Course } from '../../../entities/course/model/types';
import styles from './CourseInfo.module.scss';

interface CourseInfoProps {
  course: Course;
}

export default function CourseInfo({ course }: CourseInfoProps) {
  return (
    <div className={styles.container}>
      <div className={styles.descrition}>
        <h3>Description</h3>
        <p>{course.description}</p>
      </div>
      <div className={styles.info}>
        <div className={styles.row}>
          <span className={styles.caption}>ID</span>
          <span>{course.id}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.caption}>Duration:</span>
          <span>{course.duration}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.caption}>Created:</span>
          <span>{course.creationDate}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.caption}>Authors</span>
          <span>{course.authors}</span>
        </div>
      </div>
    </div>
  );
}

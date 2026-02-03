import CourseList from '../../entities/course/courseList/CourseList';
// import styles from './Courses.module.scss';
import { type Course } from '../../entities/course/model/types';

interface CoursesProps {
  onShowCourse: (course: Course) => void;
}
export default function Courses({ onShowCourse }: CoursesProps) {
  return <CourseList onShowCourse={onShowCourse} />;
}

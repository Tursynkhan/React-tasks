import { CourseList } from '@/entities/course';
import { type Course } from '@/entities/course';

interface CoursesProps {
  courses: Course[];
  onShowCourse: (course: Course) => void;
  onDeleteCourse: (courseId: string) => void;
  onUpdateCourse?: () => void;
}
export default function Courses({
  courses,
  onShowCourse,
  onDeleteCourse,
  onUpdateCourse,
}: CoursesProps) {
  return (
    <CourseList
      courses={courses}
      onShowCourse={onShowCourse}
      onDeleteCourse={onDeleteCourse}
      onUpdateCourse={onUpdateCourse}
    />
  );
}

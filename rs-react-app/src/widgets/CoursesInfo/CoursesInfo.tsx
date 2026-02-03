import { type Course } from '../../entities/course/model/types';
import { Button } from '@mui/material';
import CourseInfoCard from '../../entities/course/courseInfo/CourseInfo';

interface CoursesInfoProps {
  course: Course;
  onBack: () => void;
}

export default function CoursesInfo({ course, onBack }: CoursesInfoProps) {
  return (
    <div className="container">
      <h2>{course.title}</h2>
      <CourseInfoCard course={course} />
      <Button variant="contained" onClick={onBack}>
        Back
      </Button>
    </div>
  );
}

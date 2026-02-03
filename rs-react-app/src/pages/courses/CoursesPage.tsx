import React from 'react';
import Courses from '../../widgets/Courses/Courses';
import SearchBar from '../../widgets/SearchBar/SearchBar';
import CoursesInfo from '../../widgets/CoursesInfo/CoursesInfo';
import { type Course } from '../../entities/course/model/types';
import styles from './CoursesPage.module.scss';

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(
    null
  );

  const handleShowCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  return (
    <div className={styles.container}>
      {selectedCourse ? (
        <CoursesInfo course={selectedCourse} onBack={handleBackToCourses} />
      ) : (
        <>
          <SearchBar />
          <Courses onShowCourse={handleShowCourse} />
        </>
      )}
    </div>
  );
}

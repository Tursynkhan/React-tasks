import React from 'react';

type Author = { id: string; name: string };

interface ValidationErrors {
  title: string;
  description: string;
  duration: string;
  newAuthor: string;
  courseAuthors: string;
}

export function useCreateCourseValidation() {
  const [errors, setErrors] = React.useState<ValidationErrors>({
    title: '',
    description: '',
    duration: '',
    newAuthor: '',
    courseAuthors: '',
  });

  const validateTitle = React.useCallback((value: string): string => {
    if (value.trim().length < 2) {
      return 'At least 2 characters';
    }
    return '';
  }, []);

  const validateDescription = React.useCallback((value: string): string => {
    if (value.trim().length < 2) {
      return 'At least 2 characters';
    }
    return '';
  }, []);

  const validateDuration = React.useCallback((value: number): string => {
    if (value <= 0) {
      return 'Must be greater than 0';
    }
    return '';
  }, []);

  const validateAuthorName = React.useCallback((value: string): string => {
    if (value.trim().length < 2) {
      return 'At least 2 characters';
    }
    return '';
  }, []);

  const validateCourseAuthors = React.useCallback(
    (authors: Author[]): string => {
      if (authors.length === 0) {
        return 'At least one author must be added';
      }
      return '';
    },
    []
  );

  const isFormValid = React.useCallback(
    (
      title: string,
      description: string,
      duration: number,
      courseAuthors: Author[]
    ): boolean => {
      return (
        title.trim().length >= 2 &&
        description.trim().length >= 2 &&
        duration > 0 &&
        courseAuthors.length > 0
      );
    },
    []
  );

  const validateAll = React.useCallback(
    (
      title: string,
      description: string,
      duration: number,
      courseAuthors: Author[]
    ): boolean => {
      const titleError = validateTitle(title);
      const descriptionError = validateDescription(description);
      const durationError = validateDuration(duration);
      const courseAuthorsError = validateCourseAuthors(courseAuthors);

      setErrors({
        title: titleError,
        description: descriptionError,
        duration: durationError,
        newAuthor: '',
        courseAuthors: courseAuthorsError,
      });

      return (
        !titleError &&
        !descriptionError &&
        !durationError &&
        !courseAuthorsError
      );
    },
    [
      validateTitle,
      validateDescription,
      validateDuration,
      validateCourseAuthors,
    ]
  );

  const clearError = React.useCallback((field: keyof ValidationErrors) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
  }, []);

  const clearAllErrors = React.useCallback(() => {
    setErrors({
      title: '',
      description: '',
      duration: '',
      newAuthor: '',
      courseAuthors: '',
    });
  }, []);

  return {
    errors,
    validateTitle,
    validateDescription,
    validateDuration,
    validateAuthorName,
    validateCourseAuthors,
    isFormValid,
    validateAll,
    clearError,
    clearAllErrors,
    setErrors,
  };
}

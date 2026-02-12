import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { authorsApi } from '../api/authorsApi';
import { courseApi as addCourseApi } from '../api/courseApi';
import { courseApi } from '@/entities/course/api/courseApi';
import { formatDuration, formatDateToString } from '@/shared/utils/helpers';
import { useCreateCourseValidation } from './useCreateCourseValidation';
import { type Course } from '@/entities/course/model/types';

type Author = { id: string; name: string };

type CreateCourseModalProps = {
  open: boolean;
  onClose: () => void;
  course?: Course;
  onSuccess?: () => void;
};

export default function CreateCourseModal({
  open,
  onClose,
  course,
  onSuccess,
}: CreateCourseModalProps) {
  const isEditMode = !!course;
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [duration, setDuration] = React.useState(0);
  const [newAuthorName, setNewAuthorName] = React.useState('');

  const [authors, setAuthors] = React.useState<Author[]>([]);

  const [courseAuthors, setCourseAuthors] = React.useState<Author[]>([]);

  const {
    errors,
    validateAuthorName,
    validateAll,
    clearError,
    clearAllErrors,
    setErrors,
  } = useCreateCourseValidation();

  const fetchAuthors = async () => {
    try {
      const authors = await authorsApi.getAuthors();
      setAuthors(authors);
    } catch (error) {
      console.error('Failed to fetch authors:', error);
    }
  };

  const handleCreateAuthor = (authorName: string) => {
    const error = validateAuthorName(authorName);
    if (error) {
      setErrors((prev) => ({ ...prev, newAuthor: error }));
      return;
    }

    clearError('newAuthor');

    authorsApi
      .createAuthor(authorName)
      .then((newAuthor) => {
        setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
        setNewAuthorName('');
      })
      .catch((error) => {
        console.error('Failed to create author:', error);
      });
  };

  const handleAddAuthorToCourse = async (id: string, authorName: string) => {
    setCourseAuthors((prevCourseAuthors) => [
      ...prevCourseAuthors,
      { id, name: authorName },
    ]);
    clearError('courseAuthors');

    try {
      await authorsApi.deleteAuthor(id);
      await fetchAuthors();
    } catch (error) {
      console.error('Failed to delete author:', error);
    }
  };

  const handleRemoveAuthorFromCourse = async (id: string) => {
    setCourseAuthors((prevCourseAuthors) =>
      prevCourseAuthors.filter((author) => author.id !== id)
    );
    try {
      await authorsApi.createAuthor(
        courseAuthors.find((author) => author.id === id)?.name || ''
      );
      await fetchAuthors();
    } catch (error) {
      console.error('Failed to create author:', error);
    }
  };

  const handleSubmit = () => {
    const isValid = validateAll(title, description, duration, courseAuthors);

    if (!isValid) {
      return;
    }

    const courseData = {
      title,
      description,
      duration,
      creationDate: isEditMode ? course.creationDate : formatDateToString(),
      authors: courseAuthors,
    };

    const apiCall = isEditMode
      ? courseApi.updateCourse(course.id, courseData)
      : addCourseApi.createCourse(courseData);

    apiCall
      .then(() => {
        setTitle('');
        setDescription('');
        setDuration(0);
        setCourseAuthors([]);
        clearAllErrors();
        onSuccess?.();
        onClose();
      })
      .catch((error: Error) => {
        console.error(
          `Failed to ${isEditMode ? 'update' : 'create'} course:`,
          error
        );
      });
  };

  React.useEffect(() => {
    if (open) {
      fetchAuthors();
      if (isEditMode && course) {
        setTitle(course.title);
        setDescription(course.description);
        setDuration(course.duration);
        setCourseAuthors(course.authors);
      } else {
        setTitle('');
        setDescription('');
        setDuration(0);
        setCourseAuthors([]);
      }
      setNewAuthorName('');
      clearAllErrors();
    }
  }, [open, course, isEditMode, clearAllErrors]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
        {isEditMode ? 'Edit Course' : 'Create Course'}
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={{ xs: 2, sm: 3 }}
          mt={1}
        >
          <Box>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Title
            </Typography>
            <TextField
              placeholder="Input text"
              fullWidth
              size="small"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                clearError('title');
              }}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Description
            </Typography>
            <TextField
              placeholder="Input text"
              fullWidth
              multiline
              rows={4}
              size="small"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                clearError('description');
              }}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Duration
            </Typography>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretch', sm: 'center' }}
              gap={2}
            >
              <TextField
                placeholder="Input minutes"
                type="number"
                size="small"
                value={duration || ''}
                onChange={(event) => {
                  setDuration(Number(event.target.value));
                  clearError('duration');
                }}
                error={!!errors.duration}
                helperText={errors.duration}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              />
              <Typography variant="body1">
                {formatDuration(duration)}
              </Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            gap={{ xs: 3, md: 4 }}
          >
            <Box flex={1}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Authors
              </Typography>

              <Box mb={2}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Author Name
                </Typography>
                <Box display="flex" gap={2} mb={2}>
                  <TextField
                    placeholder="Input text"
                    fullWidth
                    size="small"
                    value={newAuthorName}
                    onChange={(event) => {
                      setNewAuthorName(event.target.value);
                      clearError('newAuthor');
                    }}
                    error={!!errors.newAuthor}
                    helperText={errors.newAuthor}
                  />
                  <Button
                    variant="contained"
                    sx={{ minWidth: '160px' }}
                    onClick={() => handleCreateAuthor(newAuthorName)}
                    disabled={newAuthorName.trim().length < 2}
                  >
                    Create Author
                  </Button>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Authors List
                </Typography>
                <List dense>
                  {authors.map((author) => (
                    <ListItem
                      key={author.id}
                      sx={{ pl: 0, display: 'flex', alignItems: 'center' }}
                    >
                      <ListItemText primary={author.name} />
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => {
                          handleAddAuthorToCourse(author.id, author.name);
                        }}
                      >
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>

            <Box flex={1}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Course Authors
              </Typography>
              {courseAuthors.length === 0 ? (
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                  >
                    Author list is empty
                  </Typography>
                  {errors.courseAuthors && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                      {errors.courseAuthors}
                    </Typography>
                  )}
                </Box>
              ) : (
                <List dense>
                  {courseAuthors.map((author) => (
                    <ListItem
                      key={author.id}
                      sx={{ pl: 0, display: 'flex', alignItems: 'center' }}
                    >
                      <ListItemText primary={author.name} />
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => {
                          handleRemoveAuthorFromCourse(author.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="contained">
          Cancel
        </Button>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          {isEditMode ? 'Update Course' : 'Create Course'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

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
import { courseApi } from '../api/courseApi';
import { formatDuration } from '@/shared/utils/helpers';

type Author = { id: string; name: string };

type CreateCourseModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function CreateCourseModal({
  open,
  onClose,
}: CreateCourseModalProps) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [duration, setDuration] = React.useState(0);
  const [newAuthorName, setNewAuthorName] = React.useState('');

  const [authors, setAuthors] = React.useState<Author[]>([
    { id: '1', name: 'Author One' },
    { id: '2', name: 'Author Two' },
  ]);

  const [courseAuthors, setCourseAuthors] = React.useState<Author[]>([]);

  const fetchAuthors = async () => {
    try {
      const authors = await authorsApi.getAuthors();
      setAuthors(authors);
    } catch (error) {
      console.error('Failed to fetch authors:', error);
    }
  };

  const handleCreateAuthor = (authorName: string) => {
    if (authorName.trim() === '') return;
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
    const courseData = {
      title,
      description,
      duration,
      creationDate: new Date(),
      authors: courseAuthors,
    };
    console.log('Course Data:', courseData);
    courseApi
      .createCourse(courseData)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error('Failed to create course:', error);
      });
  };

  React.useEffect(() => {
    if (open) {
      fetchAuthors();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Course Edit/Create</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={3}
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
              onChange={(event) => setTitle(event.target.value)}
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
              onChange={(event) => setDescription(event.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Duration
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Duration
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                placeholder="Input minutes"
                type="number"
                size="small"
                value={duration || ''}
                onChange={(event) => setDuration(Number(event.target.value))}
              />
              <Typography variant="body1">
                {formatDuration(duration)}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" gap={4}>
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
                    onChange={(event) => setNewAuthorName(event.target.value)}
                  />
                  <Button
                    variant="contained"
                    sx={{ minWidth: '160px' }}
                    onClick={() => handleCreateAuthor(newAuthorName)}
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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  Author list is empty
                </Typography>
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
          Create Course
        </Button>
      </DialogActions>
    </Dialog>
  );
}

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

type Author = { id: string; name: string };

type CreateCourseModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function CreateCourseModal({
  open,
  onClose,
}: CreateCourseModalProps) {
  const [authors, setAuthors] = React.useState<Author[]>([
    { id: '1', name: 'Author One' },
    { id: '2', name: 'Author Two' },
  ]);
  const [courseAuthors, setCourseAuthors] = React.useState<Author[]>([]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Course Edit/Create</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={3} mt={1}>
          <Box>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Title
            </Typography>
            <TextField placeholder="Input text" fullWidth size="small" />
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
              <TextField placeholder="Input text" size="small" />
              <Typography variant="body1">00:00 hours</Typography>
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
                  <TextField placeholder="Input text" fullWidth size="small" />
                  <Button variant="contained" sx={{ minWidth: '160px' }}>
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
                      <IconButton edge="end" size="small">
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
                      <IconButton edge="end" size="small">
                        <AddCircleOutlineIcon />
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
        <Button variant="contained">Create Course</Button>
      </DialogActions>
    </Dialog>
  );
}

import { SearchCourses } from '@/features/courses';
import { AddNewCourses } from '@/features/courses';
import { Box } from '@mui/material';

interface SearchBarProps {
  query: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  onAddCourse?: () => void;
}
export default function SearchBar({
  query,
  onChange,
  onClick,
  onAddCourse,
}: SearchBarProps) {
  return (
    <Box
      component={'div'}
      display={'flex'}
      flexDirection={{ xs: 'column', sm: 'row' }}
      justifyContent={'space-between'}
      gap={{ xs: 2, sm: 0 }}
      alignItems={{ xs: 'stretch', sm: 'center' }}
    >
      <SearchCourses onChange={onChange} onClick={onClick} query={query} />
      <AddNewCourses onSuccess={onAddCourse} />
    </Box>
  );
}
